import { ActivityDto } from '@/app/api/types';
import { Activity } from '@/app/core/types';
import { DateTime } from 'luxon';

export function mapActivityDtoToActivity(activityDto: ActivityDto): Activity {
  return {
    id: activityDto.activityID,
    remarks: activityDto.remarks,
    startedAt: DateTime.fromISO(activityDto.startedAt),
    finishedAt: activityDto.finishedAt ? DateTime.fromISO(activityDto.finishedAt) : undefined,
    projectID: activityDto.projectID || undefined,
    clientID: activityDto.clientID || undefined,
  };
}
