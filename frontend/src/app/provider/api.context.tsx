'use client';

import { ApiClient } from '@/app/api/types';
import { createContext } from 'react';
import { api } from '@/app/api/api';

export const ApiContext = createContext<ApiClient>(api);

export function ApiContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
}
