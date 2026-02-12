"use client";

import { useEffect, useCallback, useState } from "react";
import posthog from "posthog-js";

export function AdvertorialTracking() {
  useEffect(() => {
    posthog.capture("advertorial_viewed");

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
          posthog.capture(`advertorial_scroll_${t}`);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}

export function CTAButton({
  children,
  position,
  className = "",
}: {
  children: React.ReactNode;
  position: "top" | "middle" | "bottom" | "sidebar" | "sticky";
  className?: string;
}) {
  const handleClick = useCallback(() => {
    posthog.capture("advertorial_cta_clicked", { position });
  }, [position]);

  return (
    <a
      href="/products"
      onClick={handleClick}
      className={`flex items-center justify-center gap-2 w-full text-center px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg rounded-lg transition-colors ${className}`}
    >
      <span>{children}</span>
      <span aria-hidden="true" className="text-xl">
        &rarr;
      </span>
    </a>
  );
}

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    posthog.capture("advertorial_cta_clicked", { position: "sticky" });
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 p-3 backdrop-blur-sm lg:hidden">
      <a
        href="/products"
        onClick={handleClick}
        className="flex items-center justify-center gap-2 w-full text-center px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-base rounded-lg transition-colors"
      >
        <span>Try Puptides Risk-Free</span>
        <span aria-hidden="true">&rarr;</span>
      </a>
    </div>
  );
}
