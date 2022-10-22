import {Component, OnInit} from '@angular/core';
import {SportsRepository} from "../../repository/sports";
import {GlobalService} from "../../global.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TricksRepository} from "../../repository/tricks";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-sport-page',
  templateUrl: './sport-page.component.html',
  styleUrls: ['./sport-page.component.scss']
})
export class SportPageComponent implements OnInit {
  constructor(
    private sportsRepo: SportsRepository,
    private tricksRepo: TricksRepository,
    public globalService: GlobalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  apiUrl = environment.apiUrl

  isLoaded = false

  sport: any = {
    image: '',
    name: '',
    description: ''
  }

  trick: any = {
    file: '',
    name: '',
    description: '',
    complexity: null,
  }

  sportErrors: any = {}
  trickErrors: any = {}

   async saveSport() {
    try {
      if (this.sport.id) {
        this.sport = await this.sportsRepo.update(this.sport.id, this.sport)
      } else {
        this.sport = await this.sportsRepo.create(this.sport)
        await this.router.navigate(['/sport', this.sport.id])
      }
      this.sportErrors = {}
      this.globalService.toast('Saved')
    } catch (error: any) {
      this.sportErrors = this.globalService.getValidationErrors(error);
    }
  }

  async saveTrick() {
    try {
      if (this.trick.id) {
        this.trick = await this.tricksRepo.update(this.trick.id, this.trick)
      } else {
        this.trick = await this.tricksRepo.create({
          ...this.trick,
          sport: this.sport
        })
      }
      this.trickErrors = {}
      this.globalService.toast('Saved')
      await this.getSport(this.sport.id)
    } catch (error: any) {
      this.trickErrors = this.globalService.getValidationErrors(error);
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.getSport(id)
    })
  }

  async getSport(id: string | null) {
    if (parseInt(<string>id) !== 0) {
      try {
        this.sport = await this.sportsRepo.get(id);
      } catch (error) {
        this.router.navigate(['/404'])
      }
      this.isLoaded = true
    } else {
      this.isLoaded = true
    }
  }

  clearTrick() {
    this.trick = {
      file: '',
      name: '',
      description: '',
      complexity: null,
    }
  }

  get easyTricks() {
     return this.sport.tricks.filter((item: any) => item.complexity === 'easy')
  }

  get mediumTricks() {
    return this.sport.tricks.filter((item: any) => item.complexity === 'medium')
  }

  get hardTricks() {
    return this.sport.tricks.filter((item: any) => item.complexity === 'hard')
  }
}
