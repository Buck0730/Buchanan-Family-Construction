import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import Stats from "@/components/sections/Stats";
import CTA from "@/components/sections/CTA";
import { COMPANY } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Buchanan Family Construction is a family-owned remodeling company serving Greater Philadelphia since 1998.",
};

const VALUES = [
  {
    title: "One crew, start to finish",
    body: "No revolving door of subs you've never met. The people who start your job are the people who finish it.",
  },
  {
    title: "The quote is the price",
    body: "We scope it right the first time so the number you sign is the number you pay. Surprises are for birthdays.",
  },
  {
    title: "We treat your house like ours",
    body: "Floors covered, site swept, dust contained. You'll still be living there, and we build like we know it.",
  },
  {
    title: "Built to code, built to last",
    body: "Permits pulled, inspections passed, materials that hold up. Craft you won't see and will never have to think about.",
  },
];

export default function AboutPage() {
  return (
    <>
      <header className="border-b border-steel px-6 pb-16 pt-40 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-hazard">
            Our story
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-6xl leading-[0.9] text-bone sm:text-7xl lg:text-8xl">
            A family name on every job.
          </h1>
        </div>
      </header>

      <section className="border-b border-steel px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="font-display text-4xl leading-tight text-bone sm:text-5xl">
              Since {COMPANY.established}, building rooms families actually live
              in.
            </h2>
          </Reveal>
          <Reveal className="space-y-6 text-lg leading-relaxed text-fog lg:col-span-7">
            <p>
              Buchanan Family Construction started with one truck, one toolbox,
              and a simple promise: do the work right and stand behind it. Two
              decades and hundreds of homes later, that hasn&apos;t changed.
            </p>
            <p>
              We&apos;re still family-owned and still based in{" "}
              {COMPANY.area}. We keep the crew small on purpose — it&apos;s the
              only way to guarantee the craft, the cleanliness, and the
              communication that our name is on.
            </p>
            <p>
              When you call, you talk to the people swinging the hammers. When
              the job&apos;s done, we&apos;re still a phone call away.
            </p>
          </Reveal>
        </div>
      </section>

      <Stats />

      <section className="border-t border-steel px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-hazard">
              What we stand on
            </p>
            <h2 className="mt-4 font-display text-5xl text-bone sm:text-6xl">
              Four non-negotiables.
            </h2>
          </Reveal>
          <div className="grid gap-px border border-steel md:grid-cols-2">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 0.08}>
                <div className="h-full bg-concrete p-8">
                  <span className="font-display text-3xl text-hazard">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-2xl text-bone">
                    {v.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-fog">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
