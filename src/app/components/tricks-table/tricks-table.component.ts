import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GlobalService} from "../../global.service";
import {environment} from "../../../environments/environment";
import {TricksRepository} from "../../repository/tricks";

@Component({
  selector: 'app-tricks-table',
  templateUrl: './tricks-table.component.html',
  styleUrls: ['./tricks-table.component.scss']
})
export class TricksTableComponent implements OnInit {
  constructor(public globalService: GlobalService, private tricksRepo: TricksRepository) { }

  @Input() tricks: any[] = [];
  @Input() type: string = '';
  @Input() isTrickSelected: boolean = false;
  @Input() isEditMode: boolean = false;
  @Output() create = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() updateSport = new EventEmitter<any>();

  apiUrl = environment.apiUrl

  displayedColumns = ['image', 'name', 'description', 'id'];

  async removeTrick(id: any) {
    await this.tricksRepo.remove(id)
    this.updateSport.emit()
  }

  ngOnInit(): void {
  }
}
