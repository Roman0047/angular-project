import { Component, OnInit } from '@angular/core';
import {SportsRepository} from "../../repository/sports";

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.scss']
})
export class SportsComponent implements OnInit {
  constructor(private sportsRepo: SportsRepository) { }
  sports = []
  searchPhrase = ''

  ngOnInit() {
    this.getSports();
  }

  async getSports() {
    this.sports = await this.sportsRepo.list({ search: this.searchPhrase });
  }

  search(event: any) {
    this.searchPhrase = event.target.value;
    this.getSports();
  }

}
