import { Injectable } from '@angular/core';
import axios from '../infrastructure/axios';

@Injectable()
export class CommentsRepository {
  async create(id: any, data: any) {
    const res = await axios.post(`/comments/${id}`, data);
    return res.data;
  }
  async update(id: any, data: any) {
    const res = await axios.patch(`/comments/${id}`, data)
    return res.data;
  }
  async remove(id: any) {
    const res = await axios.delete(`/comments/${id}`)
    return res.data;
  }
}
