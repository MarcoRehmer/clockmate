export interface ApiClient {
  bookings: {
    getAll: (filter?: any) => Promise<ReadonlyArray<BookingDto>>;
    //getById(id: string): void;
    create(booking: any): void;
    update(bookingId: string, booking: any): void;
    delete(bookingId: string): void;
  };
  settings: {};
}

export interface BookingDto {
  id: number;
  startedAt: string;
  finishedAt?: string;
  remarks?: string;
  activityType?: string;
  userId: number;
  projectId?: number;
  customerId?: number;
}
