// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://kstvafruagjhwhceqycr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzdHZhZnJ1YWdqaHdoY2VxeWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2NTE5MjEsImV4cCI6MjA0NzIyNzkyMX0.yhiGMXwp2o065CYp_5ncHeLmHKbo9igmSsJ07Dmi2H4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);