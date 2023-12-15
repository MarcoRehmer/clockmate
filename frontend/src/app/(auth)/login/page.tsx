'use client';

import { LoginForm } from '@/app/(auth)/login/LoginForm';
import { redirect, useRouter } from 'next/navigation';
import { api } from '@/app/api/api';
import { Box, Card, Container } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function Index() {
  const router = useRouter();

  const loginRedirect = async (email: string, password: string) => {
    const response = await api.auth.login(email, password);

    if (response) {
      router.replace('/dashboard');
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
      <Card style={{ padding: 24 }}>
        <Typography variant="h6" sx={{ color: 'primary.main', textAlign: 'center', mb: 2 }}>
          Welcome to Clockmate
        </Typography>
        <LoginForm loginRequested={loginRedirect} />
      </Card>
    </Box>
  );
}
