'use server';

import { cookies } from 'next/headers';

export async function setToken(token: string): Promise<void> {
  // TODO: hier noch token validieren
  cookies().set('token', token, { httpOnly: true });
}

export async function removeToken(): Promise<void> {
  cookies().delete('token');
}
