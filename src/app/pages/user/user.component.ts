import { Component, OnInit } from '@angular/core';
import {PostsRepository} from "../../repository/posts";
import {Router} from "@angular/router";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor(private postsRepo: PostsRepository, private router: Router, public authService: AuthService) { }

  posts = []
  isProfile = this.router.url === '/profile';

  async getPosts() {
    this.posts = await this.postsRepo.list({
      isCurrentUser: true
    });
  }

  ngOnInit(): void {
    this.getPosts()
  }
}
