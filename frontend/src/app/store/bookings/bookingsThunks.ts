import { createAsyncThunk } from '@reduxjs/toolkit';
import { mapBookingDtoToBooking } from '@/app/api/mapper/map-booking-dto-to-booking';
import { api } from '@/app/api/api';

export const getBookings = createAsyncThunk(
  'bookings/getBookings',
  async (filter: { sortBy: string }, thunkAPI) =>
    mapBookingDtoToBooking(await api.bookings.getAll(filter))
);
