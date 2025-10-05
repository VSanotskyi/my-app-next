import React from 'react';
import { Burger, Button, Flex, Text } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { User } from '@supabase/supabase-js';

interface IProps {
  opened: boolean;

  onToggleBurgerMenu: () => void;
  onSignOut: () => void;
  user: User;
}

const UserMenu: React.FC<IProps> = ({ opened, onToggleBurgerMenu, onSignOut, user }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return <Burger opened={opened} onClick={onToggleBurgerMenu} />;
  }

  return (
    <Flex gap={12} align={'center'}>
      <Flex gap={8} align={'center'}>
        <IconUser stroke={2} />
        <Text>{user.email || 'User'}</Text>
      </Flex>
      <Button variant={'default'} onClick={onSignOut}>
        Log out
      </Button>
    </Flex>
  );
};

export default UserMenu;
