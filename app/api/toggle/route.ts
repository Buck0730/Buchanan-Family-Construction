import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";
import { isAuthed } from "@/lib/auth";

export const runtime = "nodejs";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function notConfigured() {
  return NextResponse.json(
    { error: "Supabase is not configured." },
    { status: 503 },
  );
}

// Read the current agent settings.
export async function GET() {
  if (!(await isAuthed())) return unauthorized();
  const supabase = getServiceSupabase();
  if (!supabase) return notConfigured();

  const { data, error } = await supabase
    .from("agent_settings")
    .select("id, is_active, callback_timeframe, forward_number, updated_at")
    .eq("id", 1)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// Flip (or explicitly set) the agent active flag.
export async function POST(req: Request) {
  if (!(await isAuthed())) return unauthorized();
  const supabase = getServiceSupabase();
  if (!supabase) return notConfigured();

  const body = (await req.json().catch(() => ({}))) as { is_active?: boolean };

  let target: boolean;
  if (typeof body.is_active === "boolean") {
    target = body.is_active;
  } else {
    const { data: current, error: readErr } = await supabase
      .from("agent_settings")
      .select("is_active")
      .eq("id", 1)
      .single();
    if (readErr) {
      return NextResponse.json({ error: readErr.message }, { status: 500 });
    }
    target = !current?.is_active;
  }

  const { data, error } = await supabase
    .from("agent_settings")
    .update({ is_active: target, updated_at: new Date().toISOString() })
    .eq("id", 1)
    .select("id, is_active, callback_timeframe, forward_number, updated_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
