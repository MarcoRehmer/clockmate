'use server';

export async function getApiUrl(): Promise<string> {
  return Promise.resolve(process.env.API_URL || '');
}
