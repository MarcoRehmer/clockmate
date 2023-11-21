import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { BookingsState } from '../bookingState';
import { CreateBookingDto } from '@/app/api/types';
import { api } from '@/app/api/api';
import { mapBookingDtoToBooking } from '@/app/api/mapper/map-booking-dto-to-booking';
import { Booking } from '@/app/core/types';

export const addBookingSlice = (builder: ActionReducerMapBuilder<BookingsState>) => {
  builder.addCase(addBooking.pending, (state) => {
    state.loading = true;
  });
  builder.addCase(addBooking.fulfilled, (state, { payload }) => {
    state.loading = false;
    state.bookings.push(payload);
  });
  builder.addCase(addBooking.rejected, (state, { error }) => {
    state.loading = false;
    console.error('Error (addBooking):', error.message);
  });
};

export const addBooking = createAsyncThunk('bookings/addBooking', async (booking: Omit<Booking, 'id'>, _) => {
  const startedAtISO = booking.startedAt.toISO();
  if (!startedAtISO) {
    throw new Error(`booking startetAt could not be serialized to ISO format (value: ${booking.startedAt})`);
  }
  const payload: CreateBookingDto = {
    startedAt: startedAtISO,
    finishedAt: booking.finishedAt?.toISO() || undefined,
    projectId: booking.projectId,
    customerId: booking.clientId,
    remarks: booking.remarks,
  };
  const createdBooking = await api.bookings.create(payload);
  return mapBookingDtoToBooking(createdBooking);
});
