import type { Metadata } from "next";
import { SERVICES, servicePhotos } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import CTA from "@/components/sections/CTA";

/* eslint-disable @next/next/no-img-element -- swappable placeholder media */

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A gallery of recent kitchen, bathroom, and addition remodels by Buchanan Family Construction.",
};

const GALLERY = SERVICES.flatMap((service) =>
  servicePhotos(service).map((img, i) => ({
    img,
    service: service.title,
    slug: service.slug,
    n: i + 1,
  })),
);

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
            Placeholder imagery for now — real project photography drops in here
            as galleries are shot.
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

      <CTA />
    </>
  );
}
