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

  async getPosts() {
    this.posts = await this.postsRepo.list({
      sport: true,
      trick: true,
      user: true
    });
  }

  ngOnInit(): void {
    this.getPosts()
  }
}
