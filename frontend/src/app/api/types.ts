export interface ApiClient {
  bookings: {
    getAll: (filter?: any) => Promise<ReadonlyArray<BookingDto>>;
    create(booking: CreateBookingDto): Promise<BookingDto>;
    update(bookingId: number, booking: UpdateBookingDto): Promise<BookingDto>;
    delete(bookingId: number): Promise<number>;
  };
  settings: {};
}

export interface BookingDto {
  id: number;
  startedAt: string;
  finishedAt?: string;
  remarks?: string;
  projectId?: number;
  customerId?: number;
}

export interface CreateBookingDto {
  startedAt: string;
  finishedAt?: string;
  remarks?: string;
  projectId?: number;
  customerId?: number;
}

export type UpdateBookingDto = Partial<{
  startedAt: string;
  finishedAt: string;
  remarks: string;
  projectId: number;
  customerId: number;
}>;
