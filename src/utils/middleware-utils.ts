import { NextResponse } from 'next/server';

type DataWithSession = { session?: { access_token?: string; refresh_token?: string } };

export function extractTokensFromData(data: unknown) {
  const d = data as DataWithSession;

  const access_token = d?.session?.access_token;
  const refresh_token = d?.session?.refresh_token;
  return { access_token, refresh_token };
}

export function attachTokensToResponse(
  res: NextResponse,
  tokens: { access_token?: string; refresh_token?: string },
) {
  if (tokens.access_token) {
    res.cookies.set('access_token', tokens.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });
  }
  if (tokens.refresh_token) {
    res.cookies.set('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });
  }
  return res;
}
