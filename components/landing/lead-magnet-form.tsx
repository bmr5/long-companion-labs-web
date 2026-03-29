"use client";

import { useState } from "react";
import { toast } from "sonner";
import posthog from "posthog-js";

export function LeadMagnetForm({
  source,
  variant = "default",
}: {
  source: string;
  variant?: "default" | "footer" | "inline";
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      posthog.capture("guide_download", { source, email });

      if (data.duplicate) {
        toast.success("You've already requested the guide! Check your inbox.");
      } else {
        toast.success(
          "Check your inbox! Your free guide is on the way.",
        );
      }
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (variant === "footer") {
    return (
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex flex-col gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="rounded-lg border border-stone-600 bg-stone-800 px-4 py-2 text-sm text-white placeholder-stone-400 focus:border-[#0D7377] focus:outline-none focus:ring-1 focus:ring-[#0D7377]"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-[#0D7377] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0A5C5F] disabled:opacity-50"
          >
            {loading ? "Sending..." : "Get the Free Guide"}
          </button>
        </div>
      </form>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex w-full max-w-lg flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 rounded-full border border-stone-300 bg-white px-5 py-3 text-sm text-stone-900 placeholder-stone-400 focus:border-[#0D7377] focus:outline-none focus:ring-2 focus:ring-[#0D7377]/20"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-[#0D7377] px-6 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-[#0A5C5F] disabled:opacity-50"
        >
          {loading ? "Sending..." : "Download Free Guide"}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 rounded-full border border-stone-300 bg-white px-5 py-3 text-sm text-stone-900 placeholder-stone-400 focus:border-[#0D7377] focus:outline-none focus:ring-2 focus:ring-[#0D7377]/20"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-[#0D7377] px-6 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-[#0A5C5F] disabled:opacity-50"
      >
        {loading ? "Sending..." : "Get the Free Guide"}
      </button>
    </form>
  );
}
