import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/supabase';

export async function GET(req: Request) {
  if (req.method !== 'GET') {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }

  console.log('>>>req: ', req);

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (user === null) {
    return NextResponse.json(
      { error: error?.message || 'User not authenticated' },
      { status: 401 },
    );
  }
}
