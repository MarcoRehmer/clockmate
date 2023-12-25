import { ActivityDto } from '@/app/api/types';
import { Activity } from '@/app/core/types';
import { DateTime } from 'luxon';

export function mapBookingDtoToBooking(bookingDto: ActivityDto): Activity {
  return {
    id: bookingDto.activityID,
    remarks: bookingDto.remarks,
    startedAt: DateTime.fromISO(bookingDto.startedAt),
    finishedAt: bookingDto.finishedAt ? DateTime.fromISO(bookingDto.finishedAt) : undefined,
  };
}
