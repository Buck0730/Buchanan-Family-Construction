"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function AgentToggle({
  initialActive,
  configured,
  forwardNumber,
}: {
  initialActive: boolean;
  configured: boolean;
  forwardNumber?: string;
}) {
  const [active, setActive] = useState(initialActive);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function flip() {
    if (!configured || pending) return;
    setPending(true);
    setError("");
    try {
      const res = await fetch("/api/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !active }),
      });
      const json = (await res.json()) as { is_active?: boolean; error?: string };
      if (!res.ok) throw new Error(json.error || "Update failed.");
      setActive(Boolean(json.is_active));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="border border-steel bg-concrete p-8">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "h-2.5 w-2.5",
                active ? "bg-hazard" : "bg-fog",
              )}
            />
            <p className="font-display text-2xl uppercase text-bone">
              {active ? "AI agent is answering" : "Forwarding to owner"}
            </p>
          </div>
          <p className="mt-2 max-w-md text-sm text-fog">
            {active
              ? "Incoming calls are greeted by the assistant, which takes a message and notifies you by text and email."
              : forwardNumber
                ? `Incoming calls ring straight through to ${forwardNumber}.`
                : "Incoming calls ring straight through to the owner's cell."}
          </p>
          {error && <p className="mt-3 text-sm text-hazard">{error}</p>}
          {!configured && (
            <p className="mt-3 text-sm text-hazard">
              Connect Supabase to enable the toggle (see README).
            </p>
          )}
        </div>

        {/* The switch */}
        <button
          type="button"
          role="switch"
          aria-checked={active}
          aria-label="Toggle AI phone agent"
          onClick={flip}
          disabled={!configured || pending}
          className={cn(
            "relative h-16 w-32 shrink-0 border transition-colors duration-300 disabled:opacity-50",
            active ? "border-hazard bg-hazard/20" : "border-steel bg-ink",
          )}
        >
          <span
            className={cn(
              "absolute top-1/2 grid h-12 w-14 -translate-y-1/2 place-items-center font-display text-sm uppercase transition-all duration-300",
              active
                ? "left-[calc(100%-3.75rem)] bg-hazard text-ink"
                : "left-1 bg-steel text-bone",
            )}
          >
            {pending ? "…" : active ? "On" : "Off"}
          </span>
        </button>
      </div>
    </div>
  );
}
