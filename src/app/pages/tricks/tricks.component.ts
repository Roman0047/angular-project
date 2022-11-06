import {Component, OnInit, ViewChild} from '@angular/core';
import { Location } from '@angular/common';
import {UsersRepository} from "../../repository/users";
import {AuthService} from "../../auth.service";
import {ActivatedRoute} from "@angular/router";
import {SportsRepository} from "../../repository/sports";
import {AuthRepository} from "../../repository/auth";
import {AutocompleteSingleComponent} from "../../components/autocomplete-single/autocomplete-single.component";

@Component({
  selector: 'app-tricks',
  templateUrl: './tricks.component.html',
  styleUrls: ['./tricks.component.scss']
})
export class TricksComponent implements OnInit {
  constructor(
    public location: Location,
    private usersRepository: UsersRepository,
    public authService: AuthService,
    private route: ActivatedRoute,
    private sportsRepo: SportsRepository,
    private authRepo: AuthRepository,
  ) {}

  @ViewChild('addSportInput') addSportInput: AutocompleteSingleComponent | undefined

  panelOpenState = false;

  user: any;
  selectedSport: any
  sports = []
  accordionsStates: any[] = []

  async getUser(id: any) {
    this.user = await this.usersRepository.get(id, {
      sports: true,
      tricks: true,
      completedTricks: true
    })
    this.accordionsStates = this.user.sports.map((item: any) => {
      const accordionsState = this.accordionsStates.find((state: any) => state.id === item.id)
      return accordionsState ? accordionsState : { id: item.id, state: false }
    })
  }

  getStateIndex(id: any) {
    return this.accordionsStates.findIndex((state: any) => state.id === id)
  }

  async getSports() {
    this.sports = await this.sportsRepo.list({ tricks: true });
  }

  easyTricks(sport: any) {
    return this.filterTricks('easy', sport)
  }

  mediumTricks(sport: any) {
    return this.filterTricks('medium', sport)
  }

  hardTricks(sport: any) {
    return this.filterTricks('hard', sport)
  }

  filterTricks(complexity: any, sport: any) {
    const filtered = sport ? sport.tricks.filter((item: any) => item.complexity === complexity) : []
    if (this.isCurrentUser) {
      return filtered
    } else {
      return filtered.filter((item: any) => this.isChecked(item.id))
    }
  }

  isUserTricks(sport: any) {
    return sport.tricks.filter((item: any) => this.isChecked(item.id)).length
  }

  get isCurrentUser() {
    return this.user.id === this.authService.user.id
  }

  async addSport() {
    await this.authRepo.addSport(this.selectedSport.id)
    this.addSportInput?.clear()
    this.selectedSport = null
    this.getUser(this.user.id)
    this.authService.getProfile()

  }

  async addTrick(id: any) {
    if (this.isChecked(id)) {
      await this.authRepo.removeTrick(id)
    } else {
      await this.authRepo.addTrick(id)
    }
    this.getUser(this.user.id)
    this.authService.getProfile()
  }

  isChecked(id: any) {
    return this.user.tricks.find((item: any) => item.id === id)
  }

  get filteredSports() {
    return this.sports.filter((sport: any) => !this.user.sports.find((item: any) => item.id === sport.id))
  }

  ngOnInit(): void {
    this.getSports()
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      if (id) {
        this.getUser(id)
      }
    })
  }
}
