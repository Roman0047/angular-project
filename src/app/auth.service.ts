import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {AuthRepository} from "./repository/auth";
import axios from './infrastructure/axios';

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

  constructor(private authRepo: AuthRepository) {
    this.getProfile()
  }

  saveUser(user: any) {
    localStorage.setItem('token', user.access_token)
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
    }

    this.isUpdatedState = true
  }
}
