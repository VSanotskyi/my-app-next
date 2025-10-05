'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { Button, Flex, Modal, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';

import { createClient } from '@/utils/supabase/component';

import { signUpInitialValues, SignUpSchema } from '@/lib/authSchemas';
import { PATHS } from '@/lib/paths';

import Loader from '@/components/ui/loader/Loader';

export default function Page() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [opened, { toggle: toggleOpenModal }] = useDisclosure();

  const formik = useFormik({
    initialValues: signUpInitialValues,
    validationSchema: SignUpSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);

      const { email, password, name } = values;

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_name: name,
          },
        },
      });

      if (error) {
        setIsLoading(false);
        notifications.show({
          title: 'Error',
          message: error.message,
          autoClose: 3000,
          position: 'top-right',
        });
        return;
      }

      notifications.show({
        title: 'Success',
        message: 'User has been created successfully',
        autoClose: 3000,
        position: 'top-right',
      });
      resetForm();
      setIsLoading(false);
      toggleOpenModal();
    },
  });

  return (
    <Flex direction={'column'} w={'100%'} h={'100%'} pt={20} align={'center'}>
      <Loader isLoading={isLoading} />
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'start',
          gap: '12px',
          width: '100%',
          maxWidth: '400px',
          height: 'auto',
          padding: '12px',
        }}
      >
        <Title order={3}>Sign up</Title>
        <TextInput
          label={'Name'}
          name={'name'}
          placeholder="Name"
          w={'100%'}
          withAsterisk
          error={formik.touched.name && formik.errors.name ? `${formik.errors.name}` : undefined}
          onChange={formik.handleChange}
        />
        <TextInput
          label={'Email'}
          name={'email'}
          placeholder="email"
          w={'100%'}
          withAsterisk
          error={formik.touched.email && formik.errors.email ? `${formik.errors.email}` : undefined}
          onChange={formik.handleChange}
        />
        <PasswordInput
          label="Password"
          name="password"
          placeholder={'password'}
          withAsterisk
          w={'100%'}
          error={formik.touched.password && formik.errors.password}
          onChange={formik.handleChange}
        />
        <Button type={'submit'} variant="default" w={'50%'}>
          Submit
        </Button>
        <Text>
          Already have an account?
          <Button
            type={'button'}
            variant={'transparent'}
            autoContrast={true}
            onClick={() => router.push(PATHS.auth.signIn)}
          >
            Sign In
          </Button>
        </Text>
      </form>
      <Modal opened={opened} onClose={toggleOpenModal} title={'Registration successful!'}>
        <Text>Registration successful! Please confirm your email to complete the process.</Text>
      </Modal>
    </Flex>
  );
}
