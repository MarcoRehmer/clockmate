import { createSlice } from '@reduxjs/toolkit';

export interface BookingsState {
  stopwatch: number;
}

const initialState: BookingsState = {
  stopwatch: 12,
};

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    incrementStopwatch: (state, action) => {
      console.log('dispatch increment');
      state.stopwatch += action.payload;
    },
    resetStopwatch: (state) => {
      console.log('dispatch reset');
      state.stopwatch = 0;
    },
  },
});

export const { incrementStopwatch, resetStopwatch } = bookingsSlice.actions;
export const selectStopwatch = (state: any) => state.bookings.stopwatch;
export default bookingsSlice.reducer;
