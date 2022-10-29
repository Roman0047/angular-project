import { Component, OnInit } from '@angular/core';
import {PostsRepository} from "../../repository/posts";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  constructor(private postsRepo: PostsRepository, private router: Router, private route: ActivatedRoute) { }

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
    this.posts = await this.postsRepo.list();
  }

  updateSubscription() {
    this.post.user.isSubscribed = !this.post.user.isSubscribed
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      const id = params.get('id');
      await this.getPost(id)
      this.getPosts()
    })
  }
}
