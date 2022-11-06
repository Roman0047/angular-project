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
  async updateProfile(data: any) {
    const res = await axios.patch('/profile', data)
    return res.data;
  }
  async addSport(id: any) {
    const res = await axios.post(`/profile/add-sport/${id}`)
    return res.data;
  }
  async addTrick(id: any) {
    const res = await axios.post(`/profile/add-trick/${id}`)
    return res.data;
  }
  async removeTrick(id: any) {
    const res = await axios.delete(`/profile/trick/${id}`)
    return res.data;
  }
}
