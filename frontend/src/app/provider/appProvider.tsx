'use client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { api } from '@/app/api/api';
import React, { createContext, useMemo, useState } from 'react';
import { ApiClient, UserInfoDto } from '@/app/api/types';
import { ThemeProvider } from '@mui/material/styles';
import { defaultTheme } from '@/app/styles/defaultTheme';
import { UserInfo } from '../core/types';

interface AppContextType {
  userInfo?: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
}

export const ApiContext = createContext<ApiClient>(api);
export const AppContext = createContext<AppContextType>({
  setUserInfo: (_userInfo: UserInfo) => {},
});

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="de">
      <ThemeProvider theme={defaultTheme}>
        <AppContext.Provider value={{ userInfo, setUserInfo }}>
          <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
        </AppContext.Provider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
