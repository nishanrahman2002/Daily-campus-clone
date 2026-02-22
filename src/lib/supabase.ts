import { createClient } from '@supabase/supabase-js';

// Use environment variables if available, otherwise fallback to provided defaults
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vyjdtqkksnyeaoviqcgj.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_au7mJY5Z59URAF2NIu0hUg_cTzfq-Je';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
