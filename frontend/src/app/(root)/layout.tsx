import { AppHeader } from '@/app/(root)/components/AppHeader/AppHeader';
import React from 'react';
import { Box } from '@mui/system';

export const metadata = {
  title: 'Clockmate',
  description: 'Your Time Tracking Buddy',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <AppHeader />
      </header>
      <Box
        sx={{
          margin: '2rem 4rem',
          '@media (max-width:600px)': {
            margin: '1rem 2rem',
          },
        }}
      >
        {children}
      </Box>
    </>
  );
}
