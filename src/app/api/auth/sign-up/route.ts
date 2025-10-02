import { NextRequest, NextResponse } from 'next/server';

import { supabase } from '@/lib/supabase/supabase';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }

  const { email, password, name } = await req.json();

  const {
    data: { users },
    error,
  } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (users && users.length > 0) {
    const isUserExists = users.find((u) => u.email === email);

    if (isUserExists) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }
  }

  const { data: newUser, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        user_name: name,
      },
    },
  });

  if (signUpError) {
    return NextResponse.json({ error: signUpError.message }, { status: 400 });
  }

  return NextResponse.json({ user: newUser }, { status: 201 });
}
