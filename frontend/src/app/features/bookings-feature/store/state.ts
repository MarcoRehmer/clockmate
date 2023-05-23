import { Booking } from '../types';
import { createFeatureSelector } from '@ngrx/store';

export interface BookingsFeatureState {
  bookings: ReadonlyArray<Booking>;
}

export const initialBookingsFeatureState: BookingsFeatureState = {
  bookings: [],
};

export const selectBookingFeature = createFeatureSelector<BookingsFeatureState>('bookings-feature');
