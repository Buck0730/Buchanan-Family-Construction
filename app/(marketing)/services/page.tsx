import type { Metadata } from "next";
import { SERVICES, servicePhotos } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import CTA from "@/components/sections/CTA";
import { cn } from "@/lib/utils";

/* eslint-disable @next/next/no-img-element -- swappable placeholder media */

export const metadata: Metadata = {
  title: "Services",
  description:
    "Kitchens, bathrooms, and home additions — full-scope remodeling by Buchanan Family Construction.",
};

export default function ServicesPage() {
  return (
    <>
      <header className="border-b border-steel px-6 pb-16 pt-40 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-hazard">
            Services
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-6xl leading-[0.9] text-bone sm:text-7xl lg:text-8xl">
            We go deep on three things.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-fog">
            No jacks-of-all-trades. Just kitchens, bathrooms, and additions —
            scoped clearly, priced honestly, and built by one dedicated crew.
          </p>
        </div>
      </header>

      {SERVICES.map((service, i) => {
        const photos = servicePhotos(service);
        const flip = i % 2 === 1;
        return (
          <section
            key={service.slug}
            id={service.slug}
            className="scroll-mt-24 border-b border-steel px-6 py-20 lg:px-10 lg:py-28"
          >
            <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
              {/* Photo grid */}
              <Reveal className={cn(flip && "lg:order-2")}>
                <div className="grid grid-cols-2 gap-3">
                  {photos.map((src, n) => (
                    <img
                      key={src}
                      src={src}
                      alt={`${service.title} example ${n + 1}`}
                      className="aspect-[4/3] w-full border border-steel object-cover"
                      draggable={false}
                    />
                  ))}
                </div>
              </Reveal>

              {/* Copy */}
              <Reveal className={cn(flip && "lg:order-1")}>
                <span className="section-index text-7xl">{service.index}</span>
                <h2 className="mt-4 font-display text-5xl text-bone sm:text-6xl">
                  {service.title}
                </h2>
                <p className="mt-3 text-lg text-hazard">{service.tagline}</p>
                <p className="mt-5 max-w-md leading-relaxed text-fog">
                  {service.description}
                </p>
                <ul className="mt-8 grid gap-px border border-steel sm:grid-cols-2">
                  {service.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 bg-concrete px-5 py-4 text-sm text-bone"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 bg-hazard" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button href="/contact" variant="outline">
                    Start a {service.title.toLowerCase()} project
                  </Button>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}

      <CTA />
    </>
  );
}
