import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// ----- Row types -----------------------------------------------------------
export type AgentSettings = {
  id: number;
  is_active: boolean;
  callback_timeframe: string;
  forward_number: string;
  updated_at: string;
};

export type CallRow = {
  id: string;
  created_at: string;
  caller_number: string | null;
  handled_by: "agent" | "forwarded" | null;
  transcript: string | null;
  summary: string | null;
  recording_url: string | null;
  retell_call_id: string | null;
  notified: boolean;
};

// ----- Clients -------------------------------------------------------------
let serviceClient: SupabaseClient | null = null;

/**
 * Privileged server-side client (service-role key, bypasses RLS). Use only in
 * API routes / server code. Returns null when Supabase env vars aren't set so
 * callers can degrade gracefully instead of crashing.
 */
export function getServiceSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  if (!serviceClient) {
    serviceClient = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return serviceClient;
}

/** Public (anon) client for the browser. Returns null when unconfigured. */
export function getBrowserSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}
