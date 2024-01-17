'use client';

import { LoginForm } from '@/app/(auth)/login/LoginForm';
import { useRouter } from 'next/navigation';
import { api } from '@/app/api/api';
import { Alert, Box, Card, CircularProgress, Fade, Snackbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useContext, useState } from 'react';
import { isAxiosError } from 'axios';
import { AppContext } from '@/app/provider/appProvider';
import { encryptPassword } from '@/app/utils/encrypt-password';

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [serverError, setServerError] = useState(false);
  const appContext = useContext(AppContext);

  const loginRedirect = async (email: string, password: string) => {
    setLoading(true);
    setErrorMessage(undefined);
    try {
      const hashedPassword = await encryptPassword(password);

      const response = await api.auth.login(email, hashedPassword);

      if (response) {
        const userInfo = await api.users.current();
        appContext.setUserInfo(userInfo);

        router.replace('/dashboard');
      }
    } catch (e) {
      if (isAxiosError(e)) {
        if (e.response?.status === 401) {
          setErrorMessage('invalid username or password');
        } else {
          setServerError(true);
        }
      } else {
        setServerError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
            <LoginForm loginRequested={loginRedirect} errorMessage={errorMessage} />
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            )}
          </Card>
        </Fade>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={serverError}
        onClose={() => setServerError(false)}
      >
        <Alert onClose={() => setServerError(false)} severity="error" sx={{ width: '100%' }}>
          Something went wrong!
        </Alert>
      </Snackbar>
    </>
  );
}
