import { createSlice } from '@reduxjs/toolkit';
import { store } from '../store';
import { Booking } from '../../core/types';

interface BookingDto {
  id: number;
  startedAt: Date;
  finishedAt?: Date;
  remarks?: string;
  activityType?: string;
  userId: number;
  projectId?: number;
  customerId?: number;
}

type AppState = ReturnType<typeof store.getState>;

export interface BookingsState {
  stopwatch: number; // TODO: improve
  bookings: ReadonlyArray<Booking>;
}

const initialState: BookingsState = {
  stopwatch: 0,
  bookings: [],
};

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    incrementStopwatch: (state, action) => {
      state.stopwatch += action.payload;
    },
    resetStopwatch: (state) => {
      state.stopwatch = 0;
    },
  },
});

export const { incrementStopwatch, resetStopwatch } = bookingsSlice.actions;

/* selectors */
export const selectStopwatch = (state: AppState) => state.bookings.stopwatch;
export const selectBookings = (state: AppState) => state.bookings.bookings;

export default bookingsSlice.reducer;
