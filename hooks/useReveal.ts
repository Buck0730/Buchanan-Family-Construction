"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * GSAP ScrollTrigger reveal. Attach the returned ref to any element to fade +
 * slide it up once when it scrolls into view. Respects reduced-motion.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  y?: number;
  duration?: number;
  delay?: number;
  start?: string;
}) {
  const ref = useRef<T>(null);
  const { y = 40, duration = 0.9, delay = 0, start = "top 85%" } =
    options ?? {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        y,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start, once: true },
      });
    });

    return () => ctx.revert();
  }, [y, duration, delay, start]);

  return ref;
}
