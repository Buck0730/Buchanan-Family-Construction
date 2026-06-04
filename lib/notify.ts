import twilio from "twilio";
import { Resend } from "resend";

export type NotifyResult = {
  ok: boolean;
  skipped?: boolean;
  error?: string;
};

/**
 * Send an SMS to the owner via Twilio. No-ops (skipped:true) when Twilio env
 * vars aren't configured. Never throws.
 */
export async function sendSms(body: string): Promise<NotifyResult> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const to = process.env.NOTIFY_PHONE;

  if (!sid || !token || !from || !to) {
    return { ok: false, skipped: true };
  }

  try {
    const client = twilio(sid, token);
    await client.messages.create({ to, from, body });
    return { ok: true };
  } catch (err) {
    console.error("[notify] sendSms failed:", err);
    return { ok: false, error: err instanceof Error ? err.message : "sms failed" };
  }
}

/**
 * Send an email to the owner via Resend. No-ops (skipped:true) when Resend env
 * vars aren't configured. Never throws.
 */
export async function sendEmail({
  subject,
  text,
  html,
}: {
  subject: string;
  text: string;
  html?: string;
}): Promise<NotifyResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.NOTIFY_EMAIL;

  if (!apiKey || !from || !to) {
    return { ok: false, skipped: true };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      text,
      ...(html ? { html } : {}),
    });
    if (error) {
      console.error("[notify] sendEmail failed:", error);
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (err) {
    console.error("[notify] sendEmail failed:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "email failed",
    };
  }
}
