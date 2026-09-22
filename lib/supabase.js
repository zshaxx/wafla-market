import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://exwdildhebdrweqpdjkb.supabase.co'
const supabaseKey = '[JWT_2]'
export const supabase = createClient(supabaseUrl, supabaseKey)
