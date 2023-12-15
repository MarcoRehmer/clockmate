import React from 'react';
import { Box } from '@mui/material';

export const metadata = {
  title: 'Clockmate | Login',
  description: 'Your Time Tracking Buddy',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <Box sx={{ margin: 4 }}>{children}</Box>;
}
