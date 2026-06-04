import { SERVICES } from "@/lib/site";
import ServiceCard from "./ServiceCard";
import Reveal from "@/components/ui/Reveal";

export default function Services() {
  return (
    <section id="services" className="border-t border-steel bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-hazard">
              What we build
            </p>
            <h2 className="mt-4 max-w-xl font-display text-5xl text-bone sm:text-6xl">
              Three things, done right.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-fog">
            We don&apos;t chase every job. We do kitchens, bathrooms, and
            additions — and we do them better than the all-rounders. Tap a card
            to see the work.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
