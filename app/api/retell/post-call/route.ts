import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";
import { sendEmail, sendSms } from "@/lib/notify";
import {
  parsePostCall,
  verifyWebhookSecret,
  type RetellPostCallEvent,
} from "@/lib/retell";

export const runtime = "nodejs";

/**
 * Retell calls this when a call ends / is analyzed. We log the call, then text
 * + email the owner the summary. Notification is sent once per call (deduped by
 * retell_call_id via the `notified` flag when Supabase is configured).
 */
export async function POST(req: Request) {
  if (!verifyWebhookSecret(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const payload = (await req.json().catch(() => ({}))) as RetellPostCallEvent;
  const call = parsePostCall(payload);

  if (!call.callId) {
    // Nothing actionable (e.g. a call_started ping) — acknowledge and move on.
    return NextResponse.json({ received: true });
  }

  const supabase = getServiceSupabase();
  let alreadyNotified = false;

  if (supabase) {
    const { data: existing } = await supabase
      .from("calls")
      .select("notified")
      .eq("retell_call_id", call.callId)
      .maybeSingle();
    alreadyNotified = existing?.notified ?? false;

    const { error } = await supabase.from("calls").upsert(
      {
        retell_call_id: call.callId,
        caller_number: call.fromNumber,
        handled_by: "agent",
        transcript: call.transcript,
        summary: call.summary,
        recording_url: call.recordingUrl,
      },
      { onConflict: "retell_call_id" },
    );
    if (error) console.error("[post-call] upsert failed:", error.message);
  }

  // Notify once, when we actually have a summary to send.
  const shouldNotify = Boolean(call.summary) && !alreadyNotified;
  if (shouldNotify) {
    const detail = [
      `New call handled by the AI agent`,
      ``,
      `From:    ${call.fromNumber ?? "unknown"}`,
      ``,
      `Summary:`,
      call.summary ?? "(none)",
      ``,
      `Recording: ${call.recordingUrl ?? "n/a"}`,
    ].join("\n");

    const results = await Promise.all([
      sendSms(
        `New BFC call from ${call.fromNumber ?? "unknown"}: ${(call.summary ?? "").slice(0, 140)}`,
      ),
      sendEmail({
        subject: `New call — ${call.fromNumber ?? "unknown"}`,
        text: detail,
      }),
    ]);

    const delivered = results.some((r) => r.ok);
    if (delivered && supabase) {
      await supabase
        .from("calls")
        .update({ notified: true })
        .eq("retell_call_id", call.callId);
    }
  }

  return NextResponse.json({ received: true });
}
