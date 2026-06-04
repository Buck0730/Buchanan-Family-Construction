import { TESTIMONIALS } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";

export default function Testimonials() {
  return (
    <section className="border-t border-steel bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-hazard">
            Word of mouth
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-5xl text-bone sm:text-6xl">
            Homeowners who&apos;d hire us again.
          </h2>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="flex h-full flex-col justify-between border border-steel bg-concrete p-8">
                <blockquote className="text-lg leading-relaxed text-bone">
                  <span className="mb-4 block font-display text-5xl leading-none text-hazard">
                    &ldquo;
                  </span>
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 border-t border-steel pt-5">
                  <p className="font-display text-lg uppercase text-bone">
                    {t.name}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-fog">
                    {t.location} · {t.project}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
