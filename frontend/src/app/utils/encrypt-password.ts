export async function encryptPassword(password: string): Promise<string> {
  const passwordBuffer = new TextEncoder().encode(password);

  const hashBuffer = await crypto.subtle.digest('SHA-256', passwordBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
}
