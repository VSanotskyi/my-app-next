'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useFormik } from 'formik';
import { Button, Flex, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useSupabaseClient } from '@supabase/auth-helpers-react'; // <-- 1. ІМПОРТУЄМО ХУК

import { signInInitialValues, SignInSchema } from '@/lib/authSchemas';
import { API_ENDPOINTS } from '@/lib/api';
import { PATHS } from '@/lib/paths';
import { lightTheme } from '@/theme';

import Loader from '@/components/ui/loader/Loader';
import { Database } from '@/types/supabase';

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const supabase = useSupabaseClient<Database | null>();

  const formik = useFormik({
    initialValues: signInInitialValues,
    validationSchema: SignInSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);

        const { email, password } = values;

        const res = await axios.post(API_ENDPOINTS.signIn, { email, password });

        if (res.status === 200) {
          await supabase.auth.refreshSession();

          notifications.show({
            title: 'Success',
            message: 'User has been created successfully',
            autoClose: 3000,
            position: 'top-right',
            color: lightTheme.colors!.success![9],
          });

          resetForm();
          router.push(PATHS.contacts);
        }
      } catch (err) {
        let message = 'Something went wrong';

        if (axios.isAxiosError(err)) {
          message = err.response?.data?.error || err.message;
        } else if (err instanceof Error) {
          message = err.message;
        }

        notifications.show({
          title: 'Error',
          message,
          autoClose: 3000,
          position: 'top-right',
          color: lightTheme.colors!.error![9],
        });
      } finally {
        setIsLoading(false);
      }
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
