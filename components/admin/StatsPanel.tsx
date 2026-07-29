export type SiteStats = {
  viewsAll: number;
  views30: number;
  views7: number;
  clicksAll: number;
  clicks30: number;
  quoteClicks30: number;
  daily: { label: string; views: number }[];
  topPages: { path: string; count: number }[];
  topClicks: { label: string; count: number }[];
};

function StatCard({
  value,
  label,
  sub,
}: {
  value: number | string;
  label: string;
  sub?: string;
}) {
  return (
    <div className="border border-steel bg-concrete p-5">
      <p className="font-display text-4xl leading-none text-bone">{value}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.16em] text-fog">{label}</p>
      {sub && <p className="mt-1 text-xs text-fog/70">{sub}</p>}
    </div>
  );
}

export default function StatsPanel({ stats }: { stats: SiteStats }) {
  const maxDaily = Math.max(1, ...stats.daily.map((d) => d.views));

  return (
    <div className="space-y-6">
      {/* Headline numbers */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          value={stats.views7}
          label="Views · 7 days"
          sub={`${stats.viewsAll.toLocaleString()} all time`}
        />
        <StatCard
          value={stats.views30}
          label="Views · 30 days"
        />
        <StatCard
          value={stats.clicks30}
          label="Clicks · 30 days"
          sub={`${stats.clicksAll.toLocaleString()} all time`}
        />
        <StatCard
          value={stats.quoteClicks30}
          label="Quote clicks · 30 days"
        />
      </div>

      {/* 7-day views bar chart */}
      <div className="border border-steel bg-concrete p-5">
        <p className="mb-4 text-xs uppercase tracking-[0.16em] text-fog">
          Page views · last 7 days
        </p>
        <div className="flex items-end gap-2" style={{ height: "8rem" }}>
          {stats.daily.map((d) => (
            <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex w-full flex-1 items-end">
                <div
                  className="w-full bg-hazard transition-all"
                  style={{ height: `${(d.views / maxDaily) * 100}%` }}
                  title={`${d.views} views`}
                />
              </div>
              <span className="text-[0.65rem] text-bone">{d.views}</span>
              <span className="text-[0.6rem] uppercase tracking-[0.12em] text-fog">
                {d.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Top pages + top clicks */}
      <div className="grid gap-3 md:grid-cols-2">
        <TopList
          title="Top pages · 30 days"
          rows={stats.topPages.map((p) => ({ label: p.path || "/", count: p.count }))}
          empty="No page views yet."
        />
        <TopList
          title="Clicks by button · 30 days"
          rows={stats.topClicks.map((c) => ({ label: c.label, count: c.count }))}
          empty="No tracked clicks yet."
        />
      </div>
    </div>
  );
}

function TopList({
  title,
  rows,
  empty,
}: {
  title: string;
  rows: { label: string; count: number }[];
  empty: string;
}) {
  return (
    <div className="border border-steel bg-concrete p-5">
      <p className="mb-4 text-xs uppercase tracking-[0.16em] text-fog">{title}</p>
      {rows.length === 0 ? (
        <p className="text-sm text-fog">{empty}</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {rows.map((r) => (
            <li key={r.label} className="flex items-center justify-between gap-4">
              <span className="truncate text-bone">{r.label}</span>
              <span className="shrink-0 font-display text-bone">{r.count}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
