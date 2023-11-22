import { Booking } from '@/app/core/types';
import { AppState } from '@/app/store/store';

export const selectCurrentBookings = (state: AppState) => state.bookings.bookings;

export const bookingsLoading = (state: AppState) => state.bookings.loading;

export const selectCurrentActiveBooking = (state: AppState): Booking | undefined =>
  state.bookings.bookings.find((booking) => !booking.finishedAt);
