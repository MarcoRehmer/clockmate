import { BookingDto } from '@/app/api/types';
import { Booking } from '@/app/core/types';
import { DateTime } from 'luxon';

export function mapBookingDtoToBooking(bookingDto: BookingDto): Booking {
  return {
    id: bookingDto.id,
    remarks: bookingDto.remarks,
    startedAt: DateTime.fromISO(bookingDto.startedAt),
    finishedAt: bookingDto.finishedAt ? DateTime.fromISO(bookingDto.finishedAt) : undefined,
  };
}
