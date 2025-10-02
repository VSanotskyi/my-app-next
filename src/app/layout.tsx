import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import AuthProvider from '@/components/providers/AuthProvider';
import { ClientProviders } from '@/components/providers/ClientProviders';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider accessToken={accessToken}>
          <ClientProviders>{children}</ClientProviders>
        </AuthProvider>
      </body>
    </html>
  );
}
