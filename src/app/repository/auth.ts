import { Injectable } from '@angular/core';
import axios from '../infrastructure/axios';

@Injectable()
export class AuthRepository {
  async create(data: any) {
    const res = await axios.post('/auth/signup', data)
    return res.data;
  }
  async login(data: any) {
    const res = await axios.post('/auth/login', data)
    return res.data;
  }
  async profile() {
    const res = await axios.get('/profile')
    return res.data;
  }
}
