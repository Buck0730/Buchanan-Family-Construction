import { Button } from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import { COMPANY } from "@/lib/site";

export default function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-steel bg-hazard text-bone">
      {/* Oversized ghost word */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 bottom-0 select-none font-display text-[28vw] leading-none text-ink/10"
      >
        BUILD
      </span>

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-bone/80">
            Free, no-pressure estimate
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-6xl leading-none text-bone sm:text-7xl lg:text-8xl">
            Tell us what you want done.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-bone/90">
            Send the details, we&apos;ll come look at it, and you&apos;ll have a
            clear, itemized quote — usually within a couple of days.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <MagneticButton strength={0.5}>
              <Button href="/contact" variant="invert">
                Get a Quote
              </Button>
            </MagneticButton>
            <Button href={`tel:${COMPANY.phoneE164}`} variant="outlineDark">
              Call {COMPANY.phoneDisplay}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
