import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.scss']
})
export class SportComponent implements OnInit {
  constructor() { }

  @Input() sport: any = null

  apiUrl = environment.apiUrl

  ngOnInit(): void {
  }

}
