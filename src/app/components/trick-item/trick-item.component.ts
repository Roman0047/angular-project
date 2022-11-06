import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {GlobalService} from "../../global.service";
import {AuthService} from "../../auth.service";
import {AuthRepository} from "../../repository/auth";

@Component({
  selector: 'app-trick-item',
  templateUrl: './trick-item.component.html',
  styleUrls: ['./trick-item.component.scss']
})
export class TrickItemComponent implements OnInit {
  constructor(
    public globalService: GlobalService,
    public authService: AuthService,
    private authRepo: AuthRepository,
  ) { }

  @Input() trick: any

  apiUrl = environment.apiUrl

  get isAvailableForCurrentUser() {
    return this.authService.user.sports.find((sport: any) => {
      return sport.tricksIds.find((item: any) => item === this.trick.id)
    })
  }

  async addTrick() {
    if (this.isChecked) {
      await this.authRepo.removeTrick(this.trick.id)
    } else {
      await this.authRepo.addTrick(this.trick.id)
    }
    await this.authService.getProfile()
  }

  get isChecked() {
    return this.authService.user.tricks.find((item: any) => item.id === this.trick.id)
  }

  ngOnInit(): void {
  }

}
