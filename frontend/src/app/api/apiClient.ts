import { ApiClient, BookingDto, BookingsQueryDto, CreateBookingDto } from '@/app/api/types';
import { setToken } from '../auth/session';
import { getAxiosClient } from '@/app/api/axiosClient';

export const apiClient: ApiClient = {
  auth: {
    login: async (email: string, password: string) => {
      // TODO hash password here
      const resp = await (await getAxiosClient()).post('/login', { email, password });
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
    getActivities: async (params?: BookingsQueryDto): Promise<ReadonlyArray<BookingDto>> => {
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
    create: async function (booking: CreateBookingDto): Promise<BookingDto> {
      const { data } = await (await getAxiosClient()).post('/activities', booking);
      return data;

      // TODO: add error handling
    },
    update: async function (bookingId: number, booking: Partial<Omit<BookingDto, 'id'>>): Promise<BookingDto> {
      const { data } = await (await getAxiosClient()).put(`/activities/${bookingId}`, booking);
      return data;
    },
    delete: async function (bookingId: number): Promise<number> {
      const { data } = await (await getAxiosClient()).delete(`/activities/${bookingId}`);
      if (data === true) {
        return bookingId;
      } else {
        throw new Error(`error while deleting booking with ID ${bookingId}`);
      }
    },
  },
  settings: {},
};
