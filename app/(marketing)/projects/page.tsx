import type { Metadata } from "next";
import { SERVICES, servicePhotos } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import CTA from "@/components/sections/CTA";

/* eslint-disable @next/next/no-img-element -- static gallery media */

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A gallery of recent kitchen, bathroom, deck, basement, and addition remodels by Buchanan Home Remodeling.",
};

const VIDEOS = [
  {
    src: "/videos/bathroom-tour-1.mp4",
    poster: "/videos/bathroom-tour-1-poster.jpg",
    title: "Black-tile bathroom walkthrough",
  },
  {
    src: "/videos/bathroom-tour-2.mp4",
    poster: "/videos/bathroom-tour-2-poster.jpg",
    title: "Shower & vanity detail",
  },
  {
    src: "/videos/bathroom-tour-3.mp4",
    poster: "/videos/bathroom-tour-3-poster.jpg",
    title: "Marble bathroom walkthrough",
  },
];

// Real photography first (jpg), placeholder art (svg) after. Four per service.
const GALLERY = SERVICES.flatMap((service) =>
  servicePhotos(service).slice(0, 4).map((img, i) => ({
    img,
    service: service.title,
    slug: service.slug,
    n: i + 1,
  })),
).sort((a, b) => Number(b.img.endsWith(".jpg")) - Number(a.img.endsWith(".jpg")));

export default function ProjectsPage() {
  return (
    <>
      <header className="border-b border-steel px-6 pb-16 pt-40 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-hazard">
            Portfolio
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-6xl leading-[0.9] text-bone sm:text-7xl lg:text-8xl">
            The work speaks first.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-fog">
            Real photos from real job sites — more galleries drop in as each
            project wraps.
          </p>
        </div>
      </header>

      <section className="px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((item, i) => (
            <Reveal key={item.img} delay={(i % 3) * 0.06}>
              <figure className="group relative overflow-hidden border border-steel">
                <img
                  src={item.img}
                  alt={`${item.service} project ${item.n}`}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  draggable={false}
                />
                <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/90 via-ink/10 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-xs uppercase tracking-[0.18em] text-hazard">
                    {item.service}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Video walkthroughs */}
      <section className="border-t border-steel px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-hazard">
              On site
            </p>
            <h2 className="mt-4 font-display text-5xl text-bone sm:text-6xl">
              Walk the finished job.
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VIDEOS.map((video, i) => (
              <Reveal key={video.src} delay={i * 0.06}>
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
