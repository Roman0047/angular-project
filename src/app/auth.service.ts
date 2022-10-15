import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AuthRepository} from "./repository/auth";
import axios from './infrastructure/axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject(false)
  private _user$ = new BehaviorSubject(null)
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  user$ = this._user$.asObservable();

  constructor(private authRepo: AuthRepository) {
    this.getProfile()
  }

  saveUser(token: string) {
    localStorage.setItem('token', token)
    this._isLoggedIn$.next(true);
  }

  async getProfile() {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      try {
        const profile = await this.authRepo.profile();
        this._user$.next(profile);
      } catch (error) {
        console.error(error)
      }
    }
  }
}
