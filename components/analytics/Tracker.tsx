"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function send(payload: { type: "view" | "click"; path: string; label?: string }) {
  try {
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    } else {
      void fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      });
    }
  } catch {
    /* analytics is best-effort — never break the page */
  }
}

/**
 * Lightweight first-party analytics. Logs a page view on every route change and
 * a click event for the key conversions (Get a Quote, phone, email). Mounted
 * once in the marketing layout; admin pages are not tracked.
 */
// Module-scoped so it survives strict-mode remounts within a session.
let lastView = { path: "", t: 0 };

export default function Tracker() {
  const pathname = usePathname();

  // Page views — fires on first load and every client-side navigation.
  // Guard against duplicate sends for the same path within 2s (dev strict-mode
  // double-invoke, Lenis remounts) so counts aren't inflated.
  useEffect(() => {
    const now = Date.now();
    if (lastView.path === pathname && now - lastView.t < 2000) return;
    lastView = { path: pathname, t: now };
    send({ type: "view", path: pathname });
  }, [pathname]);

  // Conversion clicks — one delegated listener for the whole site.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement | null)?.closest("a");
      if (!el) return;
      const href = el.getAttribute("href") ?? "";
      let label = "";
      if (href.startsWith("tel:")) label = "Call";
      else if (href.startsWith("mailto:")) label = "Email";
      else if (href === "/contact" || href.endsWith("/contact")) label = "Get a Quote";
      if (label) send({ type: "click", path: window.location.pathname, label });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
