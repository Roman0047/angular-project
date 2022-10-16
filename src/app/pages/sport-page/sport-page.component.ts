import { Component, OnInit } from '@angular/core';
import {SportsRepository} from "../../repository/sports";
import {GlobalService} from "../../global.service";

@Component({
  selector: 'app-sport-page',
  templateUrl: './sport-page.component.html',
  styleUrls: ['./sport-page.component.scss']
})
export class SportPageComponent implements OnInit {
  constructor(private sportsRepo: SportsRepository, private globalService: GlobalService) { }

  displayedColumns = ['image', 'name', 'description', 'id'];

  sport = {
    image: '',
    name: '',
    description: ''
  }
  sportErrors: any = {}

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

   async saveSport() {
    try {
      const sport = await this.sportsRepo.create(this.sport);
      this.sportErrors = {}
      this.globalService.toast('Saved')
    } catch (error: any) {
      this.sportErrors = this.globalService.getValidationErrors(error);
    }
  }

  ngOnInit(): void {
  }

}
