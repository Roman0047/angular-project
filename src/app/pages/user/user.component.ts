import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PostsRepository} from "../../repository/posts";
import {Router} from "@angular/router";
import {AuthService} from "../../auth.service";
import {AuthRepository} from "../../repository/auth";
import {GlobalService} from "../../global.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor(
    private postsRepo: PostsRepository,
    private router: Router,
    public authService: AuthService,
    private authRepo: AuthRepository,
    private globalService: GlobalService
  ) { }

  @ViewChild('nameField') nameField: ElementRef | undefined;
  @ViewChild('emailField') emailField: ElementRef | undefined;

  form = {
    name: this.authService.user.name,
    email: this.authService.user.email,
    avatar: this.authService.user.avatar,
  }

  posts = []
  isProfile = this.router.url === '/profile';
  isEditNameMode = false
  isEditEmailMode = false

  async getPosts() {
    this.posts = await this.postsRepo.list({
      isCurrentUser: true
    });
  }

  editName() {
    this.isEditNameMode = true
    setTimeout(() => {
      this.nameField?.nativeElement.focus()
    },0);
  }

  editEmail() {
    this.isEditEmailMode = true
    setTimeout(() => {
      this.emailField?.nativeElement.focus()
    },0);
  }

  setAvatar(image: string) {
    this.form.avatar = image;
    this.updateProfile();
  }

  blurName() {
    if (this.form.name === this.authService.user.name) {
      this.isEditNameMode = false
    }
  }

  blurEmail() {
    if (this.form.email === this.authService.user.email) {
      this.isEditEmailMode = false
    }
  }

  async updateProfile() {
    try {
      await this.authRepo.updateProfile(this.form)
      await this.authService.getProfile()
      this.form = {
        name: this.authService.user.name,
        email: this.authService.user.email,
        avatar: this.authService.user.avatar,
      }
      this.globalService.toast('Saved')
      this.isEditNameMode = false
      this.isEditEmailMode = false
    } catch (error: any) {
      if (error.response.data && typeof error.response.data.message === 'object') {
        this.globalService.toast(error.response.data.message[0].message, "error")
      } else if (error.response.data.message) {
        this.globalService.toast(error.response.data.message, "error")
      }
      this.form = {
        name: this.authService.user.name,
        email: this.authService.user.email,
        avatar: this.authService.user.avatar,
      }
      this.isEditNameMode = false
      this.isEditEmailMode = false
    }
  }

  ngOnInit(): void {
    this.getPosts()
  }
}
