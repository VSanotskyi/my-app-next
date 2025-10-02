'use client';

import { Button, Flex, Text } from '@mantine/core';
import { Logo } from '@/components/ui/logo/Logo';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  const handleNavigateToSignUpPage = () => {
    router.push('/sign-up');
  };

  return (
    <Flex direction={'column'} w={'100%'} h={'100%'} align={'center'} gap={10} p={'20px 0'}>
      <Logo />
      <Text>
        Welcome! Here you can create, save, and manage your contacts — quickly and easily!
      </Text>
      <Button variant={'default'} onClick={handleNavigateToSignUpPage}>
        Get started
      </Button>
    </Flex>
  );
};

export default Page;
