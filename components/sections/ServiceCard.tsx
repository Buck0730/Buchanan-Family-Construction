"use client";

/* eslint-disable @next/next/no-img-element -- swappable placeholder slideshow media */

import { useCallback, useEffect, useRef, useState } from "react";
import { servicePhotos, type Service } from "@/lib/site";

const MAX_TILT = 14; // degrees
const SLIDE_MS = 15000; // 15s per photo

export default function ServiceCard({ service }: { service: Service }) {
  const photos = servicePhotos(service);

  const tiltRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const [slide, setSlide] = useState(0);
  // Bumped whenever we want to restart the 15s timer (e.g. on dot click).
  const [timerKey, setTimerKey] = useState(0);

  const prefersReduced = useRef(false);
  useEffect(() => {
    prefersReduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  // --- 3D cursor tilt (front layer) ---------------------------------------
  function handleTilt(e: React.MouseEvent<HTMLDivElement>) {
    const el = tiltRef.current;
    if (!el || prefersReduced.current) return;
    const rect = el.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    const rotateY = (offsetX / (rect.width / 2)) * MAX_TILT;
    const rotateX = -(offsetY / (rect.height / 2)) * MAX_TILT;
    el.style.transition = "transform 0.1s ease-out";
    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
  }

  function resetTilt() {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transition = "transform 0.35s ease-out";
    el.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  }

  // --- Flip ----------------------------------------------------------------
  const toggleFlip = useCallback(() => {
    setFlipped((f) => {
      const next = !f;
      if (next) {
        setSlide(0);
        setTimerKey((k) => k + 1);
      }
      return next;
    });
  }, []);

  // --- Slideshow (back layer) ---------------------------------------------
  useEffect(() => {
    if (!flipped) return;
    const id = window.setInterval(() => {
      setSlide((s) => (s + 1) % photos.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [flipped, timerKey, photos.length]);

  function jumpTo(i: number, e: React.MouseEvent) {
    e.stopPropagation(); // don't flip the card back
    setSlide(i);
    setTimerKey((k) => k + 1); // reset the 15s dwell
  }

  return (
    <div
      className="group relative h-[30rem] w-full cursor-pointer [perspective:1000px]"
      onMouseMove={handleTilt}
      onMouseLeave={resetTilt}
      onClick={toggleFlip}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleFlip();
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${service.title} — ${
        flipped ? "view details" : "view project photos"
      }`}
    >
      {/* Tilt layer (separate from flip so transforms compose) */}
      <div
        ref={tiltRef}
        className="relative h-full w-full [transform-style:preserve-3d]"
      >
        {/* Flipper */}
        <div
          className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d]"
          style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 flex flex-col justify-between border border-steel bg-concrete p-8 [backface-visibility:hidden] [transform-style:preserve-3d] group-hover:border-hazard/60"
          >
            <div className="flex items-start justify-between">
              <span className="section-index text-6xl">{service.index}</span>
              <span className="text-xs uppercase tracking-[0.2em] text-fog">
                Service
              </span>
            </div>

            <div style={{ transform: "translateZ(26px)" }}>
              <h3 className="font-display text-5xl text-bone">
                {service.title}
              </h3>
              <p className="mt-2 text-hazard">{service.tagline}</p>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-fog">
                {service.description}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-steel pt-5 text-xs uppercase tracking-[0.18em] text-fog">
              <span>{photos.length} projects</span>
              <span className="flex items-center gap-2 text-bone transition-colors group-hover:text-hazard">
                View work
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 overflow-hidden border border-hazard/60 bg-ink [backface-visibility:hidden]"
            style={{ transform: "rotateY(180deg)" }}
          >
            {/* Cross-fading slides */}
            {photos.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${service.title} project ${i + 1}`}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
                style={{ opacity: i === slide ? 1 : 0 }}
                draggable={false}
              />
            ))}

            {/* Caption */}
            <div className="absolute left-0 top-0 m-4 bg-ink/70 px-3 py-1.5 backdrop-blur-sm">
              <span className="text-xs uppercase tracking-[0.18em] text-bone">
                {service.title} · {slide + 1}/{photos.length}
              </span>
            </div>

            {/* Dot indicators on a darker bar */}
            <div
              className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-3 bg-ink/80 py-4 backdrop-blur-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {photos.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => jumpTo(i, e)}
                  aria-label={`Show photo ${i + 1}`}
                  aria-current={i === slide}
                  className={`h-3 w-3 border transition-all hover:scale-125 ${
                    i === slide
                      ? "scale-110 border-hazard bg-hazard"
                      : "border-fog bg-transparent"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
