"use client";

/* eslint-disable @next/next/no-img-element -- swappable placeholder hero art */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";
import { COMPANY } from "@/lib/site";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const bg = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const lines = gsap.utils.toArray<HTMLElement>(".hero-line-inner");

      if (reduce) {
        gsap.set([lines, ".hero-fade"], { opacity: 1, yPercent: 0, y: 0 });
        return;
      }

      // Set start states synchronously so nothing flashes before the timeline.
      gsap.set(lines, { yPercent: 110 });
      gsap.set(".hero-fade", { opacity: 0, y: 20 });
      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(lines, {
        yPercent: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.12,
      }).to(
        ".hero-fade",
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.6",
      );

      // Slow background parallax
      gsap.to(bg.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-screen items-end overflow-hidden"
    >
      {/* Background layer (parallax) */}
      <div ref={bg} className="absolute inset-0 -z-10 scale-110">
        <img
          src="/images/hero.svg"
          alt=""
          aria-hidden
          className="h-full w-full object-cover opacity-40"
          draggable={false}
        />
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 pb-20 pt-32 lg:px-10">
        <p className="hero-fade mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.28em] text-fog">
          <span className="text-hazard">●</span> Family-owned · Est.{" "}
          {COMPANY.established} · {COMPANY.area}
        </p>

        <h1 className="font-display text-[16vw] leading-[0.86] text-bone sm:text-[12vw] lg:text-[10rem]">
          <span className="block overflow-hidden">
            <span className="hero-line-inner block">Built Right.</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line-inner block">
              Built to <span className="text-hazard">Last.</span>
            </span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="hero-fade max-w-md text-base leading-relaxed text-fog sm:text-lg">
            Family-owned home remodeling — kitchens, bathrooms, decks,
            basements, and additions, built by a crew that treats your house
            like their own.
          </p>

          <div className="hero-fade flex flex-wrap gap-4">
            <MagneticButton strength={0.5}>
              <Button href="/contact">Get a Quote</Button>
            </MagneticButton>
            <Button href={`tel:${COMPANY.phoneE164}`} variant="outline">
              {COMPANY.phoneDisplay}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero-fade pointer-events-none absolute bottom-6 right-6 hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-fog lg:flex">
        Scroll
        <span className="h-10 w-px bg-steel">
          <span className="block h-1/2 w-px animate-pulse bg-hazard" />
        </span>
      </div>
    </section>
  );
}
