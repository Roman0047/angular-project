import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AuthRepository} from "./repository/auth";
import axios from './infrastructure/axios';
import {Router} from "@angular/router";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject(false)
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  isLoggedIn = false;
  private _user$ = new BehaviorSubject(null)
  user$ = this._user$.asObservable();
  user: any = null;
  isAdmin = false;

  isUpdatedState = false;

  constructor(private authRepo: AuthRepository, private router: Router) {
    this.getProfile()
  }

  saveUser(user: any) {
    localStorage.setItem('token', user.access_token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.access_token}`
    delete user.access_token;
    this.updateState(true, user)
  }

  async getProfile() {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      try {
        const profile = await this.authRepo.profile();
        this.updateState(true, profile)
      } catch (error) {
        this.updateState(false, null)
      }
    } else {
      this.updateState(false, null)
    }
  }

  updateState(state: boolean, user: any) {
    this._isLoggedIn$.next(state);
    this.isLoggedIn = state;
    if (state && user) {
      this._user$.next(user);
      this.user = user;
      this.isAdmin = this.user.role === 'admin'

      this.setTheme()
    } else {
      this._user$.next(null);
      this.user = null;
      this.isAdmin = false
    }

    this.isUpdatedState = true
  }

  setTheme() {
    if (this.user.theme.backgroundImage) {
      document.body.style.backgroundImage =
        `url('${environment.apiUrl + this.user.theme.backgroundImage.split('\\').join('/')}')`
    }
    if (this.user.theme.font) {
      document.head.insertAdjacentHTML("beforeend", `<style>
        * {
         font-family: "${this.user.theme.font}", "Helvetica Neue", sans-serif;
        }
      </style>`)
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.updateState(false, null);
    this.router.navigate(["/sign-in"]);
  }
}
