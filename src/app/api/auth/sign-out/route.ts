import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  if (req.method !== 'GET') {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
  }

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error signing out:', error);
    return NextResponse.json({ error: 'Failed to sign out' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Successfully signed out' }, { status: 200 });
}
