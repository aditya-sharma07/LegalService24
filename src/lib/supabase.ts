import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // ✅ Ensures session persists after reloads
    autoRefreshToken: true, // ✅ Auto-refresh authentication tokens
    detectSessionInUrl: true, // ✅ Handles OAuth callbacks properly
  },
});
