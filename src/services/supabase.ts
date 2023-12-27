import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';
const supabaseUrl = 'https://rjzgdwubhegkoghrdtli.supabase.co';
// const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqemdkd3ViaGVna29naHJkdGxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMxNjYxODUsImV4cCI6MjAxODc0MjE4NX0.I4a28Fn8EKou-u4o12Oj9dNCQMlTybR1bAeEeeTK9a0';
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
