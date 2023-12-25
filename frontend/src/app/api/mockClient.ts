import { ActivityDto, ApiClient, CreateActivityDto, UpdateActivityDto } from '@/app/api/types';
import { activitiesMock } from '@/app/api/mocks/activitiesMock';

const activities: Array<ActivityDto> = [...activitiesMock];

export const mockClient: ApiClient = {
  auth: {
    login: function (p1: string, p2: string) {
      return Promise.resolve(true);
    },
    logout: function () {
      return Promise.resolve();
    },
  },
  activities: {
    getActivities: async (filter?: unknown): Promise<ReadonlyArray<ActivityDto>> => {
      return Promise.resolve(activities);
    },
    create: (activity: CreateActivityDto): Promise<ActivityDto> => {
      console.debug(`create activity: ${JSON.stringify(activity)}`);
      const createdActivity = {
        id: Math.max(...activities.map((v) => v.activityID)) + 1,
        startedAt: activity.startedAt,
        remarks: activity.remarks,
        finishedAt: activity.finishedAt,
        projectId: activity.projectId,
        customerId: activity.clientId,
      };

      activities.push(createdActivity);

      return Promise.resolve(createdActivity);
    },
    update: (activityID: number, activity: UpdateActivityDto) => {
      console.debug(`update activity with ID ${activityID}, payload: ${JSON.stringify(activity)}`);
      const existingActivity = activities.find((b) => b.activityID === activityID);
      if (!existingActivity) {
        throw new Error(`activity with ID ${activityID} not found`);
      }

      activities.splice(activities.indexOf(existingActivity), 1, { ...existingActivity, ...activity });
      return Promise.resolve({ ...existingActivity, ...activity });
    },
    delete: (activityID: number) => {
      console.log('delete activity with ID', activityID);
      activities.slice(
        activities.findIndex((b) => b.activityID === activityID),
        1
      );
      return Promise.resolve(activityID);
    },
  },
  settings: {},
};
