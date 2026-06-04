"use client";

/* eslint-disable @next/next/no-img-element -- swappable placeholder project media */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const PROJECTS = [
  {
    img: "/images/projects/kitchens/kitchen-1.svg",
    title: "Galley to open-concept",
    category: "Kitchen · Doylestown",
  },
  {
    img: "/images/projects/bathrooms/bathroom-1.svg",
    title: "Curbless wet room",
    category: "Bathroom · Ardmore",
  },
  {
    img: "/images/projects/additions/addition-1.svg",
    title: "Two-story rear addition",
    category: "Addition · Newtown",
  },
  {
    img: "/images/projects/kitchens/kitchen-3.svg",
    title: "Chef's island build",
    category: "Kitchen · Wayne",
  },
  {
    img: "/images/projects/bathrooms/bathroom-3.svg",
    title: "Heated marble bath",
    category: "Bathroom · Bryn Mawr",
  },
  {
    img: "/images/projects/additions/addition-3.svg",
    title: "Sunroom + mudroom",
    category: "Addition · Malvern",
  },
];

export default function Projects() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Desktop: pin the section and scrub the rail horizontally.
      mm.add("(min-width: 1024px)", () => {
        const el = track.current;
        if (!el) return;
        const distance = () => el.scrollWidth - window.innerWidth + 80;
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      className="relative overflow-hidden border-t border-steel bg-concrete"
    >
      <div className="no-scrollbar overflow-x-auto py-24 lg:overflow-x-hidden lg:py-0 lg:h-screen lg:flex lg:items-center">
        <div
          ref={track}
          className="flex w-max items-stretch gap-6 px-6 lg:px-10"
        >
          {/* Intro panel */}
          <div className="flex w-[80vw] shrink-0 flex-col justify-center sm:w-[26rem] lg:w-[34rem]">
            <p className="text-xs uppercase tracking-[0.3em] text-hazard">
              Selected work
            </p>
            <h2 className="mt-4 font-display text-6xl leading-none text-bone sm:text-7xl">
              Proof in the punch list.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-fog">
              A look at recent kitchens, bathrooms, and additions.
              <span className="hidden lg:inline"> Scroll to move sideways.</span>
            </p>
          </div>

          {/* Project cards */}
          {PROJECTS.map((p) => (
            <article
              key={p.title}
              className="group relative w-[80vw] shrink-0 overflow-hidden border border-steel sm:w-[26rem] lg:h-[68vh] lg:w-[30rem]"
            >
              <img
                src={p.img}
                alt={p.title}
                className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:h-full"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-hazard">
                  {p.category}
                </p>
                <h3 className="mt-2 font-display text-3xl text-bone">
                  {p.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
