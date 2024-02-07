import { getAxiosClient } from '@/app/api/axiosClient';
import {
  ActivitiesQueryDto,
  ActivityDto,
  ApiClient,
  CreateActivityDto,
  SummaryDto,
  SummaryFilterDto,
  UserInfoDto,
} from '@/app/api/types';
import { setToken } from '../auth/session';
import { Client, Project } from '../core/types';

export const apiClient: ApiClient = {
  auth: {
    login: async (email: string, password: string) => {
      // TODO hash password here
      const resp = await (await getAxiosClient()).post('/login', { email, password }, { withCredentials: false });
      // TODO: dont send token in clear text through the network!!!
      if (resp.status !== 200) {
        return false;
      }

      await setToken(resp.data);

      return true;
    },
    logout: function () {
      return Promise.resolve();
    },
  },
  activities: {
    getActivities: async (params?: ActivitiesQueryDto): Promise<ReadonlyArray<ActivityDto>> => {
      // query.clientId && params.push(['clientId', query.clientId.toString()]);
      // query.clientId && params.append('clientId', query.clientId.toString());
      // query.projectId && params.append('projectId', query.projectId.toString());
      // query.rangeFrom && params.append('rangeFrom', query.rangeFrom);
      // query.rangeTo && params.append('rangeTo', query.rangeTo);
      // query.visibleValues && params.append('visibleValues', query.visibleValues);
      const { data } = await (
        await getAxiosClient()
      ).get('/activities', {
        params,
        paramsSerializer: (params) => {
          const serializedParams: string[] = [];

          for (const key in params) {
            if (params.hasOwnProperty(key)) {
              const value = params[key];

              if (value !== undefined) {
                if (Array.isArray(value)) {
                  // Behandlung von Arrays
                  value.forEach((val, i) => {
                    serializedParams.push(`${key}=${encodeURIComponent(val)}`);
                  });
                } else if (typeof value === 'object') {
                  // Behandlung von orderBy
                  const orderByStr = `orderBy[prop]=${encodeURIComponent(
                    value.prop
                  )}&orderBy[direction]=${encodeURIComponent(value.direction)}`;
                  serializedParams.push(orderByStr);
                } else {
                  // Behandlung von anderen Parametern
                  serializedParams.push(`${key}=${encodeURIComponent(value)}`);
                }
              }
            }
          }

          return serializedParams.join('&');
        },
      });
      return data;

      // TODO: add error handling
      // TODO: error handling with redirect to login page if not authenticated
    },
    create: async function (activity: CreateActivityDto): Promise<ActivityDto> {
      const { data } = await (await getAxiosClient()).post('/activities', { ...activity });
      return data;

      // TODO: add error handling
    },
    update: async function (
      activityId: number,
      activity: Partial<Omit<ActivityDto, 'activityID'>>
    ): Promise<ActivityDto> {
      const { data } = await (await getAxiosClient()).put(`/activities/${activityId}`, activity);
      return data;
    },
    delete: async function (activityId: number): Promise<number> {
      const { data } = await (await getAxiosClient()).delete(`/activities/${activityId}`);
      if (data === true) {
        return activityId;
      } else {
        throw new Error(`error while deleting booking with ID ${activityId}`);
      }
    },
    getCurrentActivity: async (): Promise<ActivityDto | undefined> => {
      const { data } = await (await getAxiosClient()).get(`/activities/current`);

      return data;
    },
  },
  users: {
    current: async () => {
      const response = await (await getAxiosClient()).get('/users/current');
      if (response.status !== 200) {
        throw new Error('Failed to get current user');
      }

      return response.data;
    },
    updateProfile: async (userId: number, userInfo: Partial<Omit<UserInfoDto, 'userID'>>): Promise<UserInfoDto> => {
      const { data } = await (await getAxiosClient()).put(`/users/${userId}`, userInfo);
      return data;
    },
    changePassword: async (currentPassword: string, newPassword: string): Promise<boolean> => {
      const { data } = await (await getAxiosClient()).post('/users/change-password', { currentPassword, newPassword });
      return data;
    },
    uploadAvatar: async (file: File): Promise<string> => {
      const formData = new FormData();
      formData.append('file', file);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

      const { data } = await (await getAxiosClient()).post('/users/avatar', formData, config);
      return data;
    },
    getAvatarUrl: async (avatarID?: string) => {
      // TODO Refactor: user global state to avoid multiple http calls
      const userInfo = await apiClient.users.current();
      const url = `${(await getAxiosClient()).getUri()}/users/avatar/${avatarID || userInfo.avatarImageID}`;
      return url;
    },
  },

  projects: {
    getAll: async () => {
      const { data } = await (await getAxiosClient()).get<Array<Project>>('/projects');
      return data;
    },
  },
  clients: {
    getAll: async () => {
      const { data } = await (await getAxiosClient()).get<Array<Client>>('/clients');
      return data;
    },
  },
  reports: {
    summary: async (filter: SummaryFilterDto): Promise<SummaryDto> => {
      const { data } = await (await getAxiosClient()).get('/reports/summary');
      return data;
    },
  },
  extensions: {
    load: async (id: string): Promise<string> => {
      const { data } = await (await getAxiosClient()).get(`/extensions/${id}`);
      return data;
    },
  },
};
