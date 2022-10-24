import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  items = [
    {
      icon: 'home',
      link: '/'
    },
    {
      icon: 'video_library',
      link: '/subscriptions'
    },
    {
      icon: 'camera_enhance',
      link: '/new-post',
      isCenter: true
    },
    {
      icon: 'account_circle',
      link: '/profile'
    },
    {
      icon: 'settings',
      link: '/settings'
    },
  ]

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
