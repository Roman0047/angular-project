import {Component, OnInit, ViewChild} from '@angular/core';
import {PostsRepository} from "../../repository/posts";
import {FiltersComponent} from "../../components/filters/filters.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private postsRepo: PostsRepository) { }

  @ViewChild('filtersComponent') filtersComponent: FiltersComponent | undefined;

  posts = []
  searchPhrase = ''
  filters = {
    sportsIds: [],
    tricksIds: [],
  }
  isPostsLength = false

  async getPosts() {
    this.posts = await this.postsRepo.list({
      ...this.filters,
      search: this.searchPhrase,
      sport: true,
      trick: true,
      user: true,
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

  async ngOnInit() {
    await this.getPosts()
    this.isPostsLength = !!this.posts.length
  }
}
