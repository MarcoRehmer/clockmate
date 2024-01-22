'use client';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import React from 'react';
import { useRouter } from 'next/navigation';
import { deleteToken } from '@/app/auth/session';

export const AppHeader = () => {
  const isAdmin = false;

  const router = useRouter();

  const navigateToRoot = () => {
    router.push('/');
  };

  const navigateToAdminPanel = () => {
    router.push('/admin-panel');
  };

  const navigateToSettings = () => {
    router.push('/profile');
  };

  const logOut = async () => {
    await deleteToken();
    router.replace('/login');
  };

  return (
    <AppBar position="static" sx={{ height: 96, p: 1, marginBottom: '-60px' }}>
      <Toolbar>
        <Typography sx={{ color: 'white', cursor: 'pointer' }} variant="h4" onClick={navigateToRoot}>
          Clockmate
        </Typography>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }}></Box>

        {isAdmin && (
          <IconButton sx={{ color: 'white' }} onClick={() => navigateToAdminPanel()}>
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
