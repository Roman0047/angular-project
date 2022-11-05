import { Component, OnInit } from '@angular/core';
import {PostsRepository} from "../../repository/posts";
import {ActivatedRoute, Router} from "@angular/router";
import { Location } from '@angular/common';
import {CommentsRepository} from "../../repository/comments";
import {GlobalService} from "../../global.service";
import {AuthService} from "../../auth.service";
import * as moment from 'moment';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  constructor(
    private postsRepo: PostsRepository,
    private commentsRepo: CommentsRepository,
    private router: Router,
    private route: ActivatedRoute,
    public location: Location,
    public globalService: GlobalService,
    public authService: AuthService
  ) { }

  post: any;
  posts = []

  comment: any = {
    comment: '',
  }
  errors: any = {}

  async getPost(id: string | null) {
    if (parseInt(<string>id) !== 0) {
      try {
        this.post = await this.postsRepo.get(id);
      } catch (error) {
        this.router.navigate(['/404'])
      }
    }
  }

  async getPosts() {
    this.posts = await this.postsRepo.list({
      sportId: this.post.sportId,
      trickId: this.post.trickId,
      postId: this.post.id,
      limit: 9
    });
  }

  updateSubscription() {
    this.post.user.isSubscribed = !this.post.user.isSubscribed
  }

  setSportTags(id: any) {
    this.router.navigate(['/'], { queryParams: { sport: id } })
  }

  setTrickTags(id: any) {
    this.router.navigate(['/'], { queryParams: { trick: id } })
  }

  updateRating(rating: any) {
    this.post.ratings = rating
  }

  async sendComment() {
    try {
      if (this.comment.id) {
        await this.commentsRepo.update(this.comment.id, this.comment)
      } else {
        await this.commentsRepo.create(this.post.id, this.comment)
      }
      this.comment = {
        comment: '',
      }
      await this.getPost(this.post.id)
      this.errors = {}
    } catch (error: any) {
      this.errors = this.globalService.getValidationErrors(error);
    }
  }

  async removeComment(id: any) {
    await this.commentsRepo.remove(id)
    if (this.comment.id === id) {
      this.comment = {
        comment: '',
      }
    }
    await this.getPost(this.post.id)
  }

  async editComment(comment: any) {
    this.comment = { ...comment }
    this.errors = {}
  }

  getCommentDate(date: moment.MomentInput) {
    return moment(date).format('DD/MM/YYYY hh:mm')
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      const id = params.get('id');
      await this.getPost(id)
      this.getPosts()
    })
  }
}
