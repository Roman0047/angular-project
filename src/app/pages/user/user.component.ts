import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PostsRepository} from "../../repository/posts";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../auth.service";
import {AuthRepository} from "../../repository/auth";
import {GlobalService} from "../../global.service";
import {UsersRepository} from "../../repository/users";
import {environment} from "../../../environments/environment";
import {SubscribersRepository} from "../../repository/subscribers";

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
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private usersRepository: UsersRepository,
    private subscribersRepo: SubscribersRepository
  ) { }

  @ViewChild('nameField') nameField: ElementRef | undefined;
  @ViewChild('emailField') emailField: ElementRef | undefined;

  apiUrl = environment.apiUrl

  form = {
    name: this.authService.user.name,
    email: this.authService.user.email,
    avatar: this.authService.user.avatar,
  }

  user: any;
  posts = []
  subscribers: any = 0;
  isProfile = this.router.url === '/profile';
  isEditNameMode = false
  isEditEmailMode = false

  async getPosts(id: any) {
    this.posts = await this.postsRepo.list({ userId: this.isProfile ? this.authService.user.id : id });
  }

  async getSubscribers(id: any) {
    this.subscribers = await this.subscribersRepo.get(this.isProfile ? this.authService.user.id : id);
  }

  async getUser(id: any) {
    this.user = await this.usersRepository.get(id)
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

  async subscribe() {
    await this.subscribersRepo.subscribe(this.user.id)
    this.getSubscribers(this.user.id)
    this.getUser(this.user.id)
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
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')

      if (id) {
        if (parseInt(<string>id) === this.authService.user.id) {
          this.router.navigate(["/profile"])
          return
        } else {
          this.getUser(id)
        }
      }

      this.getPosts(id)
      this.getSubscribers(id)
    })
  }
}
