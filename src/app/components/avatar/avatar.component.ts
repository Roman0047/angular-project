import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  constructor(public authService: AuthService) { }

  @Input() user: any;

  apiUrl = environment.apiUrl

  ngOnInit(): void {
  }

}
