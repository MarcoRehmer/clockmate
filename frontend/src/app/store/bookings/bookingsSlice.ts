import { createSlice } from '@reduxjs/toolkit';
import { Booking } from '../../core/types';
import { addBooking, deleteBooking, editBooking, getBookings } from '@/app/store/bookings/bookingsThunks';

export interface BookingsState {
  bookings: ReadonlyArray<Booking>;
  loading: boolean;
}

const initialState: BookingsState = {
  bookings: [],
  loading: false,
};

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // *** getBookings ***
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

    // *** addBooking ***
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

    // *** deleteBooking ***
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

    // *** editBooking ***
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
  },
});

export default bookingsSlice.reducer;
