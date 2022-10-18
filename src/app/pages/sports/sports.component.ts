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

  ngOnInit() {
    this.getSports();
  }

  async getSports() {
    this.sports = await this.sportsRepo.list();
  }

}
