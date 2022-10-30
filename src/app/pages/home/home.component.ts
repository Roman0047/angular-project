import { Component, OnInit } from '@angular/core';
import {PostsRepository} from "../../repository/posts";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private postsRepo: PostsRepository) { }
  posts = []
  searchPhrase = ''
  filters = {
    sportsIds: [],
    tricksIds: [],
  }

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

  ngOnInit(): void {
    this.getPosts()
  }
}
