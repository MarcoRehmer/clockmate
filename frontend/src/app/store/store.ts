import { configureStore } from '@reduxjs/toolkit';
import { bookingsSlice } from '@/app/store/bookings/bookingsSlice';

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    [bookingsSlice.name]: bookingsSlice.reducer,
  },
  devTools: true,
});
