import { DateTime } from 'luxon';

export interface Activity {
  id: number;
  startedAt: DateTime;
  finishedAt?: DateTime;
  clientID?: number;
  projectID?: number;
  remarks?: string;
}

export interface Client {
  clientID: number;
  name: string;
  clientNumber?: string;
  // projects: ReadonlyArray<Project>;
}

export interface Project {
  projectID: number;
  title: string;
  description: string;
  clientID: number;
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
  avatarImageID?: string;
}
