import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GlobalService} from "../../global.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-tricks-table',
  templateUrl: './tricks-table.component.html',
  styleUrls: ['./tricks-table.component.scss']
})
export class TricksTableComponent implements OnInit {
  constructor(public globalService: GlobalService) { }

  @Input() tricks: any[] = [];
  @Input() type: string = '';
  @Output() create = new EventEmitter<any>();

  apiUrl = environment.apiUrl

  displayedColumns = ['image', 'name', 'description', 'id'];

  ngOnInit(): void {
  }
}
