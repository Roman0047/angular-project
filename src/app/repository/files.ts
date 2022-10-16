import { Injectable } from '@angular/core';
import axios from '../infrastructure/axios';

@Injectable()
export class FilesRepository {
  async upload(data: any) {
    const res = await axios.post('/file', data)
    return res.data;
  }
}
