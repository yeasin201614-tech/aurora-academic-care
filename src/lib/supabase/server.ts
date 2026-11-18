import { createClient } from "@supabase/supabase-js";

export function getAdminClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://iussuvbntpahbydsyzqy.supabase.co";
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "";

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export function getPublicClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://iussuvbntpahbydsyzqy.supabase.co";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  return createClient(supabaseUrl, anonKey);
}

// Map string IDs to Supabase UUIDs
export const COURSE_UUID_MAP: Record<string, string> = {
  "crs-hsc-sci-01": "22222222-2222-2222-2222-222222222201",
  "crs-med-adm-02": "22222222-2222-2222-2222-222222222202",
  "crs-buet-eng-03": "22222222-2222-2222-2222-222222222203",
  "crs-ssc-fst-04": "22222222-2222-2222-2222-222222222204",
  "crs-cls6-fnd-05": "22222222-2222-2222-2222-222222222205",
  "crs-cls7-fnd-06": "22222222-2222-2222-2222-222222222206",
  "crs-cls8-fnd-07": "22222222-2222-2222-2222-222222222207",
  "crs-cls9-ssc-08": "22222222-2222-2222-2222-222222222208",
  "crs-cls10-ssc-09": "22222222-2222-2222-2222-222222222209",
};
