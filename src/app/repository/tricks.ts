import { Injectable } from '@angular/core';
import axios from '../infrastructure/axios';

@Injectable()
export class TricksRepository {
  async list() {
    const res = await axios.get('/tricks')
    return res.data;
  }
  async create(data: any) {
    const res = await axios.post('/tricks', data)
    return res.data;
  }
  async update(id: any, data: any) {
    const res = await axios.patch(`/tricks/${id}`, data)
    return res.data;
  }
  async get(id: any) {
    const res = await axios.get(`/tricks/${id}`)
    return res.data;
  }
  async remove(id: any) {
    const res = await axios.delete(`/tricks/${id}`)
    return res.data;
  }
}
