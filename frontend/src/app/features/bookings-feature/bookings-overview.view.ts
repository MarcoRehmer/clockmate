import {Component} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Booking} from './types';

@Component({
  selector: 'clockmate-booking-overview',
  templateUrl: 'bookings-overview.view.html',
  styleUrls: [],
})
export class BookingsOverviewView {
  readonly bookings$: Observable<ReadonlyArray<Booking>>;

  constructor() {
    this.bookings$ = of([]);
  }
}
