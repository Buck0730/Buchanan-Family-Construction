import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";
import {
  buildInboundResponse,
  verifyWebhookSecret,
  type RetellInboundEvent,
} from "@/lib/retell";

export const runtime = "nodejs";

/**
 * Retell calls this when a call comes in. We read the toggle and respond with
 * dynamic variables (toggle state + forward number + callback timeframe) so the
 * agent flow either takes a message or transfers to the owner. See lib/retell.
 */
export async function POST(req: Request) {
  if (!verifyWebhookSecret(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Payload is parsed for completeness / future routing; not required for the
  // toggle decision today.
  (await req.json().catch(() => ({}))) as RetellInboundEvent;

  // Defaults if the DB is unreachable: behave as "forward to owner".
  let isActive = false;
  let callbackTimeframe = "24 hours";
  let forwardNumber = process.env.NOTIFY_PHONE ?? "";

  const supabase = getServiceSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("agent_settings")
      .select("is_active, callback_timeframe, forward_number")
      .eq("id", 1)
      .single();
    if (!error && data) {
      isActive = data.is_active;
      callbackTimeframe = data.callback_timeframe;
      forwardNumber = data.forward_number;
    }
  }

  const response = buildInboundResponse({
    isActive,
    callbackTimeframe,
    forwardNumber,
    agentId: process.env.RETELL_AGENT_ID,
  });

  return NextResponse.json(response);
}
