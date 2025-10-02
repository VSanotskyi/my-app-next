'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { localStorageKeys } from '@/lib/localStorageKeys';

interface IUser {
  id: string;
  email: string;
  name: string;
}

interface IAuthContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  refreshToken: string | null;
  setRefreshToken: (token: string | null) => void;
  isAuthResolved: boolean;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isAuthResolved, setIsAuthResolved] = useState(false);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem(localStorageKeys.accessToken);
    const storedRefreshToken = localStorage.getItem(localStorageKeys.refreshToken);
    const storedUser = localStorage.getItem(localStorageKeys.user);

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedAccessToken) setAccessToken(storedAccessToken);
    if (storedRefreshToken) setRefreshToken(storedRefreshToken);

    setIsAuthResolved(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        isAuthResolved,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
