import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import {
  getServiceSupabase,
  type AgentSettings,
  type CallRow,
  type LeadRow,
  type PageEventRow,
} from "@/lib/supabase";
import AgentToggle from "@/components/admin/AgentToggle";
import CallTable from "@/components/admin/CallTable";
import LeadsTable from "@/components/admin/LeadsTable";
import StatsPanel, { type SiteStats } from "@/components/admin/StatsPanel";
import { logoutAction } from "./actions";

export const dynamic = "force-dynamic";

const DAY_MS = 86_400_000;

/** Aggregate the last-30-days event rows into the numbers the panel needs. */
function buildStats(
  events: PageEventRow[],
  viewsAll: number,
  clicksAll: number,
): SiteStats {
  const now = Date.now();
  const since7 = now - 7 * DAY_MS;

  const views = events.filter((e) => e.type === "view");
  const clicks = events.filter((e) => e.type === "click");

  const dayKey = (iso: string) => new Date(iso).toDateString();

  // Last 7 calendar days, oldest → newest.
  const daily = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now - (6 - i) * DAY_MS);
    const key = d.toDateString();
    return {
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      views: views.filter((e) => dayKey(e.created_at) === key).length,
    };
  });

  const tally = (rows: PageEventRow[], pick: (e: PageEventRow) => string) => {
    const map = new Map<string, number>();
    for (const r of rows) {
      const k = pick(r) || "/";
      map.set(k, (map.get(k) ?? 0) + 1);
    }
    return [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  return {
    viewsAll,
    views30: views.length,
    views7: views.filter((e) => new Date(e.created_at).getTime() >= since7).length,
    clicksAll,
    clicks30: clicks.length,
    quoteClicks30: clicks.filter((e) => e.label === "Get a Quote").length,
    daily,
    topPages: tally(views, (e) => e.path ?? "/").map(([path, count]) => ({ path, count })),
    topClicks: tally(clicks, (e) => e.label ?? "—").map(([label, count]) => ({ label, count })),
  };
}

export default async function AdminDashboard() {
  if (!(await isAuthed())) redirect("/admin/login");

  const supabase = getServiceSupabase();
  let settings: AgentSettings | null = null;
  let calls: CallRow[] = [];
  let leads: LeadRow[] = [];
  let events: PageEventRow[] = [];
  let viewsAll = 0;
  let clicksAll = 0;
  let dbError = "";

  if (supabase) {
    const since30 = new Date(Date.now() - 30 * DAY_MS).toISOString();
    const [settingsRes, callsRes, leadsRes, eventsRes, viewsAllRes, clicksAllRes] =
      await Promise.all([
        supabase.from("agent_settings").select("*").eq("id", 1).single(),
        supabase.from("calls").select("*").order("created_at", { ascending: false }).limit(25),
        supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(50),
        supabase
          .from("page_events")
          .select("type,path,label,created_at")
          .gte("created_at", since30)
          .order("created_at", { ascending: false })
          .limit(10000),
        supabase.from("page_events").select("*", { count: "exact", head: true }).eq("type", "view"),
        supabase.from("page_events").select("*", { count: "exact", head: true }).eq("type", "click"),
      ]);

    settings = (settingsRes.data as AgentSettings) ?? null;
    calls = (callsRes.data as CallRow[]) ?? [];
    leads = (leadsRes.data as LeadRow[]) ?? [];
    events = (eventsRes.data as PageEventRow[]) ?? [];
    viewsAll = viewsAllRes.count ?? 0;
    clicksAll = clicksAllRes.count ?? 0;
    // Only the core phone-agent tables gate the error banner; analytics/leads
    // degrade to empty if their tables aren't migrated yet.
    dbError = settingsRes.error?.message ?? callsRes.error?.message ?? "";
  }

  const stats = buildStats(events, viewsAll, clicksAll);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 lg:py-14">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-steel pb-6">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center bg-hazard font-display text-xl text-bone">
            B
          </span>
          <div>
            <p className="font-display text-lg tracking-tight text-bone">Buchanan</p>
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-fog">Admin dashboard</p>
          </div>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="border border-steel px-4 py-2 text-xs uppercase tracking-[0.16em] text-fog transition-colors hover:border-hazard hover:text-hazard"
          >
            Sign out
          </button>
        </form>
      </header>

      {!supabase && (
        <p className="mt-8 border border-hazard/60 bg-hazard/10 px-5 py-4 text-sm text-bone">
          Supabase isn&apos;t configured yet, so stats, messages, and the call
          log are inactive. Add your Supabase keys to <code>.env.local</code> and
          run <code>supabase/schema.sql</code> — see the README.
        </p>
      )}

      {dbError && (
        <p className="mt-8 border border-hazard/60 bg-hazard/10 px-5 py-4 text-sm text-bone">
          Database error: {dbError}
        </p>
      )}

      {/* Website stats */}
      <section className="mt-10">
        <h1 className="mb-4 font-display text-sm uppercase tracking-[0.2em] text-fog">
          Website traffic
        </h1>
        <StatsPanel stats={stats} />
      </section>

      {/* Messages */}
      <section className="mt-12">
        <h2 className="mb-4 font-display text-sm uppercase tracking-[0.2em] text-fog">
          Messages ({leads.length})
        </h2>
        <LeadsTable leads={leads} />
      </section>

      {/* Toggle */}
      <section className="mt-12">
        <h2 className="mb-4 font-display text-sm uppercase tracking-[0.2em] text-fog">
          Phone agent
        </h2>
        <AgentToggle
          initialActive={settings?.is_active ?? false}
          configured={Boolean(supabase)}
          forwardNumber={settings?.forward_number}
        />
        {settings && (
          <p className="mt-3 text-xs uppercase tracking-[0.14em] text-fog">
            Callback promise: {settings.callback_timeframe} · Forwards to:{" "}
            {settings.forward_number}
          </p>
        )}
      </section>

      {/* Calls */}
      <section className="mt-12">
        <h2 className="mb-4 font-display text-sm uppercase tracking-[0.2em] text-fog">
          Recent calls
        </h2>
        <CallTable calls={calls} />
      </section>
    </div>
  );
}
