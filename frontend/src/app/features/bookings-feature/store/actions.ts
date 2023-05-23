import { createAction } from '@ngrx/store';

export const fetchBookings = createAction('[Bookings] Fetch all Bookings');
export const setCurrentBookings= createAction('[Bookings] Set current Bookings', (bookings) => ({ bookings }));
