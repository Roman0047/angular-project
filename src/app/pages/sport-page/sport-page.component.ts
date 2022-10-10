import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sport-page',
  templateUrl: './sport-page.component.html',
  styleUrls: ['./sport-page.component.scss']
})
export class SportPageComponent implements OnInit {
  displayedColumns = ['image', 'name', 'description', 'id'];
  tricks = [
    {
      image: 'https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg',
      name: 'Hydrogen',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto exercitationem iure laudantium',
      id: 1
    },
    {
      image: 'https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg',
      name: 'Helium',
      description: 'test',
      id: 2
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
