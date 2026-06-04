"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Wraps the app in a Lenis smooth-scroll instance and drives it from GSAP's
 * ticker so Lenis and ScrollTrigger share a single, perfectly-synced RAF loop.
 * (`autoRaf: false` hands the loop to gsap.ticker; `lenis.on('scroll', ...)`
 * keeps ScrollTrigger updated on every Lenis frame.)
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (lenis) lenis.on("scroll", ScrollTrigger.update);

    function update(time: number) {
      // gsap ticker time is in seconds; Lenis expects milliseconds
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Pinned/scrubbed triggers measure layout up front; recompute once the
    // display font swaps in (and on full load) so positions stay accurate.
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      gsap.ticker.remove(update);
      if (lenis) lenis.off("scroll", ScrollTrigger.update);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ autoRaf: false, lerp: 0.1, smoothWheel: true }}
    >
      {children}
    </ReactLenis>
  );
}
