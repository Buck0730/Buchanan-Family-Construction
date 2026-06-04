// Helpers for the Retell AI phone webhooks.
//
// NOTE: Retell is the source of truth for exact webhook field names. These
// shapes match Retell's documented inbound / post-call payloads at time of
// writing; confirm against current Retell docs when you wire the live agent.

// ---- Inbound webhook ------------------------------------------------------
export type RetellInboundEvent = {
  event?: string; // "call_inbound"
  call_inbound?: {
    agent_id?: string;
    from_number?: string;
    to_number?: string;
  };
};

export type RetellInboundResponse = {
  call_inbound: {
    override_agent_id?: string;
    dynamic_variables?: Record<string, string>;
    metadata?: Record<string, unknown>;
  };
};

/**
 * Build the inbound-webhook response. We always hand Retell the toggle state
 * and the forward number as dynamic variables, so the agent's prompt/flow can:
 *   - when {{agent_active}} is "false" → transfer the call to {{forward_number}}
 *   - when "true" → greet, take a message, promise a callback within
 *     {{callback_timeframe}}, and mention the call is recorded.
 */
export function buildInboundResponse(params: {
  isActive: boolean;
  callbackTimeframe: string;
  forwardNumber: string;
  agentId?: string;
}): RetellInboundResponse {
  const { isActive, callbackTimeframe, forwardNumber, agentId } = params;
  return {
    call_inbound: {
      ...(agentId ? { override_agent_id: agentId } : {}),
      dynamic_variables: {
        agent_active: String(isActive),
        callback_timeframe: callbackTimeframe,
        forward_number: forwardNumber,
      },
    },
  };
}

// ---- Post-call webhook ----------------------------------------------------
export type RetellPostCallEvent = {
  event?: string; // "call_analyzed" | "call_ended"
  call?: {
    call_id?: string;
    from_number?: string;
    to_number?: string;
    transcript?: string;
    recording_url?: string;
    call_analysis?: {
      call_summary?: string;
      user_sentiment?: string;
    };
  };
};

export type ParsedCall = {
  callId: string | null;
  fromNumber: string | null;
  toNumber: string | null;
  transcript: string | null;
  summary: string | null;
  recordingUrl: string | null;
};

export function parsePostCall(payload: RetellPostCallEvent): ParsedCall {
  const call = payload?.call ?? {};
  return {
    callId: call.call_id ?? null,
    fromNumber: call.from_number ?? null,
    toNumber: call.to_number ?? null,
    transcript: call.transcript ?? null,
    summary: call.call_analysis?.call_summary ?? null,
    recordingUrl: call.recording_url ?? null,
  };
}

/**
 * Optional shared-secret check. Set RETELL_WEBHOOK_SECRET and append
 * `?secret=...` to the webhook URLs you register in Retell. When the env var is
 * unset, requests are allowed (so local/dev wiring isn't blocked).
 */
export function verifyWebhookSecret(req: Request): boolean {
  const expected = process.env.RETELL_WEBHOOK_SECRET;
  if (!expected) return true;
  const url = new URL(req.url);
  const provided =
    url.searchParams.get("secret") ?? req.headers.get("x-webhook-secret");
  return provided === expected;
}
