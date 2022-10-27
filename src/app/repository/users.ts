import { Injectable } from '@angular/core';
import axios from '../infrastructure/axios';

@Injectable()
export class UsersRepository {
  async get(id: any) {
    const res = await axios.get(`/users/${id}`)
    return res.data;
  }
}
