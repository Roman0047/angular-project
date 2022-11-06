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

  async getUser(id: any) {
    this.user = await this.usersRepository.get(id, { sports: true, tricks: true })
  }

  async getSports() {
    this.sports = await this.sportsRepo.list({ tricks: true });
  }

  easyTricks(sport: any) {
    return sport ? sport.tricks.filter((item: any) => item.complexity === 'easy') : []
  }

  mediumTricks(sport: any) {
    return sport ? sport.tricks.filter((item: any) => item.complexity === 'medium') : []
  }

  hardTricks(sport: any) {
    return sport ? sport.tricks.filter((item: any) => item.complexity === 'hard') : []
  }

  get isCurrentUser() {
    return this.user.id === this.authService.user.id
  }

  async addSport() {
    await this.authRepo.addSport(this.selectedSport.id)
    this.addSportInput?.clear()
    this.selectedSport = null
    this.getUser(this.user.id)
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
