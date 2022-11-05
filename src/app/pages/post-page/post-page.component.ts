import { Component, OnInit } from '@angular/core';
import {PostsRepository} from "../../repository/posts";
import {ActivatedRoute, Router} from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  constructor(
    private postsRepo: PostsRepository,
    private router: Router,
    private route: ActivatedRoute,
    public location: Location,
  ) { }

  post: any;
  posts = []

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

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      const id = params.get('id');
      await this.getPost(id)
      this.getPosts()
    })
  }
}
