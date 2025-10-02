import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token');
  const refreshToken = request.cookies.get('refresh_token');

  if (accessToken && refreshToken) {
    NextResponse.json({ accessToken, refreshToken });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/contacts/create',
    '/api/contacts/read',
    '/api/contacts/update',
    '/api/contacts/delete',
  ],
};
