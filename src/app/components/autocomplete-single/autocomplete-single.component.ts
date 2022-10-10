import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface Sport {
  id: number;
  name: string;
}

@Component({
  selector: 'app-autocomplete-single',
  templateUrl: './autocomplete-single.component.html',
  styleUrls: ['./autocomplete-single.component.scss']
})
export class AutocompleteSingleComponent implements OnInit {
  // @ts-ignore
  myControl = new FormControl<string | Sport>('');
  @Input() options: Sport[] = [];
  @Input() label: any
  @Input() appearance: any
  @Output() updateValue = new EventEmitter<any>();

  filteredOptions: Observable<Sport[]> | undefined;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  emitUpdateValue() {
    this.updateValue.emit(this.myControl.value);
  }

  displayFn(sport: Sport): string {
    return sport && sport.name ? sport.name : '';
  }

  private _filter(name: string): Sport[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}
