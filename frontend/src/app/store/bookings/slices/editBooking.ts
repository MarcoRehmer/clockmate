import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { BookingsState } from '../bookingState';
import { Booking } from '@/app/core/types';
import { api } from '@/app/api/api';
import { mapBookingDtoToBooking } from '@/app/api/mapper/map-booking-dto-to-booking';
import { DateTime } from 'luxon';

export const editBookingSlice = (builder: ActionReducerMapBuilder<BookingsState>) => {
  builder.addCase(editBooking.pending, (state) => {
    state.loading = true;
  });
  builder.addCase(editBooking.fulfilled, (state, { payload }) => {
    state.loading = false;
    state.bookings = state.bookings.map((booking) => {
      if (booking.id === payload.id) {
        return payload;
      }
      return booking;
    });
  });
  builder.addCase(editBooking.rejected, (state, { error }) => {
    state.loading = false;
    console.error('Error (editBooking):', error.message);
  });
};

export const editBooking = createAsyncThunk(
  'bookings/editBooking',
  async ({ bookingId, partialBooking }: { bookingId: number; partialBooking: Partial<Omit<Booking, 'id'>> }, _) => {
    const updateObj = Object.entries(partialBooking).reduce((acc, [key, value]) => {
      if ((key === 'startedAt' || key === 'finishedAt') && value instanceof DateTime) {
        acc[key] = value?.toISO() || undefined;
      } else {
        acc[key] = value;
      }
      return acc;
    }, {} as { [key: string]: any });
    const updatedBooking = await api.activities.update(bookingId, updateObj);
    return mapBookingDtoToBooking(updatedBooking);
  }
);
