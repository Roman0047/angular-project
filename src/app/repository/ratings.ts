import { Injectable } from '@angular/core';
import axios from '../infrastructure/axios';

@Injectable()
export class RatingsRepository {
  async create(id: any, data: any) {
    const res = await axios.post(`/ratings/${id}`, data);
    return res.data;
  }
}
