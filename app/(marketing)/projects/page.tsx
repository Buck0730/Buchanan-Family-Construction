import type { Metadata } from "next";
import { JOBS } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import CTA from "@/components/sections/CTA";

/* eslint-disable @next/next/no-img-element -- static gallery media */

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "A gallery of recent remodels by Buchanan Home Remodeling — real photos from real job sites.",
};

const VIDEOS = [
  {
    src: "/videos/bathroom-tour-1.mp4",
    poster: "/videos/bathroom-tour-1-poster.jpg",
    title: "Jobsite walkthrough",
  },
  {
    src: "/videos/bathroom-tour-2.mp4",
    poster: "/videos/bathroom-tour-2-poster.jpg",
    title: "Finish & detail work",
  },
  {
    src: "/videos/bathroom-tour-3.mp4",
    poster: "/videos/bathroom-tour-3-poster.jpg",
    title: "Jobsite walkthrough",
  },
];


export default function ProjectsPage() {
  return (
    <>
      <header className="border-b border-steel px-6 pb-16 pt-40 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-hazard">
            Portfolio
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-6xl leading-[0.9] text-ink sm:text-7xl lg:text-8xl">
            The work.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-fog">
            Real photos from real job sites. New galleries get added as
            projects wrap up.
          </p>
        </div>
      </header>

      {/* One gallery per completed job */}
      {JOBS.map((job) => (
        <section
          key={job.slug}
          className="border-b border-steel px-6 py-16 lg:px-10 lg:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-8 flex items-end justify-between gap-6">
              <h2 className="font-display text-4xl text-ink sm:text-5xl">
                {job.title}
              </h2>
              <p className="hidden shrink-0 text-xs uppercase tracking-[0.2em] text-fog sm:block">
                {job.location}
              </p>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {job.photos.map((img, i) => {
                const caption = job.captions?.[img];
                return (
                  <Reveal key={img} delay={(i % 3) * 0.06}>
                    <figure className="group overflow-hidden border border-steel bg-concrete">
                      <div className="relative overflow-hidden">
                        <img
                          src={img}
                          alt={
                            caption
                              ? `${job.title} — handmade custom cabinet`
                              : `${job.title} — photo ${i + 1}`
                          }
                          loading="lazy"
                          className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          draggable={false}
                        />
                      </div>
                      {caption && (
                        <figcaption className="border-t border-steel px-4 py-4">
                          <p className="text-[0.65rem] uppercase tracking-[0.22em] text-hazard">
                            Custom cabinetry
                          </p>
                          <p className="mt-1.5 text-sm leading-relaxed text-ink">
                            {caption}
                          </p>
                        </figcaption>
                      )}
                    </figure>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* Video walkthroughs */}
      <section className="border-t border-steel px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-hazard">
              On site
            </p>
            <h2 className="mt-4 font-display text-5xl text-ink sm:text-6xl">
              Walkthroughs.
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VIDEOS.map((video, i) => (
              <Reveal key={`${video.src}-${i}`} delay={i * 0.06}>
                <figure className="border border-steel bg-concrete">
                  <video
                    src={video.src}
                    poster={video.poster}
                    controls
                    preload="none"
                    playsInline
                    className="aspect-[3/4] w-full bg-ink object-contain"
                  />
                  <figcaption className="px-4 py-3 text-xs uppercase tracking-[0.18em] text-fog">
                    {video.title}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
