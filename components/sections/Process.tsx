"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PROCESS } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export default function Process() {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const st = ScrollTrigger.create({
          trigger: section.current,
          start: "top top",
          end: () => `+=${PROCESS.length * 100}%`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              PROCESS.length - 1,
              Math.floor(self.progress * PROCESS.length),
            );
            setActive(idx);
          },
        });
        return () => st.kill();
      });
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      className="border-t border-steel bg-ink"
      aria-label="Our process"
    >
      {/* Desktop: pinned + scrubbed */}
      <div className="hidden h-screen items-center lg:flex">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-12 gap-10 px-10">
          <div className="col-span-5">
            <p className="text-xs uppercase tracking-[0.3em] text-hazard">
              How we work
            </p>
            <div className="mt-6 font-display text-[11rem] leading-none text-hazard">
              {PROCESS[active].index}
            </div>
            <div className="mt-10 flex gap-2">
              {PROCESS.map((step, i) => (
                <span
                  key={step.index}
                  className={cn(
                    "h-1 flex-1 transition-colors duration-500",
                    i <= active ? "bg-hazard" : "bg-steel",
                  )}
                />
              ))}
            </div>
          </div>

          <ol className="col-span-7 flex flex-col justify-center gap-7">
            {PROCESS.map((step, i) => (
              <li
                key={step.index}
                className={cn(
                  "border-l-2 pl-6 transition-all duration-500",
                  i === active
                    ? "border-hazard opacity-100"
                    : "border-steel opacity-35",
                )}
              >
                <h3 className="font-display text-4xl text-bone">
                  {step.title}
                </h3>
                <p
                  className={cn(
                    "max-w-md overflow-hidden text-fog transition-all duration-500",
                    i === active
                      ? "mt-3 max-h-32 opacity-100"
                      : "max-h-0 opacity-0",
                  )}
                >
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Mobile: static stacked list */}
      <div className="px-6 py-24 lg:hidden">
        <p className="text-xs uppercase tracking-[0.3em] text-hazard">
          How we work
        </p>
        <h2 className="mt-4 font-display text-5xl text-bone">
          First walk-through to last.
        </h2>
        <div className="mt-12 space-y-6">
          {PROCESS.map((step) => (
            <Reveal key={step.index}>
              <div className="border-l-2 border-hazard pl-5">
                <span className="font-display text-3xl text-hazard">
                  {step.index}
                </span>
                <h3 className="mt-1 font-display text-3xl text-bone">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fog">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
