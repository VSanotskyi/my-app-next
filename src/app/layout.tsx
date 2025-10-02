import React from 'react';
import { Providers } from './providers';
import AppLayout from '@/components/layout/AppLayout';

// Глобальні стилі
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true} data-lt-installed={true}>
      <body suppressHydrationWarning={true}>
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
}
