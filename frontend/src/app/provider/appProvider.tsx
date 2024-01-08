'use client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { api } from '@/app/api/api';
import React, { createContext } from 'react';
import { ApiClient } from '@/app/api/types';
import { ThemeProvider } from '@mui/material/styles';
import { defaultTheme } from '@/app/styles/defaultTheme';

export const ApiContext = createContext<ApiClient>(api);

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="de">
      <ThemeProvider theme={defaultTheme}>
        <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
