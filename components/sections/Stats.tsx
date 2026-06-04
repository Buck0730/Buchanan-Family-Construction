"use client";

import { STATS, type Stat } from "@/lib/site";
import { useCountUp } from "@/hooks/useCountUp";

function StatItem({ stat }: { stat: Stat }) {
  const ref = useCountUp(stat.value, {
    suffix: stat.suffix,
    prefix: stat.prefix,
    decimals: stat.decimals,
  });

  return (
    <div className="border-l border-steel pl-6">
      <div className="font-display text-6xl text-bone sm:text-7xl">
        <span ref={ref}>0</span>
      </div>
      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-fog">
        {stat.label}
      </p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="border-t border-steel bg-concrete py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-12 px-6 lg:grid-cols-4 lg:px-10">
        {STATS.map((stat) => (
          <StatItem key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  );
}
