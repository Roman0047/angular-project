import {Component, OnInit, ViewChild} from '@angular/core';
import {PostsRepository} from "../../repository/posts";
import {SubscribersRepository} from "../../repository/subscribers";
import {FiltersComponent} from "../../components/filters/filters.component";

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
  constructor(private postsRepo: PostsRepository, private subscribersRepo: SubscribersRepository) { }

  @ViewChild('filtersComponent') filtersComponent: FiltersComponent | undefined;

  isLoaded = false
  posts: any = []
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

  setSportTags(id: any) {
    if (this.filtersComponent) {
      this.filtersComponent.addSportId(id)
    }
  }

  setTrickTags(id: any) {
    if (this.filtersComponent) {
      this.filtersComponent.addTrickId(id)
    }
  }

  async getSubscriptions() {
    this.subscriptions = await this.subscribersRepo.getSubscriptions();
    this.isLoaded = true;
  }

  updateRating(id: number, rating: any) {
    const postId = this.posts.findIndex((item: any) => item.id === id)
    this.posts[postId].ratings = rating
  }

  async ngOnInit() {
    this.getSubscriptions()
    await this.getPosts()
    this.isPostsLength = !!this.posts.length
  }
}
