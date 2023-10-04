export interface Booking {
  id: number;
  duration: string;
  client?: string; // TODO: have to be number / gid
  project?: string; // TODO: have to be number / gid
  issue?: string;
  remarks?: string;
}
