export interface ApiClient {
  activities: {
    getActivities(query?: ActivitiesQueryDto): Promise<ReadonlyArray<ActivityDto>>;
    getCurrentActivity(): Promise<ActivityDto | undefined>;
    create(activity: CreateActivityDto): Promise<ActivityDto>;
    update(activityId: number, activity: UpdateActivityDto): Promise<ActivityDto>;
    delete(activityId: number): Promise<number>;
  };
  auth: {
    login(username: string, passwordHash: string): Promise<boolean>;
    logout(): Promise<void>;
  };
  users: {
    current(): Promise<UserInfoDto>;
    updateProfile(userId: number, user: Partial<Omit<UserInfoDto, 'userID'>>): Promise<UserInfoDto>;
    changePassword(currentPassword: string, newPassword: string): Promise<boolean>;
    uploadAvatar(file: File): Promise<string>;
    getAvatarUrl(avatarID?: string): Promise<string>;
  };
  reports: { summary(filter: SummaryFilterDto): Promise<SummaryDto> };
  settings: {};
}

export interface SummaryFilterDto {
  projects?: ReadonlyArray<number>;
  clients?: ReadonlyArray<number>;
}

interface SummaryValue {
  hours: number;
  minutes: number;
}
export interface SummaryDto {
  today: SummaryValue;
  week: SummaryValue;
  month: SummaryValue;
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

export type UpdateActivityDto = Partial<{
  startedAt: string | null;
  finishedAt: string | null;
  remarks: string | null;
  projectId: number | null;
  clientId: number | null;
}>;

export interface UserInfoDto {
  userID: number;
  email: string;
  firstName: string;
  lastName: string;
  active: boolean;
  avatarImageID?: string;
}
