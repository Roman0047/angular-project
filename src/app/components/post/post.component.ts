import {Component, Input, OnInit} from '@angular/core';
import {GlobalService} from "../../global.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  constructor(public globalService: GlobalService) { }

  apiUrl = environment.apiUrl

  @Input() small: any
  @Input() post: any

  ngOnInit(): void {
  }

}
