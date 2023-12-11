'use client';

import { LoginForm } from '@/app/login/LoginForm';
import { redirect, useRouter } from 'next/navigation';
import { api } from '@/app/api/api';
import {isAuthenticated} from "@/app/auth/Auth";

export default function Index() {
  const router = useRouter();

  const loginRedirect = async (email: string, password: string) => {
    const response = await api.auth.login(email, password);

    if (response) {
      console.log('will redirect');
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
