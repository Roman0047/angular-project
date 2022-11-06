import { Component, OnInit } from "@angular/core";
import {AuthRepository} from '../../repository/auth'
import { Router } from "@angular/router";
import {GlobalService} from "../../global.service";
import {SportsRepository} from "../../repository/sports";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  constructor(
    private authRepo: AuthRepository,
    private router: Router,
    private globalService: GlobalService,
    private sportsRepo: SportsRepository
  ) { }

  hidePassword = true
  hideConfirmPassword = true
  form = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    sports: [],
  }
  errors: any = {}
  sports = []

  async signup() {
    try {
      await this.authRepo.create(this.form);
      this.errors = {}
      this.globalService.toast('Successfully registered')
      await this.router.navigate(['/sign-in'])
    } catch (error: any) {
      if (error.response.data && typeof error.response.data.message === 'object') {
        this.errors = {}
        error.response.data.message.forEach((item: any) => {
          if (
            item.property === 'confirmPassword' &&
            (!item.constraints.Match || Object.keys(item.constraints).length > 1)
          ) {
            this.errors[item.property] = 'Password confirmation ' + item.message.split(' ').slice(1).join(' ');
          } else {
            this.errors[item.property] = item.message.charAt(0).toUpperCase() + item.message.slice(1);
          }
        })
      }

      if (error.response.data && typeof error.response.data.message === 'string') {
        this.errors = {}
        this.globalService.toast(error.response.data.message, 'error')
      }
    }
  }

  async getSports() {
    this.sports = await this.sportsRepo.list({ tricks: true });
  }

  ngOnInit(): void {
    this.getSports()
  }
}
