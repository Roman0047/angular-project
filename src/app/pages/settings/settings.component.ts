import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  fontStyles = [
    {value: 'Inner', title: 'Inner'},
    {value: 'Roboto', title: 'Roboto'},
  ];
  fontWeights = [
    {value: '400', title: '400'},
    {value: '500', title: '500'},
    {value: '600', title: '600'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
