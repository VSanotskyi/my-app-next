'use client';

import React from 'react';

import PrivateRoute from '@/components/routes/PrivateRoute';

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PrivateRoute>{children}</PrivateRoute>
    </>
  );
}
