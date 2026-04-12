import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ypakjapekiubheacheja.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwYWtqYXBla2l1YmhlYWNoZWphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NTQ0MDcsImV4cCI6MjA5MTUzMDQwN30.Byb7j2I2tSEmB_R23G8cteEcAlK94s4jE86-G2wQ0Js';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);