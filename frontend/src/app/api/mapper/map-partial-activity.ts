import { UpdateActivityDto } from '@/app/api/types';
import { Activity } from '@/app/core/types';
import { DateTime } from 'luxon';

export function mapToUpdateActivity(input: Partial<Omit<Activity, 'id'>>): UpdateActivityDto {
  return Object.entries(input).reduce((acc, [key, value]) => {
    if ((key === 'startedAt' || key === 'finishedAt') && value instanceof DateTime) {
      acc[key] = value?.toISO() || undefined;
    } else {
      acc[key] = value;
    }
    return acc;
  }, {} as { [key: string]: any }); // TODO: improve type to avoid 'any'
}
