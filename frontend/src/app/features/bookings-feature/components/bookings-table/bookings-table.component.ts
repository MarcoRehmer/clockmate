import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Booking} from "../../types";


@Component({
  selector: 'clockmate-bookings-table',
  templateUrl: './bookings-table.component.html',
  styleUrls: ['./bookings-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingsTableComponent {
  @Input()
  bookings: ReadonlyArray<Booking> = [];

  readonly displayedColumns = [
    'startTime',
    'endTime',
    'projectId',
    'types',
    'remarks',
  ];
}
