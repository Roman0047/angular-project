import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tricks',
  templateUrl: './tricks.component.html',
  styleUrls: ['./tricks.component.scss']
})
export class TricksComponent implements OnInit {
  isAdmin = false; //todo replace with user role

  panelOpenState = false;

  selectedSport: any = {}
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

  constructor() { }

  ngOnInit(): void {
  }

}
