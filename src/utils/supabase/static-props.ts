import { createClient as createClientPrimitive } from '@supabase/supabase-js';

import { supabaseUrl, supabaseAnonKey } from '@/lib/supabase/supabaseConfig';

export function createClient() {
  return createClientPrimitive(supabaseUrl!, supabaseAnonKey!);
}
