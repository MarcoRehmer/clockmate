import { BookingDto } from '@/app/api/types';
import { DateTime } from 'luxon';

export const bookingsMock: ReadonlyArray<BookingDto> = [
  {
    id: 1,
    clientId: 1,
    projectId: 1,
    remarks: 'My very first booking',
    startedAt: DateTime.now().minus({ hour: 1, minute: 30 }).toISODate() || '',
    finishedAt: DateTime.now().toISODate() || undefined,
  },
  {
    id: 2,
    clientId: 1,
    projectId: 1,
    remarks: 'My second booking',
    startedAt: DateTime.now().minus({ hour: 1, minute: 30 }).toISODate() || '',
    finishedAt: DateTime.now().toISODate() || undefined,
  },
];
