import { Injectable } from '@angular/core';
import axios from '../infrastructure/axios';

@Injectable()
export class UsersRepository {
  async create(data: any) {
    const res = await axios.post('/signup', data)
    return res.data;
  }
}
