import type { LeadRow } from "@/lib/supabase";

function formatWhen(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function LeadsTable({ leads }: { leads: LeadRow[] }) {
  if (leads.length === 0) {
    return (
      <div className="border border-steel bg-concrete p-10 text-center">
        <p className="font-display text-2xl uppercase text-bone">No messages yet</p>
        <p className="mt-2 text-sm text-fog">
          Messages sent through the website contact form will show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {leads.map((lead) => (
        <article key={lead.id} className="border border-steel bg-concrete p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="font-display text-lg uppercase tracking-wide text-bone">
              {lead.name ?? "No name"}
            </p>
            <p className="text-xs uppercase tracking-[0.16em] text-fog">
              {formatWhen(lead.created_at)}
            </p>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            {lead.email && (
              <a href={`mailto:${lead.email}`} className="text-hazard hover:underline">
                {lead.email}
              </a>
            )}
            {lead.phone && (
              <a href={`tel:${lead.phone}`} className="text-hazard hover:underline">
                {lead.phone}
              </a>
            )}
            {lead.project_type && (
              <span className="text-xs uppercase tracking-[0.16em] text-fog">
                {lead.project_type}
              </span>
            )}
          </div>

          {lead.message && (
            <p className="mt-3 whitespace-pre-wrap border-t border-steel/60 pt-3 text-sm leading-relaxed text-bone">
              {lead.message}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}
