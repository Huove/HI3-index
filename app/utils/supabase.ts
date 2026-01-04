import { createClient } from '@supabase/supabase-js';

// Pastikan variabel lingkungan dibaca sebagai string
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Melakukan pengecekan saat runtime
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.');
}

// Inisialisasi dan export client Supabase
// Catatan: Jika menggunakan fitur Autentikasi lanjutan,
// Anda disarankan menggunakan helper khusus dari @supabase/ssr.
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);