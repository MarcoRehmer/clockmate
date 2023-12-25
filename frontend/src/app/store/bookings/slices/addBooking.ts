import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { BookingsState } from '../bookingState';
import { CreateActivityDto } from '@/app/api/types';
import { api } from '@/app/api/api';
import { Activity } from '@/app/core/types';
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

export const addBooking = createAsyncThunk<void, Omit<Activity, "id">, { state: AppState }>(
  'bookings/addBooking',
  async (booking: Omit<Activity, 'id'>, { dispatch }) => {
    const startedAtISO = booking.startedAt.toISO();
    if (!startedAtISO) {
      throw new Error(`booking startedAt could not be serialized to ISO format (value: ${booking.startedAt})`);
    }

    const payload: CreateActivityDto = {
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
