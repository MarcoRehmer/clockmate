import { DateTime } from 'luxon';

export interface Activity {
  id: number;
  startedAt: DateTime;
  finishedAt?: DateTime;
  clientId?: number;
  projectId?: number;
  remarks?: string;
}

export interface Client {
  id: number;
  name: string;
  clientNumber?: string;
  projects: ReadonlyArray<Project>;
}

export interface Project {
  id: number;
  name: string;
}

export interface UserSummary {
  today: { hours: number; minutes: number };
  week: { hours: number; minutes: number };
  month: { hours: number; minutes: number };
}

export interface UserInfo {
  userID: number;
  email: string;
  firstName: string;
  lastName: string;
  active: boolean;
}
