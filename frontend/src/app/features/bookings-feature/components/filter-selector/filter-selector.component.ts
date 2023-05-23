import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'clockmate-filter-selector',
  templateUrl: 'filter-selector.component.html',
  styleUrls: ['filter-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterSelectorComponent {
  readonly selectedDate$: Observable<Date>;

  constructor() {
    this.selectedDate$ = of(new Date());
  }

  navigateForward(): void {
    console.log('navigate forward');
  }

  navigateBackward(): void {
    console.log('navigate backward');
  }

  navigateToday(): void {
    console.log('navigate today');
  }

  openDatePicker(): void {
    console.log('open date picker');
  }
}
