import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import {
  getServiceSupabase,
  type AgentSettings,
  type CallRow,
} from "@/lib/supabase";
import AgentToggle from "@/components/admin/AgentToggle";
import CallTable from "@/components/admin/CallTable";
import { logoutAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  if (!(await isAuthed())) redirect("/admin/login");

  const supabase = getServiceSupabase();
  let settings: AgentSettings | null = null;
  let calls: CallRow[] = [];
  let dbError = "";

  if (supabase) {
    const [settingsRes, callsRes] = await Promise.all([
      supabase.from("agent_settings").select("*").eq("id", 1).single(),
      supabase
        .from("calls")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(25),
    ]);
    settings = (settingsRes.data as AgentSettings) ?? null;
    calls = (callsRes.data as CallRow[]) ?? [];
    dbError = settingsRes.error?.message ?? callsRes.error?.message ?? "";
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 lg:py-14">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-steel pb-6">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center bg-hazard font-display text-xl text-ink">
            B
          </span>
          <div>
            <p className="font-display text-lg tracking-tight text-bone">
              Buchanan
            </p>
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-fog">
              Phone agent · Admin
            </p>
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
          Supabase isn&apos;t configured yet, so the toggle and call log are
          inactive. Add your Supabase keys to <code>.env.local</code> and run{" "}
          <code>supabase/schema.sql</code> — see the README.
        </p>
      )}

      {dbError && (
        <p className="mt-8 border border-hazard/60 bg-hazard/10 px-5 py-4 text-sm text-bone">
          Database error: {dbError}
        </p>
      )}

      {/* Toggle */}
      <section className="mt-10">
        <h1 className="mb-4 font-display text-sm uppercase tracking-[0.2em] text-fog">
          Phone agent
        </h1>
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
