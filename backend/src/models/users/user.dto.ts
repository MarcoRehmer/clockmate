export interface UserDto {
    id: number;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: 'user' | 'admin';
}

export type UserDtoWithPassword = UserDto & { password: string };