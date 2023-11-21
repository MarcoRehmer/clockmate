import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { BookingsState } from '../bookingState';
import { Booking } from '@/app/core/types';
import { api } from '@/app/api/api';
import { mapBookingDtoToBooking } from '@/app/api/mapper/map-booking-dto-to-booking';

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

export const editBooking = createAsyncThunk('bookings/editBooking', async (booking: Booking) => {
  const updatedBooking = await api.bookings.update(booking.id, {
    remarks: booking.remarks,
    startedAt: booking.startedAt.toISO() || undefined,
    finishedAt: booking.finishedAt?.toISO() || undefined,
  });
  return mapBookingDtoToBooking(updatedBooking);
});
