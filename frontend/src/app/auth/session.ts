'use server';

import { cookies } from 'next/headers';

export async function setSession(token: string): Promise<void> {
  cookies().set('token', token);
}

export async function getSession(): Promise<string | undefined> {
  return cookies().get('token')?.value;
}

export async function clearSession(): Promise<void> {
  cookies().delete('token');
}
