import { Injectable } from '@angular/core';
import axios from '../infrastructure/axios';

@Injectable()
export class SportsRepository {
  async list() {
    const res = await axios.get('/sports')
    return res.data;
  }
  async create(data: any) {
    const res = await axios.post('/sports', data)
    return res.data;
  }
  async get(id: any) {
    const res = await axios.get(`/sports/${id}`)
    return res.data;
  }
}
