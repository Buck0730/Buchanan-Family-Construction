"use client";

/* eslint-disable @next/next/no-img-element -- swappable placeholder project media */

import { useRef } from "react";

const PROJECTS = [
  {
    img: "/images/projects/bathrooms/bathroom-1.jpg",
    title: "Black-tile bath rebuild",
    category: "Bathroom · Pittsburgh",
  },
  {
    img: "/images/projects/bathrooms/bathroom-2.jpg",
    title: "Marble tub & shower suite",
    category: "Bathroom · Pittsburgh",
  },
  {
    img: "/images/projects/bathrooms/bathroom-3.jpg",
    title: "Grid-glass walk-in shower",
    category: "Bathroom · Pittsburgh",
  },
  {
    img: "/images/projects/bathrooms/bathroom-4.jpg",
    title: "Window-wrapped soaking tub",
    category: "Bathroom · Pittsburgh",
  },
  {
    img: "/images/projects/bathrooms/bathroom-5.jpg",
    title: "Matte black rain shower",
    category: "Bathroom · Pittsburgh",
  },
  {
    img: "/images/projects/bathrooms/bathroom-14.jpg",
    title: "Marble subway & hex bath",
    category: "Bathroom · Pittsburgh",
  },
];

export default function Projects() {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0 });

  // Mouse click-drag to scroll. Touch is left to native overflow scrolling.
  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const el = scroller.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft };
    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      /* capture unavailable */
    }
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current.active) return;
    const el = scroller.current;
    if (!el) return;
    el.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  }

  function endDrag(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current.active) return;
    drag.current.active = false;
    try {
      scroller.current?.releasePointerCapture(e.pointerId);
    } catch {
      /* pointer already released */
    }
  }

  return (
    <section className="border-t border-steel bg-concrete py-20 lg:py-28">
      <div className="mx-auto mb-10 flex max-w-7xl items-end justify-between gap-6 px-6 lg:px-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-hazard">
            Selected work
          </p>
          <h2 className="mt-4 font-display text-5xl leading-none text-bone sm:text-6xl">
            Proof in the punch list.
          </h2>
        </div>
        <p className="hidden shrink-0 items-center gap-2 text-xs uppercase tracking-[0.2em] text-fog sm:flex">
          Drag to explore <span aria-hidden>↔</span>
        </p>
      </div>

      {/* Drag-to-scroll rail: mouse-drag on desktop, finger-swipe on touch. */}
      <div
        ref={scroller}
        data-lenis-prevent
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        className="no-scrollbar cursor-grab overflow-x-auto overscroll-x-contain active:cursor-grabbing"
      >
        <div className="flex w-max select-none gap-6 px-6 lg:px-10">
          {PROJECTS.map((p) => (
            <article
              key={p.title}
              className="group relative h-[440px] w-[78vw] shrink-0 overflow-hidden border border-steel sm:h-[500px] sm:w-[26rem] lg:w-[30rem]"
            >
              <img
                src={p.img}
                alt={p.title}
                className="pointer-events-none h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6">
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
