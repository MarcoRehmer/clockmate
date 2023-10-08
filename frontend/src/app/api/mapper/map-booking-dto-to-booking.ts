import { BookingDto } from '@/app/api/types';
import { Booking } from '@/app/core/types';
import { DateTime } from 'luxon';

export function mapBookingDtoToBooking(
  bookingsDto: ReadonlyArray<BookingDto>
): ReadonlyArray<Booking> {
  // TODO: extend mapping
  return bookingsDto.map((bookingDto) => ({
    id: bookingDto.id,
    remarks: bookingDto.remarks,
    duration: DateTime.fromISO(
      bookingDto.finishedAt || new Date().toISOString()
    )
      .diff(DateTime.fromISO(bookingDto.startedAt))
      .toFormat('hh:mm'),
  }));
}
