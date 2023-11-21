import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { BookingsState } from '../bookingState';
import { api } from '@/app/api/api';

export const deleteBookingSlice = (builder: ActionReducerMapBuilder<BookingsState>) => {
  builder.addCase(deleteBooking.pending, (state) => {
    state.loading = true;
  });
  builder.addCase(deleteBooking.fulfilled, (state, { payload }) => {
    state.loading = false;
    state.bookings = state.bookings.filter((booking) => booking.id !== payload);
  });
  builder.addCase(deleteBooking.rejected, (state, { error }) => {
    state.loading = false;
    console.error('Error (deleteBooking):', error.message);
  });
};

export const deleteBooking = createAsyncThunk('bookings/deleteBooking', async (bookingId: number) => {
  return await api.bookings.delete(bookingId);
});
