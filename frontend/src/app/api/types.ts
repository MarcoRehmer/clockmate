export interface ApiClient {
  activities: {
    getActivities(query?: ActivitiesQueryDto): Promise<ReadonlyArray<ActivityDto>>;
    create(booking: CreateActivityDto): Promise<ActivityDto>;
    update(bookingId: number, booking: UpdateActivityDto): Promise<ActivityDto>;
    delete(bookingId: number): Promise<number>;
  };
  auth: {
    login(username: string, passwordHash: string): Promise<boolean>;
    logout(): Promise<void>;
  };
  users: {
    current(): Promise<UserInfoDto>;
  };
  settings: {};
}

export interface ActivitiesQueryDto {
  rangeFrom?: string;
  rangeTo?: string;
  orderBy?: { prop: string; direction: 'asc' | 'desc' };
  visibleValues?: ReadonlyArray<string>;
  projectId?: number;
  clientId?: number;
}

export interface ActivityDto {
  activityID: number;
  startedAt: string;
  finishedAt?: string;
  remarks?: string;
  projectId?: number;
  clientId?: number;
}

export interface CreateActivityDto {
  startedAt: string;
  finishedAt?: string;
  remarks?: string;
  projectId?: number;
  clientId?: number;
}

export type UpdateActivityDto = Partial<Omit<ActivityDto, 'activityID'>>;

export interface UserInfoDto {
  userID: number;
  email: string;
  firstName: string;
  lastName: string;
  active: boolean;
}
