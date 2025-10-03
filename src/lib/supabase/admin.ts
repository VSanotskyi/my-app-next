import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_LOCAL_SUPABASE_URL!
    : process.env.NEXT_PUBLIC_SUPABASE_URL!;

const supabaseAnonKey =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_LOCAL_ANON_KEY!
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
