import { AppState } from '@/app/store/store';

export const selectBookingsState = (state: AppState) => state.bookings;