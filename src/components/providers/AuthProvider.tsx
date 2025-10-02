'use client';

import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

interface AuthProviderProps {
  children: React.ReactNode;
  accessToken: string | null;
}

export default function AuthProvider({ children, accessToken }: AuthProviderProps) {
  const [supabaseClient] = useState(() => createClientComponentClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={accessToken ? ({ access_token: accessToken, user: {} } as any) : null}
    >
      {children}
    </SessionContextProvider>
  );
}
