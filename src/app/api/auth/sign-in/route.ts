import { NextRequest, NextResponse } from 'next/server';

import { supabase } from '@/lib/supabase/supabase';
import { attachTokensToResponse, extractTokensFromData } from '@/utils/middleware-utils';

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }

  const { email, password } = await req.json();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const tokens = extractTokensFromData(data);
  const res = NextResponse.json({ ...data }, { status: 200 });
  return attachTokensToResponse(res, tokens);
}
