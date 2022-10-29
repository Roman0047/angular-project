import {ChangeDetectionStrategy, Component, Input, Output, EventEmitter} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent {
  constructor() { }
  @Input() label: any
  @Input() options: any
  @Output() setOptions = new EventEmitter<any>();

  optionsCtrl = new FormControl([]);

  onFeatureRemoved(option: string) {
    const options = this.optionsCtrl.value as string[];
    this.removeFirst(options, option);
    this.optionsCtrl.setValue(options);
    this.change();
  }

  private removeFirst<A>(array: A[], toRemove: A): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  change() {
    this.setOptions.emit(this.optionsCtrl.value);
  }

}
