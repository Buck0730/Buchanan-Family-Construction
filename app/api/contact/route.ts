import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";
import { sendEmail, sendSms } from "@/lib/notify";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<
    string,
    string
  > | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: a bot filled the hidden "company" field. Pretend success.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim() ?? "";
  const projectType = body.projectType?.trim() || "Not specified";
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, email, and a message." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  // Best-effort persist (non-blocking on failure / when unconfigured).
  const supabase = getServiceSupabase();
  if (supabase) {
    const { error } = await supabase
      .from("leads")
      .insert({ name, email, phone, project_type: projectType, message });
    if (error) console.error("[contact] lead insert failed:", error.message);
  }

  const detail = [
    `New lead from the website`,
    ``,
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Phone:   ${phone || "—"}`,
    `Project: ${projectType}`,
    ``,
    message,
  ].join("\n");

  const [sms, mail] = await Promise.all([
    sendSms(
      `New BFC lead: ${name} (${projectType}). ${phone || email}. "${message.slice(0, 120)}"`,
    ),
    sendEmail({
      subject: `New lead: ${name} — ${projectType}`,
      text: detail,
    }),
  ]);

  if (sms.skipped && mail.skipped && !supabase) {
    // Nothing is configured to capture this yet — log so it isn't lost.
    console.warn("[contact] No Supabase/Twilio/Resend configured. Lead:\n" + detail);
  }

  return NextResponse.json({ ok: true });
}
