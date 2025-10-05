'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ActionIcon,
  Button,
  Drawer,
  Group,
  Flex,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { IconSun, IconMoon, IconUser } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

import { useCheckAuth } from '@/hooks/useCheckAuth';

import { createClient } from '@/utils/supabase/component';
import { PATHS } from '@/lib/paths';

import Menu from '@/components/ui/menu/Menu';
import UserMenu from '@/components/ui/menu/UserMenu';

const HeaderActions = () => {
  const supabase = createClient();

  const [isUser, setIsUser] = useState(false);
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure(false);
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const { user } = useCheckAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace(PATHS.auth.signIn);
  };

  useEffect(() => {
    if (user) {
      setIsUser(true);
    }
  }, [user]);

  return (
    <>
      <Group>
        {isUser && user ? (
          <>
            <UserMenu
              opened={opened}
              onToggleBurgerMenu={toggle}
              onSignOut={handleSignOut}
              user={user}
            />
          </>
        ) : (
          <>
            <Menu opened={opened} onToggleBurgerMenu={toggle} />
          </>
        )}

        <ActionIcon
          onClick={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
          variant="default"
          size="lg"
          aria-label="Toggle color scheme"
        >
          {colorScheme === 'light' ? <IconMoon /> : <IconSun />}
        </ActionIcon>
      </Group>
      <Drawer title="Menu" position="top" opened={opened} onClose={toggle} padding="8px">
        <Flex direction="column" gap={16}>
          {isUser && user ? (
            <>
              <Flex gap={8} align="center">
                <IconUser stroke={2} />
                <Text>{user.email || 'User'}</Text>
              </Flex>
              <Button
                variant="default"
                onClick={() => {
                  void handleSignOut();
                  toggle();
                }}
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="default"
                onClick={() => {
                  router.push(PATHS.auth.signIn);
                  toggle();
                }}
              >
                Sign In
              </Button>
              <Button
                onClick={() => {
                  router.push(PATHS.auth.signUp);
                  toggle();
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Flex>
      </Drawer>
    </>
  );
};

export default HeaderActions;
