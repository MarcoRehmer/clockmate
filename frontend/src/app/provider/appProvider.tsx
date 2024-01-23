'use client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { api } from '@/app/api/api';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { ApiClient, UserInfoDto } from '@/app/api/types';
import { ThemeProvider } from '@mui/material/styles';
import { defaultTheme } from '@/app/styles/defaultTheme';
import { Client, Project, UserInfo } from '../core/types';

interface AppContextType {
  userInfo?: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
  projects: Array<Project>;
  clients: Array<Client>;
}

export const ApiContext = createContext<ApiClient>(api);
export const AppContext = createContext<AppContextType>({
  userInfo: undefined,
  setUserInfo: (_userInfo: UserInfo) => {},
  projects: [],
  clients: [],
});

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);
  const [clients, setClients] = useState<Array<Client>>([]);
  const [projects, setProjects] = useState<Array<Project>>([]);

  useEffect(() => {
    const loadProjects = async (): Promise<Array<Project>> => await api.projects.getAll();
    loadProjects().then((value) => setProjects(value));

    const loadClients = async (): Promise<Array<Client>> => await api.clients.getAll();
    loadClients().then((value) => setClients(value));
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="de">
      <ThemeProvider theme={defaultTheme}>
        <AppContext.Provider value={{ userInfo, setUserInfo, projects, clients }}>
          <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
        </AppContext.Provider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
