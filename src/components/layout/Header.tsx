import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { Button, Flex } from '@mantine/core';
import {
  IconSunHigh,
  IconMoonStars,
  IconUser,
  IconLogout2,
  IconLogin,
  IconUserPlus,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

import { useTheme } from '@/context/ThemeContext';
import { lightTheme } from '@/theme';
import { PATHS } from '@/lib/paths';
import { Database } from '@/types/supabase';

import { Logo } from '@/components/ui/logo/Logo';
import Loader from '@/components/ui/loader/Loader';
import CustomDrawer from '@/components/ui/customDrawer/CustomDrawer';
import UserMenu from '@/components/ui/menu/UserMenu';
import Menu from '@/components/ui/menu/Menu';

export enum AuthRoutes {
  SignIn = '/sign-in',
  SignUp = '/sign-up',
}

export const AuthLabels: Record<AuthRoutes, string> = {
  [AuthRoutes.SignIn]: 'Sign in',
  [AuthRoutes.SignUp]: 'Sign up',
};

const AuthIcons: Record<AuthRoutes, React.ReactNode> = {
  [AuthRoutes.SignIn]: <IconLogin stroke={2} />,
  [AuthRoutes.SignUp]: <IconUserPlus stroke={2} />,
};

const Header = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [opened, { toggle: toggleBurgerMenu }] = useDisclosure();
  const { toggleColorScheme, colorScheme, getColor } = useTheme();
  const user = useUser();
  const supabase = useSupabaseClient<Database | null>();

  const handleNavigate = (link: AuthRoutes) => {
    void router.push(link);
  };

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();

      if (error) {
        notifications.show({
          title: 'Error',
          message: error.message || 'An error occurred during logout.',
          autoClose: 3000,
          position: 'top-right',
          color: lightTheme.colors!.error![9],
        });
        return;
      }

      await supabase.auth.refreshSession();

      notifications.show({
        title: 'Success',
        message: 'User has been logged out successfully',
        autoClose: 3000,
        position: 'top-right',
        color: lightTheme.colors!.success![9],
      });

      router.refresh();
      router.push(PATHS.root);
      toggleBurgerMenu();
    } catch (error) {
      const e = error as Error;
      notifications.show({
        title: 'Success',
        message: e.message || 'An error occurred. Please try again later.',
        autoClose: 3000,
        position: 'top-right',
        color: lightTheme.colors!.error![9],
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex justify="space-between" p="sm">
      <Loader isLoading={isLoading} />

      <Logo />

      {user ? (
        <UserMenu onToggleBurgerMenu={toggleBurgerMenu} opened={opened} onSignOut={handleSignOut} />
      ) : (
        <Menu opened={opened} onToggleBurgerMenu={toggleBurgerMenu} onNavigate={handleNavigate} />
      )}

      <CustomDrawer title={'Menu'} opened={opened} onClose={toggleBurgerMenu}>
        {user ? (
          <>
            <Button
              variant={'subtle'}
              justify={'start'}
              color={getColor('text')}
              leftSection={<IconUser stroke={2} color={getColor('text')} />}
              onClick={() => {}}
            >
              {user?.email || 'User'}
            </Button>
            <Button
              variant={'subtle'}
              justify={'start'}
              color={getColor('text')}
              leftSection={
                colorScheme === 'light' ? <IconMoonStars stroke={2} /> : <IconSunHigh stroke={2} />
              }
              onClick={() => toggleColorScheme()}
            >
              {colorScheme}
            </Button>
            <Button
              variant={'subtle'}
              justify={'start'}
              color={getColor('text')}
              leftSection={<IconLogout2 stroke={2} />}
              onClick={handleSignOut}
            >
              Sign out
            </Button>
          </>
        ) : (
          <>
            <Button
              variant={'subtle'}
              justify={'start'}
              color={getColor('text')}
              leftSection={
                colorScheme === 'light' ? <IconMoonStars stroke={2} /> : <IconSunHigh stroke={2} />
              }
              onClick={() => toggleColorScheme()}
            >
              {colorScheme}
            </Button>
            {Object.values(AuthRoutes).map((route) => (
              <Button
                key={route}
                variant={'subtle'}
                color={getColor('text')}
                justify={'start'}
                leftSection={AuthIcons[route]}
                onClick={() => {
                  toggleBurgerMenu();
                  handleNavigate(route);
                }}
              >
                {AuthLabels[route]}
              </Button>
            ))}
          </>
        )}
      </CustomDrawer>
    </Flex>
  );
};

export default Header;
