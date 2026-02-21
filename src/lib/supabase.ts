import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set");
}

export const supabaseServer = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false }
});

export const supabaseBucket = process.env.SUPABASE_BUCKET || "church-media";
