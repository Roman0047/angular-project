import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {TricksRepository} from "../../repository/tricks";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-trick',
  templateUrl: './trick.component.html',
  styleUrls: ['./trick.component.scss']
})
export class TrickComponent implements OnInit {
  constructor(
    public location: Location,
    private tricksRepo: TricksRepository,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  trick: any

  async getTrick(id: string | null) {
    if (parseInt(<string>id) !== 0) {
      try {
        this.trick = await this.tricksRepo.get(id);
      } catch (error) {
        this.router.navigate(['/404'])
      }
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      await this.getTrick(params.get('id'))
    })
  }

}
