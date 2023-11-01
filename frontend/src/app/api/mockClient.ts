import { ApiClient, BookingDto, CreateBookingDto } from '@/app/api/types';
import { bookingsMock } from '@/app/api/mocks/bookings.mock';

const bookings: Array<BookingDto> = [...bookingsMock];

export const mockClient: ApiClient = {
  bookings: {
    getAll: async (filter?: unknown): Promise<ReadonlyArray<BookingDto>> => {
      return Promise.resolve(bookings);
    },
    create: (booking: CreateBookingDto): Promise<BookingDto> => {
      console.debug(`create booking: ${JSON.stringify(booking)}`);
      const createdBooking = {
        id: Math.max(...bookings.map((v) => v.id)) + 1,
        startedAt: booking.startedAt,
        remarks: booking.remarks,
        finishedAt: booking.finishedAt,
        projectId: booking.projectId,
        customerId: booking.customerId,
      };

      bookings.push(createdBooking);

      return Promise.resolve(createdBooking);
    },
    update: (bookingId: string, booking: any) => {
      console.debug(
        `update booking with ID ${bookingId}, payload: ${JSON.stringify(
          booking
        )}`
      );
    },
    delete: (bookingId: string) => {
      console.debug(`delete booking with ID ${bookingId}`);
    },
  },
  settings: {},
};
