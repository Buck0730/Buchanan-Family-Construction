"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Animated number counter. Attach the returned ref to a text element; it counts
 * from 0 to `end` when scrolled into view. Respects reduced-motion.
 */
export function useCountUp(
  end: number,
  {
    duration = 2,
    prefix = "",
    suffix = "",
    decimals = 0,
  }: { duration?: number; prefix?: string; suffix?: string; decimals?: number } = {},
) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const format = (n: number) =>
      prefix +
      (decimals > 0
        ? n.toFixed(decimals)
        : Math.round(n).toLocaleString("en-US")) +
      suffix;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = format(end);
      return;
    }

    el.textContent = format(0);
    const counter = { value: 0 };

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        value: end,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => {
          el.textContent = format(counter.value);
        },
      });
    });

    return () => ctx.revert();
  }, [end, duration, prefix, suffix, decimals]);

  return ref;
}
