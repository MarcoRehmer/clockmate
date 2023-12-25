import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Activity } from '../../core/types';
import { getBookingsSlice } from './slices/getBookings';
import { addBookingSlice } from './slices/addBooking';
import { deleteBookingSlice } from './slices/deletBooking';
import { editBookingSlice } from './slices/editBooking';

export interface BookingsState {
  bookings: ReadonlyArray<Activity>;
  loading: boolean;
  query: {
    selectedRange?: { from: string; to: string };
  };
}

const initialState: BookingsState = {
  bookings: [],
  loading: false,
  query: { selectedRange: { from: '2023-12-01', to: '2023-12-31' } },
};

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    changeSelectedRange: (state, action: PayloadAction<{ from: string; to: string }>) => ({
      ...state,
      query: { ...state.query, selectedRange: action.payload },
    }),
  },
  extraReducers: (builder) => {
    getBookingsSlice(builder);
    addBookingSlice(builder);
    deleteBookingSlice(builder);
    editBookingSlice(builder);
  },
});

export const { changeSelectedRange } = bookingsSlice.actions;

export default bookingsSlice.reducer;
