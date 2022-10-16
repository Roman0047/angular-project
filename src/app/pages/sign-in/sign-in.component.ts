import { Component, OnInit } from '@angular/core';
import {AuthRepository} from "../../repository/auth";
import {Router} from "@angular/router";
import {AuthService} from "../../auth.service";
import {GlobalService} from "../../global.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  constructor(
    private authRepo: AuthRepository,
    private authService: AuthService,
    private router: Router,
    private globalService: GlobalService
  ) { }

  hidePassword = true
  form = {
    email: '',
    password: '',
  }
  errors: any = {}

  async login() {
    try {
      const user = await this.authRepo.login(this.form);
      this.errors = {}
      this.authService.saveUser(user)
      this.globalService.toast('Successfully logged in')
      await this.router.navigate(['/'])
    } catch (error: any) {
      if (error.response.data && typeof error.response.data.message === 'object') {
        this.errors = {}
        error.response.data.message.forEach((item: any) => {
          const message = item.constraints[Object.keys(item.constraints).slice(-1)[0]]
          this.errors[item.property] = message.charAt(0).toUpperCase() + message.slice(1);
        })
      } else {
        this.errors = {}
      }

      if (error.response.data && error.response.data.message === 'Unauthorized') {
        this.globalService.toast('You\'ve entered wrong credentials', 'error')
      }
    }
  }

  ngOnInit(): void {
  }
}
