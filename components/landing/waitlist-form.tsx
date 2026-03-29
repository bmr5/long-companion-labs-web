"use client";

import { useState } from "react";
import { toast } from "sonner";
import posthog from "posthog-js";

export function WaitlistForm({
  position,
  variant = "default",
}: {
  position: string;
  variant?: "default" | "footer";
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
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      posthog.capture("waitlist_signup", { position, email });

      if (data.duplicate) {
        toast.success("You're already on the list! We'll be in touch soon.");
      } else {
        toast.success(
          "You're on the list! We'll let you know when we launch.",
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
            {loading ? "Joining..." : "Join the Waitlist"}
          </button>
        </div>
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
        {loading ? "Joining..." : "Get Early Access"}
      </button>
    </form>
  );
}
