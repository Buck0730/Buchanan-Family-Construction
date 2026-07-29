import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

const VALID_TYPES = new Set(["view", "click"]);

// Cheap bot filter: skip obvious crawlers so counts reflect real people.
const BOT_RE = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|headless|lighthouse|monitor|preview/i;

export async function POST(req: Request) {
  const ua = req.headers.get("user-agent") ?? "";
  if (BOT_RE.test(ua)) return NextResponse.json({ ok: true });

  const body = (await req.json().catch(() => null)) as {
    type?: string;
    path?: string;
    label?: string;
  } | null;

  if (!body || !VALID_TYPES.has(body.type ?? "")) {
    return NextResponse.json({ ok: true });
  }

  const supabase = getServiceSupabase();
  if (supabase) {
    const { error } = await supabase.from("page_events").insert({
      type: body.type,
      path: (body.path ?? "").slice(0, 512) || null,
      label: body.label ? body.label.slice(0, 120) : null,
    });
    if (error) console.error("[track] insert failed:", error.message);
  }

  return NextResponse.json({ ok: true });
}
