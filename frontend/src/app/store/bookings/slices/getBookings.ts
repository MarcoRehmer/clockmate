import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { BookingsState } from '../bookingState';
import { api } from '@/app/api/api';
import { mapBookingDtoToBooking } from '@/app/api/mapper/map-booking-dto-to-booking';
import { Booking } from '@/app/core/types';
import { AppState } from '@/app/store/store';
import { BookingsQueryDto } from '@/app/api/types';

export const getBookingsSlice = (builder: ActionReducerMapBuilder<BookingsState>) => {
  builder.addCase(getBookings.pending, (state) => {
    state.loading = true;
  });
  builder.addCase(getBookings.fulfilled, (state, { payload }) => {
    state.bookings = [...payload];
    state.loading = false;
  });
  builder.addCase(getBookings.rejected, (state, action) => {
    state.loading = false;
    console.error('Error (getBookings):', action.error.message);
  });
};

export const getBookings = createAsyncThunk<Array<Booking>, void, { state: AppState }>(
  'bookings/getBookings',
  async (_, { getState }) => {
    const { bookings } = getState();

    const query: BookingsQueryDto = {
      rangeFrom: bookings.query.selectedRange?.from,
      rangeTo: bookings.query.selectedRange?.to,
    };

    return (await api.activities.getActivities(query)).map((booking) => mapBookingDtoToBooking(booking));
  }
);
