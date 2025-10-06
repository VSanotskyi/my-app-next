import { type GetServerSidePropsContext } from 'next';
import { createServerClient, serializeCookieHeader } from '@supabase/ssr';

import { supabaseUrl, supabaseAnonKey } from '@/lib/supabase/supabaseConfig';

export function createClient({ req, res }: GetServerSidePropsContext) {
  return createServerClient(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      getAll() {
        return Object.keys(req.cookies).map((name) => ({ name, value: req.cookies[name] || '' }));
      },
      setAll(cookiesToSet) {
        res.setHeader(
          'Set-Cookie',
          cookiesToSet.map(({ name, value, options }) =>
            serializeCookieHeader(name, value, options),
          ),
        );
      },
    },
  });
}
