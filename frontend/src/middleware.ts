import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/app/auth/Auth';

export const protectedRoutes = ['/dashboard'];

export function middleware(request: NextRequest) {
  if (protectedRoutes.includes(request.nextUrl.pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
  }
}
