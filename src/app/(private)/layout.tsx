'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionContext, useUser } from '@supabase/auth-helpers-react';

import Loader from '@/components/ui/loader/Loader';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const user = useUser();
  const { isLoading } = useSessionContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/sign-in');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (user) {
    return <>{children}</>;
  }

  return null;
};

export default PrivateRoute;
