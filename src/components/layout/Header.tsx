import { Burger, Button, Flex, Group, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { IconSunHigh, IconMoonStars, IconUser } from '@tabler/icons-react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';

import { Logo } from '@/components/ui/logo/Logo';
import { useTheme } from '@/context/ThemeContext';
import { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '@/lib/api';
import { notifications } from '@mantine/notifications';
import { lightTheme } from '@/theme';
import Loader from '@/components/ui/loader/Loader';
import { useUser } from '@supabase/auth-helpers-react';

enum AuthRoutes {
  SignIn = '/sign-in',
  SignUp = '/sign-up',
}

const AuthLabels: Record<AuthRoutes, string> = {
  [AuthRoutes.SignIn]: 'Sign in',
  [AuthRoutes.SignUp]: 'Sign up',
};

const Header = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { toggle: toggleBurgerMenu }] = useDisclosure();
  const { toggleColorScheme, colorScheme, getColor } = useTheme();
  const user = useUser();

  const handleNavigate = (link: AuthRoutes) => {
    void router.push(link);
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(API_ENDPOINTS.signOut);

      if (res.status === 200) {
        notifications.show({
          title: 'Success',
          message: 'User has been logged out successfully',
          autoClose: 3000,
          position: 'top-right',
          color: lightTheme.colors!.success![9],
        });

        router.push('/');
      }
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
        <Flex gap={12} align={'center'}>
          <Button variant={'subtle'} color={getColor('text')} onClick={() => toggleColorScheme()}>
            {colorScheme === 'light' ? <IconMoonStars stroke={2} /> : <IconSunHigh stroke={2} />}
          </Button>
          <Flex gap={8} align={'center'}>
            <IconUser stroke={2} />
            <Text>{user?.email || 'User'}</Text>
          </Flex>
          <Button variant={'default'} onClick={logout}>
            Log out
          </Button>
        </Flex>
      ) : (
        <>
          {isMobile ? (
            <Group>
              <Burger opened={opened} onClick={toggleBurgerMenu} color={getColor('text')} />
              <Flex
                direction={'column'}
                gap={8}
                style={{
                  display: `${opened ? 'flex' : 'none'} `,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 1000,
                  width: '100%',
                  height: '100%',
                  padding: '60px 20px 40px 20px',
                  backgroundColor: `${getColor('background')}`,
                }}
              >
                <Button
                  variant={'subtle'}
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                  }}
                  color={getColor('text')}
                  onClick={toggleBurgerMenu}
                >
                  <IconX stroke={2} />
                </Button>
                <Button
                  variant={'subtle'}
                  color={getColor('text')}
                  onClick={() => toggleColorScheme()}
                >
                  {colorScheme === 'light' ? (
                    <IconMoonStars stroke={2} />
                  ) : (
                    <IconSunHigh stroke={2} />
                  )}
                </Button>
                {Object.values(AuthRoutes).map((route) => (
                  <Button
                    key={route}
                    variant={'subtle'}
                    color={getColor('text')}
                    onClick={() => {
                      toggleBurgerMenu();
                      handleNavigate(route);
                    }}
                  >
                    {AuthLabels[route]}
                  </Button>
                ))}
              </Flex>
            </Group>
          ) : (
            <Group gap="md">
              <Button onClick={toggleColorScheme} variant={'default'}>
                {colorScheme === 'light' ? (
                  <IconMoonStars stroke={2} />
                ) : (
                  <IconSunHigh stroke={2} />
                )}
              </Button>
              {Object.values(AuthRoutes).map((route) => (
                <Button
                  key={route}
                  variant="default"
                  onClick={() => {
                    handleNavigate(route);
                  }}
                >
                  {AuthLabels[route]}
                </Button>
              ))}
            </Group>
          )}
        </>
      )}
    </Flex>
  );
};

export default Header;
