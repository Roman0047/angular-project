import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sports-list',
  templateUrl: './sports-list.component.html',
  styleUrls: ['./sports-list.component.scss']
})
export class SportsListComponent implements OnInit {
  constructor() { }

  @Input() sports: any[] = []

  ngOnInit(): void {
  }

}
