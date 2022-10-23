import { Injectable } from '@angular/core';
import axios from '../infrastructure/axios';

@Injectable()
export class ThemeRepository {
  async update(id: any, data: any) {
    const res = await axios.patch(`/theme/${id}`, data)
    return res.data;
  }
}
