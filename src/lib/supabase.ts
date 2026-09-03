import { createClient } from "@supabase/supabase-js";

const clientEnv = (typeof import.meta !== "undefined" && import.meta.env
  ? import.meta.env
  : {}) as Record<string, string | undefined>;

const serverEnv = (typeof process !== "undefined" && process.env
  ? process.env
  : {}) as Record<string, string | undefined>;

function getEnv(key: string, ...fallbackKeys: string[]): string {
  const allKeys = [key, ...fallbackKeys];
  for (const k of allKeys) {
    const val = clientEnv[k] || serverEnv[k];
    if (val && val !== "YOUR_SUPABASE_URL" && val !== "YOUR_SUPABASE_PUBLISHABLE_KEY") {
      return val.trim().replace(/^["']|["']$/g, "");
    }
  }
  return "";
}

const rawUrl =
  getEnv("VITE_SUPABASE_URL", "SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL") ||
  "https://placeholder-project.supabase.co";

const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");

const supabasePublishableKey =
  getEnv(
    "VITE_SUPABASE_PUBLISHABLE_KEY",
    "VITE_SUPABASE_ANON_KEY",
    "VITE_SUPABASE_KEY",
    "SUPABASE_ANON_KEY",
    "SUPABASE_PUBLISHABLE_KEY",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  ) || "placeholder-publishable-key";

export const supabase = createClient(supabaseUrl, supabasePublishableKey);

