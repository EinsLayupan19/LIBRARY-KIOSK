const SUPABASE_URL = 'https://hzlaivmkndxdnvbdifht.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6bGFpdm1rbmR4ZG52YmRpZmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNTE2NDUsImV4cCI6MjA4OTgyNzY0NX0.NuTRT1CIi-62QbBkGw9VTz0YhDiw6Qo6LnugRdrZyvE';

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);