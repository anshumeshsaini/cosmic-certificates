
import { createClient } from '@supabase/supabase-js';

// Using the provided Supabase credentials
const supabaseUrl = 'https://uyfkzxxajilmkrsrtsvf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5Zmt6eHhhamlsbWtyc3J0c3ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2NjA1NjcsImV4cCI6MjA1OTIzNjU2N30.92x1V_y8Q-F6UqIDz7y-k3eOCY-2EviwMZ1X49db4Gk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
