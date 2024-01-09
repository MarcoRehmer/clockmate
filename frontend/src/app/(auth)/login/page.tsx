'use client';

import { LoginForm } from '@/app/(auth)/login/LoginForm';
import { useRouter } from 'next/navigation';
import { api } from '@/app/api/api';
import { Box, Card, CircularProgress, Fade } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { sleep } from '@/app/utils/sleep';
import { isAxiosError } from 'axios';

async function encryptPassword(password: string): Promise<string> {
  const passwordBuffer = new TextEncoder().encode(password);

  const hashBuffer = await crypto.subtle.digest('SHA-256', passwordBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const loginRedirect = async (email: string, password: string) => {
    setLoading(true);
    try {
      const hashedPassword = await encryptPassword(password);

      const response = await api.auth.login(email, hashedPassword);

      if (response) {
        router.replace('/dashboard');
      }
    } catch (e) {
      if (isAxiosError(e)) {
        if (e.code === '401') {
          // show "login failed"
        } else {
          // show "something went wrong"
        }
      } else {
        // show "something went wrong"
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      style={{
        maxWidth: 360,
        margin: 'auto',
        display: 'flex',
        height: '80vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Fade in={true} timeout={600}>
        <Card style={{ padding: 24 }}>
          <Typography variant="h6" sx={{ color: 'primary.main', textAlign: 'center', mb: 2 }}>
            Welcome to Clockmate
          </Typography>
          <LoginForm loginRequested={loginRedirect} />
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          )}
        </Card>
      </Fade>
    </Box>
  );
}
