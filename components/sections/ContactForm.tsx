"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

const FIELD =
  "w-full border border-steel bg-transparent px-4 py-3.5 text-bone placeholder:text-fog/70 transition-colors focus:border-hazard focus:outline-none";
const LABEL =
  "mb-2 block text-xs uppercase tracking-[0.18em] text-fog";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-hazard bg-concrete p-10">
        <p className="font-display text-3xl uppercase text-bone">
          Message sent.
        </p>
        <p className="mt-3 text-fog">
          Thanks — we&apos;ve got your details and will be in touch shortly,
          usually within a business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm uppercase tracking-[0.18em] text-hazard hover:underline"
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      {/* Honeypot — bots fill this; humans never see it */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className={FIELD}
            placeholder="Jane Buchanan"
          />
        </div>
        <div>
          <label className={LABEL} htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={FIELD}
            placeholder="(412) 555-0142"
          />
        </div>
      </div>

      <div>
        <label className={LABEL} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={FIELD}
          placeholder="you@email.com"
        />
      </div>

      <div>
        <label className={LABEL} htmlFor="projectType">
          Project type
        </label>
        <select id="projectType" name="projectType" className={FIELD} defaultValue="Kitchen">
          <option className="bg-concrete">Kitchen</option>
          <option className="bg-concrete">Bathroom</option>
          <option className="bg-concrete">Addition</option>
          <option className="bg-concrete">Other / not sure yet</option>
        </select>
      </div>

      <div>
        <label className={LABEL} htmlFor="message">
          Tell us about the project
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${FIELD} resize-none`}
          placeholder="What are you hoping to build? Rough budget and timeline help, too."
        />
      </div>

      {status === "error" && (
        <p className="border border-hazard/60 bg-hazard/10 px-4 py-3 text-sm text-bone">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
