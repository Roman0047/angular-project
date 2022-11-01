import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SportsRepository} from "../../repository/sports";
import {AutocompleteComponent} from "../autocomplete/autocomplete.component";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  constructor(private sportsRepo: SportsRepository) { }

  @ViewChild('sportsAutocomplete') sportsAutocomplete: AutocompleteComponent | undefined
  @ViewChild('tricksAutocomplete') tricksAutocomplete: AutocompleteComponent | undefined

  @Input() isAdminSports: boolean = false;
  @Output() search = new EventEmitter<any>();
  @Output() setSports = new EventEmitter<any>();
  @Output() setTricks = new EventEmitter<any>();

  isOpen = false
  selectedSports: any[] = []
  selectedTricks: any[] = []
  sports: any[] = []
  tricks: any[] = []

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

  updateHeightWithTimeout() {
    setTimeout(() => {
      this.updateHeight()
    }, 0)
  }

  setFiltersTransition(isTransition: boolean) {
    let filters = document.getElementById('filters')
    if (filters) {
      filters.style.transition = isTransition ? 'all 0.5s ease' : 'unset'
    }
  }

  selectSports(items: any) {
    this.selectedSports = items
    this.setSports.emit(this.selectedSports)
    this.updateTricks()
    this.setTricks.emit(this.selectedTricks)
    this.updateHeightAfterChange()
  }

  selectTricks(items: any) {
    this.selectedTricks = items
    this.setTricks.emit(this.selectedTricks)
    this.updateHeightAfterChange()
  }

  updateHeightAfterChange() {
    this.setFiltersTransition(false)
    this.updateHeightWithTimeout()
    setTimeout(() => {
      this.setFiltersTransition(true)
    }, 100)
  }

  async getSports() {
    this.sports = await this.sportsRepo.list({ tricks: true });
  }

  updateTricks() {
    this.tricks = []

    this.selectedSports.forEach((item: any) => {
      this.tricks.push(...item.tricks)
    })

    this.tricks = this.tricks.filter((value, index) => {
      const _value = JSON.stringify(value);
      return index === this.tricks.findIndex(obj => {
        return JSON.stringify(obj) === _value;
      });
    });

    this.selectedTricks = this.selectedTricks.filter((trick: any) => this.tricks.find(item => item.id === trick.id))
  }

  addSportId(id: any) {
    if (!this.selectedSports.find((item: any) => item.id === id)) {
      const sport = this.sports.find((item: any) => item.id === id);
      if (sport) {
        this.selectedSports.push(sport)
        this.sportsAutocomplete?.updateSelectedOptions(this.selectedSports);
      }
    }
  }

  addTrickId(id: any) {
    const sport: any = this.sports.find((item: any) => item.tricksIds.find((trickId: any) => trickId === id))
    if (sport) {
      this.addSportId(sport.id);
      if (!this.selectedTricks.find((item: any) => item.id === id)) {
        const trick = this.tricks.find((item: any) => item.id === id);
        if (trick) {
          this.selectedTricks.push(trick)
          setTimeout(() => {
            this.tricksAutocomplete?.updateSelectedOptions(this.selectedTricks);
          }, 0)
        }
      }
    }
  }

  ngOnInit() {
    this.getSports();
  }
}
