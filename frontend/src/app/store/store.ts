import { configureStore } from '@reduxjs/toolkit';
import { bookingsSlice } from './slices/bookingsSlice';

export const store = configureStore({
  reducer: {
    [bookingsSlice.name]: bookingsSlice.reducer,
  },
  devTools: true,
});
