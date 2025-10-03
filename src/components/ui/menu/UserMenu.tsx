import React from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { Burger, Button, Flex, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconMoonStars, IconSunHigh, IconUser } from '@tabler/icons-react';

import { useTheme } from '@/context/ThemeContext';

interface IProps {
  opened: boolean;
  onToggleBurgerMenu: () => void;
  onSignOut: () => void;
}

const UserMenu: React.FC<IProps> = ({ opened, onToggleBurgerMenu, onSignOut }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const user = useUser();
  const { getColor, toggleColorScheme, colorScheme } = useTheme();

  if (isMobile) {
    return <Burger opened={opened} onClick={onToggleBurgerMenu} color={getColor('text')} />;
  }

  return (
    <Flex gap={12} align={'center'}>
      <Button variant={'subtle'} color={getColor('text')} onClick={() => toggleColorScheme()}>
        {colorScheme === 'light' ? <IconMoonStars stroke={2} /> : <IconSunHigh stroke={2} />}
      </Button>
      <Flex gap={8} align={'center'}>
        <IconUser stroke={2} />
        <Text>{user?.email || 'User'}</Text>
      </Flex>
      <Button variant={'default'} onClick={onSignOut}>
        Log out
      </Button>
    </Flex>
  );
};

export default UserMenu;
