import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  form = {
    sport: {},
    trick: {},
  }
  sports = [
    {
      id: 1,
      name: 'sport1',
    },
    {
      id: 2,
      name: 'sport2',
    },
    {
      id: 3,
      name: 'sport3',
    },
    {
      id: 4,
      name: 'sport4',
    },
  ]
  tricks = [
    {
      id: 1,
      name: 'trick1',
    },
    {
      id: 2,
      name: 'trick2',
    },
    {
      id: 3,
      name: 'trick3',
    },
    {
      id: 4,
      name: 'trick4',
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
