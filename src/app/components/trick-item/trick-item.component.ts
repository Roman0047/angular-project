import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {GlobalService} from "../../global.service";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-trick-item',
  templateUrl: './trick-item.component.html',
  styleUrls: ['./trick-item.component.scss']
})
export class TrickItemComponent implements OnInit {
  constructor(public globalService: GlobalService, public authService: AuthService) { }

  @Input() trick: any

  apiUrl = environment.apiUrl

  get isAvailableForCurrentUser() {
    return this.authService.user.sports.find((sport: any) => {
      return sport.tricksIds.find((item: any) => item === this.trick.id)
    })
  }

  ngOnInit(): void {
  }

}
