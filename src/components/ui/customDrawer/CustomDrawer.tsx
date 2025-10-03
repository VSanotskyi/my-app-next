import React from 'react';
import { Drawer } from '@mantine/core';

import { useTheme } from '@/context/ThemeContext';

interface IProps {
  title: string;
  children: React.ReactNode;
  opened: boolean;
  onClose: () => void;
}

const CustomDrawer: React.FC<IProps> = ({ children, title, opened, onClose }) => {
  const { getColor } = useTheme();

  return (
    <Drawer
      title={title}
      position="top"
      opened={opened}
      onClose={onClose}
      padding="8px"
      styles={{
        inner: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
        content: {
          backgroundColor: getColor('background'),
        },
        body: {
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        },
        header: {
          backgroundColor: getColor('background'),
          color: getColor('text'),
        },
        close: {
          color: getColor('text'),
        },
      }}
    >
      {children}
    </Drawer>
  );
};

export default CustomDrawer;
