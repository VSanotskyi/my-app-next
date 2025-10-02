import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Loader from '@/components/ui/loader/Loader';

interface IProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<IProps> = ({ children }) => {
  const { user, isAuthResolved } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthResolved && !user) {
      router.push('/sign-in');
    }
  }, [user, isAuthResolved, router]);

  if (!isAuthResolved && !user) return <Loader isLoading={!isAuthResolved} />;

  return <>{children}</>;
};

export default PrivateRoute;
