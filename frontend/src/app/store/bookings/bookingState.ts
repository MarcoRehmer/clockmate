import { createSlice } from '@reduxjs/toolkit';
import { Booking } from '../../core/types';
import { getBookingsSlice } from './slices/getBookings';
import { addBookingSlice } from './slices/addBooking';
import { deleteBookingSlice } from './slices/deletBooking';
import { editBookingSlice } from './slices/editBooking';

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
    getBookingsSlice(builder);
    addBookingSlice(builder);
    deleteBookingSlice(builder);
    editBookingSlice(builder);
  },
});

export default bookingsSlice.reducer;
