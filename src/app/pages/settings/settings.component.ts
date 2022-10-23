import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth.service";
import {ThemeRepository} from "../../repository/theme";
import {GlobalService} from "../../global.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private themeRepo: ThemeRepository,
    public globalService: GlobalService
  ) {}

  form = {
    font: this.authService.user.theme.font,
    backgroundImage: this.authService.user.theme.backgroundImage
  }

  fontStyles = [
    {value: 'Arial', title: 'Arial'},
    {value: 'Roboto', title: 'Roboto'},
    {value: 'Verdana', title: 'Verdana'},
    {value: 'Georgia', title: 'Georgia'},
  ];

  async save() {
    try {
      this.form = await this.themeRepo.update(this.authService.user.theme.id, this.form)
      this.globalService.toast('Saved')
      await this.authService.getProfile()
    } catch (error: any) {
      this.globalService.toast('Something went wrong')
    }
  }

  ngOnInit(): void {
  }

}
