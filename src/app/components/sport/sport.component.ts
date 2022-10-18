import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from "../../../environments/environment";
import {SportsRepository} from "../../repository/sports";

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.scss']
})
export class SportComponent implements OnInit {
  constructor(private sportsRepo: SportsRepository) { }

  @Input() sport: any = null
  @Output() updateList = new EventEmitter<any>();

  apiUrl = environment.apiUrl

  ngOnInit(): void {
  }

  async removeSport() {
    await this.sportsRepo.remove(this.sport.id)
    this.updateList.emit()
  }
}
