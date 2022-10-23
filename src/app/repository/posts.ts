import { Injectable } from '@angular/core';
import axios from '../infrastructure/axios';

@Injectable()
export class PostsRepository {
  async list(params?: any) {
    const res = await axios.get('/posts', { params })
    return res.data;
  }
  async create(data: any) {
    const res = await axios.post('/posts', data)
    return res.data;
  }
  async get(id: any) {
    const res = await axios.get(`/posts/${id}`)
    return res.data;
  }
}
