import { Injectable } from '@angular/core';
import axios from '../infrastructure/axios';

@Injectable()
export class SubscribersRepository {
  async get(id: any) {
    const res = await axios.get(`/subscribers/${id}`)
    return res.data;
  }

  async getSubscriptions() {
    const res = await axios.get('/subscribers/subscriptions')
    return res.data;
  }

  async subscribe(id: any) {
    const res = await axios.post(`/subscribers/${id}`);
    return res.data;
  }
}
