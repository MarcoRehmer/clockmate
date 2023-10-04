export interface BookingDto {
  id: number;
  startedAt: Date;
  finishedAt?: Date;
  remarks?: string;
  activityType?: string;
  userId: number;
  projectId?: number;
  customerId?: number;
}
