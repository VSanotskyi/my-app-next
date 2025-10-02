'use client';

import React, { ReactNode } from 'react';
import { MantineProvider, Flex } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/theme';
import Header from '@/components/ui/header/Header';

export default function AppLayout({ children }: { children: ReactNode }) {
  const { colorScheme, getColor } = useTheme();

  return (
    <MantineProvider
      theme={colorScheme === 'light' ? lightTheme : darkTheme}
      defaultColorScheme={colorScheme}
    >
      <Notifications position="top-right" style={{ zIndex: 10000 }} />
      <Flex
        direction="column"
        w="100vw"
        h="100vh"
        p={'0 20px'}
        bg={getColor('background')}
        c={getColor('text')}
      >
        <Header />
        {children}
      </Flex>
    </MantineProvider>
  );
}
