export interface ApiClient {
  bookings: {
    getBookings(query?: BookingsQueryDto): Promise<ReadonlyArray<BookingDto>>;
    create(booking: CreateBookingDto): Promise<BookingDto>;
    update(bookingId: number, booking: UpdateBookingDto): Promise<BookingDto>;
    delete(bookingId: number): Promise<number>;
  };
  auth: {
    login(username: string, passwordHash: string): Promise<boolean>;
    logout(): Promise<void>;
  };
  settings: {};
}

export interface BookingsQueryDto {
  rangeFrom?: string;
  rangeTo?: string;
  orderBy?: { prop: string; direction: 'asc' | 'desc' };
  visibleValues?: ReadonlyArray<string>;
  projectId?: number;
  clientId?: number;
}

export interface BookingDto {
  id: number;
  startedAt: string;
  finishedAt?: string;
  remarks?: string;
  projectId?: number;
  clientId?: number;
}

export interface CreateBookingDto {
  startedAt: string;
  finishedAt?: string;
  remarks?: string;
  projectId?: number;
  clientId?: number;
}

export type UpdateBookingDto = Partial<Omit<BookingDto, 'id'>>;
