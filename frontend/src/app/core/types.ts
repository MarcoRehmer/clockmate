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
