'use client';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { api } from '@/app/api/api';
import { createContext } from 'react';
import { ApiClient } from '@/app/api/types';

export const ApiContext = createContext<ApiClient>(api);

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="de">
        <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
      </LocalizationProvider>
    </Provider>
  );
}
