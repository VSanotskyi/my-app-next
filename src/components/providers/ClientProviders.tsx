'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider, Flex } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/theme';

import Header from '@/components/layout/Header';

const queryClient = new QueryClient();

function AppLayout({ children }: { children: React.ReactNode }) {
  const { colorScheme, getColor } = useTheme();

  return (
    <MantineProvider
      theme={colorScheme === 'light' ? lightTheme : darkTheme}
      defaultColorScheme={colorScheme}
    >
      <Notifications position="top-right" style={{ zIndex: 10000 }} />
      <Flex
        direction="column"
        w="100%"
        mih={'100%'}
        p={'0 20px'}
        bg={getColor('background')}
        c={getColor('text')}
      >
        <Header />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</main>
      </Flex>
    </MantineProvider>
  );
}

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppLayout>{children}</AppLayout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
