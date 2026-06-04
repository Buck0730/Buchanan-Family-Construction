import { Button } from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import { COMPANY } from "@/lib/site";

export default function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-steel bg-hazard text-ink">
      {/* Oversized ghost word */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 bottom-0 select-none font-display text-[28vw] leading-none text-ink/10"
      >
        BUILD
      </span>

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/70">
            Free, no-pressure estimate
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-6xl leading-none text-ink sm:text-7xl lg:text-8xl">
            Let&apos;s build the room you actually want.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-ink/80">
            Tell us about your project and we&apos;ll get you a clear, itemized
            quote — usually within a couple of days.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <MagneticButton strength={0.5}>
              <Button
                href="/contact"
                className="border-ink bg-ink text-bone hover:bg-bone hover:text-ink hover:border-bone"
              >
                Get a Quote
              </Button>
            </MagneticButton>
            <Button
              href={`tel:${COMPANY.phoneE164}`}
              variant="outline"
              className="border-ink/40 text-ink hover:border-ink hover:text-ink"
            >
              Call {COMPANY.phoneDisplay}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
