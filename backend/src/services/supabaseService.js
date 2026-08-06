import { createClient } from '@supabase/supabase-js';

// NOTE: This client uses the SUPABASE_SERVICE_ROLE_KEY which has administrative privileges.
// It bypasses Row Level Security (RLS) and must NEVER be imported into any frontend code.

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
