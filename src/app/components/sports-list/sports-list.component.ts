import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sports-list',
  templateUrl: './sports-list.component.html',
  styleUrls: ['./sports-list.component.scss']
})
export class SportsListComponent implements OnInit {
  constructor() { }

  @Output() updateList = new EventEmitter<any>();
  @Input() sports: any[] = []

  ngOnInit(): void {
  }

}
