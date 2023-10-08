import { createSlice } from '@reduxjs/toolkit';
import { Booking } from '../../core/types';
import { getBookings } from '@/app/store/bookings/bookingsThunks';

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
  },
});

export default bookingsSlice.reducer;
