"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

export function HomepageTracking() {
  useEffect(() => {
    posthog.capture("homepage_viewed");

    const thresholds = [25, 50, 75, 100];
    const fired = new Set<number>();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = (scrollTop / docHeight) * 100;

      for (const t of thresholds) {
        if (pct >= t && !fired.has(t)) {
          fired.add(t);
          posthog.capture(`homepage_scroll_${t}`);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
