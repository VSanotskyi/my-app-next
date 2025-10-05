import React from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { Burger, Button, Group } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { PATHS } from '@/lib/paths';

interface IProps {
  opened: boolean;
  onToggleBurgerMenu: () => void;
}

const Menu: React.FC<IProps> = ({ opened, onToggleBurgerMenu }) => {
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return <Burger opened={opened} onClick={onToggleBurgerMenu} />;
  }

  return (
    <Group gap="md">
      <>
        <Button variant="default" onClick={() => router.push(PATHS.auth.signIn)}>
          Sign In
        </Button>
        <Button onClick={() => router.push(PATHS.auth.signUp)}>Sign Up</Button>
      </>
    </Group>
  );
};

export default Menu;
