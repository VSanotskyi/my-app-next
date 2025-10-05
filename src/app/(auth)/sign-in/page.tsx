'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { Button, Flex, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { createClient } from '@/utils/supabase/component';

import { signInInitialValues, SignInSchema } from '@/lib/authSchemas';
import { PATHS } from '@/lib/paths';

import Loader from '@/components/ui/loader/Loader';

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const formik = useFormik({
    initialValues: signInInitialValues,
    validationSchema: SignInSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);

      const { error } = await supabase.auth.signInWithPassword({ ...values });

      if (error) {
        notifications.show({
          title: 'Error',
          message: error.message,
          autoClose: 3000,
          position: 'top-right',
        });

        setIsLoading(false);
        return;
      }

      notifications.show({
        title: 'Success',
        message: 'User has been created successfully',
        autoClose: 3000,
        position: 'top-right',
      });

      setIsLoading(false);
      resetForm();
      router.push(PATHS.contacts);
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
        <Title order={3}>Sign in</Title>
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
          Don&#39;t have an account?
          <Button
            type={'button'}
            variant={'transparent'}
            autoContrast={true}
            onClick={() => router.push(PATHS.auth.signUp)}
          >
            Sign up
          </Button>
        </Text>
      </form>
    </Flex>
  );
};

export default Page;
