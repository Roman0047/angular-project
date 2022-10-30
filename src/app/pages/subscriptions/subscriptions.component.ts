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
  searchPhrase = ''
  filters = {
    sportsIds: [],
    tricksIds: [],
  }
  isPostsLength = false

  async getPosts() {
    this.posts = await this.postsRepo.getSubscriptionsPosts({
      ...this.filters,
      search: this.searchPhrase,
      sport: true,
      trick: true,
      user: true
    });
  }

  search(event: any) {
    this.searchPhrase = event.target.value;
    this.getPosts();
  }

  setSports(items: any) {
    this.filters.sportsIds = items.map((item: any) => item.id)
  }

  setTricks(items: any) {
    this.filters.tricksIds = items.map((item: any) => item.id)
    this.getPosts()
  }

  async getSubscriptions() {
    this.subscriptions = await this.subscribersRepo.getSubscriptions();
    this.isLoaded = true;
  }

  async ngOnInit() {
    this.getSubscriptions()
    await this.getPosts()
    this.isPostsLength = !!this.posts.length
  }
}
