import { ApiClient, BookingDto, CreateBookingDto } from '@/app/api/types';
import axios from 'axios';
import { setSession } from '@/app/auth/session';

const http = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-type': 'application/json',
  },
});

export const apiClient: ApiClient = {
  auth: {
    login: async (email: string, password: string) => {
      // TODO hash password here
      const resp = await http.post('/login', { email, password });
      // TODO: dont send token in clear text through the network!!!

      if (resp.status !== 200) {
        return false;
      }
      
      await setSession(resp.data);

      return true;
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
      // TODO: error handling with redirect to login page if not authenticated
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
