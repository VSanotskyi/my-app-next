import { createBrowserClient } from '@supabase/ssr';

import { supabaseUrl, supabaseAnonKey } from '@/lib/supabase/supabaseConfig';

export function createClient() {
  return createBrowserClient(supabaseUrl!, supabaseAnonKey!);
}
