import { ApiClient, BookingDto, CreateBookingDto, UpdateBookingDto } from '@/app/api/types';
import { bookingsMock } from '@/app/api/mocks/bookings.mock';

const bookings: Array<BookingDto> = [...bookingsMock];

export const mockClient: ApiClient = {
  auth: {
    login: function (p1: string, p2: string) {
      return Promise.resolve(true);
    },
    logout: function () {
      return Promise.resolve();
    },
  },
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
    update: (bookingId: number, booking: UpdateBookingDto) => {
      console.debug(`update booking with ID ${bookingId}, payload: ${JSON.stringify(booking)}`);
      const existingBooking = bookings.find((b) => b.id === bookingId);
      if (!existingBooking) {
        throw new Error(`booking with ID ${bookingId} not found`);
      }

      bookings.splice(bookings.indexOf(existingBooking), 1, { ...existingBooking, ...booking });
      return Promise.resolve({ ...existingBooking, ...booking });
    },
    delete: (bookingId: number) => {
      console.log('delete booking with ID', bookingId);
      bookings.slice(
        bookings.findIndex((b) => b.id === bookingId),
        1
      );
      return Promise.resolve(bookingId);
    },
  },
  settings: {},
};
