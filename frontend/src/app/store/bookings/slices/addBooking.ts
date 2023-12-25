import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { BookingsState } from '../bookingState';
import { CreateBookingDto } from '@/app/api/types';
import { api } from '@/app/api/api';
import { Booking } from '@/app/core/types';
import { getBookings } from '@/app/store/bookings/slices/getBookings';
import { AppState } from '@/app/store/store';

export const addBookingSlice = (builder: ActionReducerMapBuilder<BookingsState>) => {
  builder.addCase(addBooking.pending, (state) => {
    state.loading = true;
  });
  builder.addCase(addBooking.fulfilled, (state, { payload }) => {
    state.loading = false;
  });
  builder.addCase(addBooking.rejected, (state, { error }) => {
    state.loading = false;
    console.error('Error (addBooking):', error.message);
  });
};

export const addBooking = createAsyncThunk<void, Omit<Booking, "id">, { state: AppState }>(
  'bookings/addBooking',
  async (booking: Omit<Booking, 'id'>, { dispatch }) => {
    const startedAtISO = booking.startedAt.toISO();
    if (!startedAtISO) {
      throw new Error(`booking startedAt could not be serialized to ISO format (value: ${booking.startedAt})`);
    }

    const payload: CreateBookingDto = {
      startedAt: startedAtISO,
      finishedAt: booking.finishedAt?.toISO() || undefined,
      projectId: booking.projectId,
      clientId: booking.clientId,
      remarks: booking.remarks,
    };
    try {
      await api.activities.create(payload);

      dispatch(getBookings());
    } catch (err) {
      // TODO: return better error message, add error handling
      throw err;
    }
  }
);
