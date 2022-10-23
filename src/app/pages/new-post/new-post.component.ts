import { Component, OnInit } from '@angular/core';
import {SportsRepository} from "../../repository/sports";
import {GlobalService} from "../../global.service";
import {PostsRepository} from "../../repository/posts";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  constructor(
    private sportsRepo: SportsRepository,
    private postsRepo: PostsRepository,
    public globalService: GlobalService,
    private router: Router
  ) { }
  form: any = {
    title: '',
    description: '',
    file: null,
    sport: null,
    trick: null,
  }
  sports = []
  errors: any = {}

  ngOnInit() {
    this.getSports();
  }

  async getSports() {
    this.sports = await this.sportsRepo.list({ tricks: true });
  }

  async createPost() {
    try {
      await this.postsRepo.create(this.form)
      this.errors = {}
      this.globalService.toast('Saved')
      await this.router.navigate(["/"]);
    } catch (error: any) {
      this.errors = this.globalService.getValidationErrors(error);
    }
  }

}
