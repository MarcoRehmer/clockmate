import { createAsyncThunk } from '@reduxjs/toolkit';
import { mapBookingDtoToBooking } from '@/app/api/mapper/map-booking-dto-to-booking';
import { api } from '@/app/api/api';
import { Booking } from '@/app/core/types';
import { CreateBookingDto } from '@/app/api/types';

export const getBookings = createAsyncThunk(
  'bookings/getBookings',
  async (filter: { sortBy: string }, _) =>
    (await api.bookings.getAll(filter)).map((booking) =>
      mapBookingDtoToBooking(booking)
    )
);

export const addBooking = createAsyncThunk(
  'bookings/addBooking',
  async (booking: Omit<Booking, 'id'>, _) => {
    const startedAtISO = booking.startedAt.toISO();
    if (!startedAtISO) {
      throw new Error(
        `booking startetAt could not be serialized to ISO format (value: ${booking.startedAt})`
      );
    }
    const payload: CreateBookingDto = {
      startedAt: startedAtISO,
      finishedAt: booking.finishedAt?.toISO() || undefined,
      projectId: booking.projectId,
      customerId: booking.clientId,
      remarks: booking.remarks,
    };
    const createdBooking = await api.bookings.create(payload);
    return mapBookingDtoToBooking(createdBooking);
  }
);
