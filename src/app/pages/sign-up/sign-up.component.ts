import { Component, OnInit } from "@angular/core";
import { UsersRepository } from '../../repository/users'
import * as Toastify from 'toastify-js'
import { Router } from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  constructor(private usersRepo: UsersRepository, private router: Router) { }

  hidePassword = true
  hideConfirmPassword = true
  form = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userSports: [],
  }
  errors: any = {}
  sports = [
    {
      id: 1,
      name: 'sport1',
    },
    {
      id: 2,
      name: 'sport2',
    },
    {
      id: 3,
      name: 'sport3',
    },
    {
      id: 4,
      name: 'sport4',
    },
  ]

  async signup() {
    try {
      await this.usersRepo.create(this.form);
      this.errors = {}
      Toastify({
        text: "Successfully registered",
        duration: 2000,
        gravity: "top",
        position: "right",
      }).showToast();
      await this.router.navigate(['/sign-in'])
    } catch (error: any) {
      if (error.response.data && error.response.data.message) {
        this.errors = {}
        error.response.data.message.forEach((item: any) => {
          this.errors[item.field] = item.message;
        })
      }
    }
  }

  ngOnInit(): void {
  }
}
