import { ApiClient, BookingDto } from '@/app/api/types';
import { bookingsMock } from '@/app/api/mocks/bookings.mock';

export const mockClient: ApiClient = {
  bookings: {
    getAll: async (filter?: unknown): Promise<ReadonlyArray<BookingDto>> => {
      return Promise.resolve(bookingsMock);
    },
    create: (booking: any) => {
      console.log(`create booking: ${JSON.stringify(booking)}`);
    },
    update: (bookingId: string, booking: any) => {
      console.log(
        `update booking with ID ${bookingId}, payload: ${JSON.stringify(
          booking
        )}`
      );
    },
    delete: (bookingId: string) => {
      console.log(`delete booking with ID ${bookingId}`);
    },
  },
  settings: {},
};
