import { Injectable } from '@angular/core';
import * as Toastify from "toastify-js";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  constructor() { }

  toast(text: any, classes?: any) {
    Toastify({
      text: text,
      duration: 2000,
      gravity: "top",
      position: "right",
      className: classes,
    }).showToast();
  }

  getValidationErrors(error: any) {
    if (error.response.data && typeof error.response.data.message === 'object') {
      const errors: any = {};
      error.response.data.message.forEach((item: any) => {
        errors[item.property] = item.message.charAt(0).toUpperCase() + item.message.slice(1);
      })
      return errors
    }
  }
}
