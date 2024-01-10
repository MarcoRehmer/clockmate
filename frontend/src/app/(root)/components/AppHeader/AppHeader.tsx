'use client';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import React from 'react';
import { useRouter } from 'next/navigation';
import { deleteToken } from '@/app/auth/session';

export const AppHeader = () => {
  const isAdmin = false;

  const router = useRouter();

  const navigateToSettings = () => {
    router.push('/profile');
  };

  const logOut = async () => {
    await deleteToken();
    router.replace('/login');
  };

  return (
    <AppBar position="static" sx={{ height: 96, p: 1 }}>
      <Toolbar>
        <Typography variant="h4" component="div" sx={{ color: 'white', flexGrow: 1 }}>
          Clockmate
        </Typography>
        {isAdmin && (
          <IconButton sx={{ color: 'white' }} onClick={() => navigateToSettings()}>
            <AdminPanelSettingsIcon />
          </IconButton>
        )}
        <IconButton sx={{ color: 'white' }} onClick={() => navigateToSettings()}>
          <SettingsIcon />
        </IconButton>
        <IconButton sx={{ color: 'white' }} onClick={() => logOut()}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
