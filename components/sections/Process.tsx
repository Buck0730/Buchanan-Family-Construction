"use client";

import { useState } from "react";
import { PROCESS } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export default function Process() {
  const [active, setActive] = useState(0);

  return (
    <section
      className="border-t border-steel bg-ink px-6 py-24 lg:px-10 lg:py-32"
      aria-label="Our process"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-hazard">
            How we work
          </p>
          <h2 className="mt-4 font-display text-5xl text-bone sm:text-6xl">
            First walk-through to last.
          </h2>
          <p className="mt-4 text-sm text-fog">Tap a step to see what happens.</p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Big active index + progress (desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="font-display text-[11rem] leading-none text-hazard">
              {PROCESS[active].index}
            </div>
            <div className="mt-8 flex gap-2">
              {PROCESS.map((step, i) => (
                <button
                  key={step.index}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Go to step ${step.index}`}
                  className={cn(
                    "h-1.5 flex-1 transition-colors",
                    i <= active ? "bg-hazard" : "bg-steel hover:bg-fog",
                  )}
                />
              ))}
            </div>
          </div>

          {/* Clickable steps */}
          <ol className="lg:col-span-7">
            {PROCESS.map((step, i) => {
              const isActive = i === active;
              return (
                <li key={step.index} className="border-t border-steel last:border-b">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={isActive}
                    className="group flex w-full items-start gap-5 py-6 text-left transition-colors hover:bg-concrete/40"
                  >
                    <span
                      className={cn(
                        "font-display text-2xl transition-colors",
                        isActive ? "text-hazard" : "text-steel group-hover:text-fog",
                      )}
                    >
                      {step.index}
                    </span>
                    <span className="flex-1">
                      <span
                        className={cn(
                          "block font-display text-3xl uppercase transition-colors sm:text-4xl",
                          isActive
                            ? "text-bone"
                            : "text-fog group-hover:text-bone",
                        )}
                      >
                        {step.title}
                      </span>
                      <span
                        className={cn(
                          "block max-w-md overflow-hidden leading-relaxed text-fog transition-all duration-500",
                          isActive ? "mt-3 max-h-40 opacity-100" : "max-h-0 opacity-0",
                        )}
                      >
                        {step.description}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "font-display text-2xl transition-transform duration-300",
                        isActive
                          ? "rotate-90 text-hazard"
                          : "text-steel group-hover:text-fog",
                      )}
                    >
                      →
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
