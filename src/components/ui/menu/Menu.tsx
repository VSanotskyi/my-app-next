import React from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { Burger, Button, Group } from '@mantine/core';
import { IconMoonStars, IconSunHigh } from '@tabler/icons-react';

import { useTheme } from '@/context/ThemeContext';
import { AuthLabels, AuthRoutes } from '@/components/layout/Header';

interface IProps {
  opened: boolean;
  onToggleBurgerMenu: () => void;
  onNavigate: (route: AuthRoutes) => void;
}

const Menu: React.FC<IProps> = ({ opened, onToggleBurgerMenu, onNavigate }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { getColor, toggleColorScheme, colorScheme } = useTheme();

  if (isMobile) {
    return <Burger opened={opened} onClick={onToggleBurgerMenu} color={getColor('text')} />;
  }

  return (
    <Group gap="md">
      <Button onClick={toggleColorScheme} variant={'default'}>
        {colorScheme === 'light' ? <IconMoonStars stroke={2} /> : <IconSunHigh stroke={2} />}
      </Button>
      {Object.values(AuthRoutes).map((route) => (
        <Button
          key={route}
          variant="default"
          onClick={() => {
            onNavigate(route);
          }}
        >
          {AuthLabels[route]}
        </Button>
      ))}
    </Group>
  );
};

export default Menu;
