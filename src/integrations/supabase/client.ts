// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fuqplttzeghrnfjjgazp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1cXBsdHR6ZWdocm5mampnYXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4OTcwMzgsImV4cCI6MjA2NTQ3MzAzOH0.9pEMZdmPz73FyE8Msw9qHKqd8G3dOLttcICXDxLY0ys";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);