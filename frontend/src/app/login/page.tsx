'use client';

import { LoginForm } from '@/app/login/LoginForm';
import { redirect, useRouter } from 'next/navigation';
import { api } from '@/app/api/api';

export default function Index() {
  const router = useRouter();

  const loginRedirect = async (username: string, password: string) => {
    const response = await api.auth.login(username, password);
    console.log('isLoggedIn?', response);

    if (response) {
      router.replace('/dashboard');
    }
  };

  return (
    <div>
      <p>Login</p>
      <LoginForm loginRequested={loginRedirect} />
    </div>
  );
}
