'use client';

import React from 'react';

import Loader from '@/components/ui/loader/Loader';
import { useCheckAuth } from '@/hooks/useCheckAuth';

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isLoading } = useCheckAuth();

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return <>{children}</>;
}
