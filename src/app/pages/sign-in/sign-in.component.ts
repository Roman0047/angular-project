import { Component, OnInit } from '@angular/core';
import {AuthRepository} from "../../repository/auth";
import {Router} from "@angular/router";
import * as Toastify from "toastify-js";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  constructor(private authRepo: AuthRepository, private authService: AuthService, private router: Router) { }

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
      this.authService.saveUser(user.access_token)
      Toastify({
        text: "Successfully logged in",
        duration: 2000,
        gravity: "top",
        position: "right",
      }).showToast();
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
        Toastify({
          text: "You've entered wrong credentials",
          duration: 2000,
          gravity: "top",
          position: "right",
          className: "error",
        }).showToast();
      }
    }
  }

  ngOnInit(): void {
  }
}
