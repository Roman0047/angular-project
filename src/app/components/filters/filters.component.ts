import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  isOpen = false
  selectedSports = []
  sports = [
    {
      id: 1,
      name: 'sport1',
    },
    {
      id: 2,
      name: 'sport2',
    },
    {
      id: 3,
      name: 'sport3',
    },
    {
      id: 4,
      name: 'sport4',
    },
  ]

  setIsOpen() {
    this.isOpen = !this.isOpen
    this.updateHeight()
  }

  updateHeight() {
    let filters = document.getElementById('filters')
    let inner = document.getElementById('filters-inner')
    if (filters && inner) {
      if (this.isOpen) {
        filters.style.height = inner.offsetHeight + 'px'
      } else {
        filters.style.height = '22px'
      }
    }
  }

  selectSports(sports: any) {
    this.selectedSports = sports
    this.updateHeight()
  }

  constructor() { }

  ngOnInit(): void {
  }

}
