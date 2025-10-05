import React from 'react';
import { Flex } from '@mantine/core';

import { Logo } from '@/components/ui/logo/Logo';
import HeaderActions from '@/components/ui/header/HeaderActions';

const Header = async () => {
  return (
    <header>
      <Flex justify="space-between" p="sm" style={{ borderBottom: '1px solid #eee' }}>
        <Logo />
        <HeaderActions />
      </Flex>
    </header>
  );
};

export default Header;
