'use server';

import { cookies } from 'next/headers';

export async function setSession(token: string): Promise<void> {
  // TODO: hier noch token validieren
  cookies().set('token', token, { httpOnly: true });
}
