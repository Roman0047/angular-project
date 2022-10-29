import { Component, OnInit } from '@angular/core';
import {PostsRepository} from "../../repository/posts";

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
  constructor(private postsRepo: PostsRepository) { }

  posts = []

  async getPosts() {
    this.posts = await this.postsRepo.getSubscriptionsPosts({
      sport: true,
      trick: true,
      user: true
    });
  }

  ngOnInit(): void {
    this.getPosts()
  }
}
