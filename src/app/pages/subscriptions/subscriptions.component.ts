import { Component, OnInit } from '@angular/core';
import {PostsRepository} from "../../repository/posts";
import {SubscribersRepository} from "../../repository/subscribers";

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
  constructor(private postsRepo: PostsRepository, private subscribersRepo: SubscribersRepository) { }

  isLoaded = false
  posts = []
  subscriptions = []

  async getPosts() {
    this.posts = await this.postsRepo.getSubscriptionsPosts({
      sport: true,
      trick: true,
      user: true
    });
  }

  async getSubscriptions() {
    this.subscriptions = await this.subscribersRepo.getSubscriptions();
    this.isLoaded = true;
  }

  ngOnInit(): void {
    this.getPosts()
    this.getSubscriptions()
  }
}
