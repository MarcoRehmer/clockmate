export interface Booking {
  id: number;
  startedAt: Date;
  finishedAt?: Date;
  clientId?: number; // TODO: have to be number / gid
  projectId?: number; // TODO: have to be number / gid
  remarks?: string;
}

export interface Client {
  id: number;
  name: string;
  projects: ReadonlyArray<Project>;
}

export interface Project {
  id: number;
  name: string;
}
