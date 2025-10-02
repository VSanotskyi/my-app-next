import Link from 'next/link';
import { Group, Text } from '@mantine/core';
import { IconAddressBook } from '@tabler/icons-react';

export function Logo() {
  return (
    <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Group gap="xs">
        <IconAddressBook size={32} stroke={1.5} />
        <Text fw={700} size="xl">
          PhoneBook
        </Text>
      </Group>
    </Link>
  );
}
