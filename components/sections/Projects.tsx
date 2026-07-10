import Link from "next/link";
import { JOBS } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";

/* eslint-disable @next/next/no-img-element -- static project media */

export default function Projects() {
  return (
    <section
      id="work"
      className="border-t border-steel bg-mist py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-hazard">
              Recent jobs
            </p>
            <h2 className="mt-4 font-display text-5xl leading-none text-ink sm:text-6xl">
              The work.
            </h2>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-ink transition-colors hover:text-hazard"
          >
            See all work
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {JOBS.map((job, i) => (
            <Reveal key={job.slug} delay={(i % 3) * 0.06}>
              <Link
                href="/projects"
                className="group relative block overflow-hidden border border-steel"
              >
                <img
                  src={job.photos[0]}
                  alt={job.title}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  draggable={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-hazard">
                    {job.location}
                  </p>
                  <h3 className="mt-2 font-display text-3xl text-bone">
                    {job.title}
                  </h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
