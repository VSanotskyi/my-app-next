import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/component';
import { PATHS } from '@/lib/paths';
import type { User } from '@supabase/supabase-js';

export const useCheckAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error || !user) {
          console.log('>>> no user found');
          router.replace(PATHS.auth.signIn);
          return;
        }

        setUser(user);
      } catch (err) {
        console.error('Auth check failed:', err);
        router.replace(PATHS.auth.signIn);
      } finally {
        setIsLoading(false);
      }
    };

    void initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
        router.replace(PATHS.auth.signIn);
      }
    });

    return () => subscription.unsubscribe();
  }, [router, supabase.auth]);

  return { isLoading, user };
};
