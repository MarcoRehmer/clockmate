import { createSelector } from '@ngrx/store';
import { selectBookingFeature } from '../state';

export const selectCurrentBookings = createSelector(
  selectBookingFeature,
  (state) => state.bookings
);
