import { ApiClient, BookingDto, CreateBookingDto } from '@/app/api/types';
import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-type': 'application/json',
  },
});

export const apiClient: ApiClient = {
  auth: {
    login: function (username: string, passwordHash: string) {
      if (username === 'admin' && passwordHash === 'admin') {
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    },
    logout: function () {
      return Promise.resolve();
    },
  },
  bookings: {
    getAll: async (filter?: unknown): Promise<ReadonlyArray<BookingDto>> => {
      const { data } = await http.get('/bookings');
      return data;

      // TODO: add error handling
    },
    create: async function (booking: CreateBookingDto): Promise<BookingDto> {
      const { data } = await http.post('/bookings', booking);
      return data;

      // TODO: add error handling
    },
    update: async function (bookingId: number, booking: Partial<Omit<BookingDto, 'id'>>): Promise<BookingDto> {
      const { data } = await http.put(`/bookings/${bookingId}`, booking);
      return data;
    },
    delete: async function (bookingId: number): Promise<number> {
      const { data } = await http.delete(`/bookings/${bookingId}`);
      if (data === true) {
        return bookingId;
      } else {
        throw new Error(`error while deleting booking with ID ${bookingId}`);
      }
    },
  },
  settings: {},
};
