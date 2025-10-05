import React from 'react';
import { ColorSchemeScript, Flex } from '@mantine/core';
import Header from '@/components/layout/Header';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './globals.css';
import { ClientProviders } from '@/components/providers/ClientProviders';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Phonebook</title>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <ClientProviders>
          <Flex direction="column" w="100%" mih="100%">
            <Header />
            <main style={{ flex: 1, padding: '20px' }}>{children}</main>
          </Flex>
        </ClientProviders>
      </body>
    </html>
  );
}
