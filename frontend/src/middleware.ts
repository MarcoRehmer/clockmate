import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

export const protectedRoutes = ['/dashboard'];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  
  if (!protectedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }
  
  if (token === undefined) {
    console.log('no token');
    return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
  }

  const valid = await validateToken(token);
  return valid ? NextResponse.next() : NextResponse.redirect(new URL('/login', request.nextUrl.origin));
}

async function validateToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_PUB_KEY), {});
    console.log('payload', payload);
    return (payload && payload.exp && payload.exp > Date.now() / 1000) || false;
  } catch (error: any) {
    console.log('error', error);
    return false;
  }
}
