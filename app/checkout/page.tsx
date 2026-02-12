"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import posthog from "posthog-js";

const US_STATES = [
  "", "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
];

const STATE_NAMES: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
  HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri",
  MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
  NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio",
  OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina",
  SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont",
  VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
};

interface CartItem {
  size: string;
  subtitle: string;
  price: number;
  quantity: number;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem | null>(null);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [soldOut, setSoldOut] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Read cart from sessionStorage (set by product page)
    const stored = sessionStorage.getItem("puptides_cart");
    if (stored) {
      const item = JSON.parse(stored);
      setCart(item);
      posthog.capture("checkout_viewed", { size: item.size, price: item.price });
    } else {
      posthog.capture("checkout_viewed", { cart_empty: true });
    }
  }, []);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.email || !form.email.includes("@")) newErrors.email = "Valid email required";
    if (!form.firstName.trim()) newErrors.firstName = "Required";
    if (!form.lastName.trim()) newErrors.lastName = "Required";
    if (!form.address.trim()) newErrors.address = "Required";
    if (!form.city.trim()) newErrors.city = "Required";
    if (!form.state) newErrors.state = "Required";
    if (!form.zip || form.zip.length < 5) newErrors.zip = "Valid ZIP required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    posthog.capture("checkout_submitted", { size: cart?.size, price: cart?.price });

    // Log the checkout attempt to Google Sheets
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          size: cart?.size || "unknown",
          event: "checkout_attempt",
          name: `${form.firstName} ${form.lastName}`,
          city: form.city,
          state: form.state,
          zip: form.zip,
        }),
      });
    } catch {
      // Don't block the UX if logging fails
    }

    // Simulate brief processing delay
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSoldOut(true);
    setWaitlistEmail(form.email);
  };

  const handleWaitlistSubmit = async () => {
    setSubmitting(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: waitlistEmail,
          size: cart?.size || "unknown",
          event: "waitlist_signup",
        }),
      });
    } catch {
      // Fail silently
    }
    posthog.capture("waitlist_submitted", { email: waitlistEmail, size: cart?.size });
    setSubmitting(false);
    setWaitlistSubmitted(true);
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const inputClass = (field: string) =>
    `w-full rounded-lg border ${errors[field] ? "border-red-300" : "border-stone-200"} bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900/10`;

  if (!cart) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-4">
        <div className="text-center">
          <h1 className="font-serif text-2xl text-stone-900">Your cart is empty</h1>
          <p className="mt-2 text-stone-600">Add some items to your cart first.</p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-full bg-[#C4A484] px-6 py-3 text-sm font-medium text-white hover:bg-[#B8997A]"
          >
            Shop Treats
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = cart.price * cart.quantity;
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-serif text-2xl text-stone-900">
            Puptides
          </Link>
          <div className="flex items-center gap-2 text-sm text-stone-500">
            <span>🔒</span> Secure Checkout
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/products"
          className="mb-6 inline-flex items-center text-sm text-stone-500 hover:text-stone-900 transition-colors"
        >
          ← Back to shop
        </Link>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact */}
              <section className="rounded-xl border border-stone-200 bg-white p-6">
                <h2 className="text-lg font-semibold text-stone-900">Contact</h2>
                <div className="mt-4">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className={inputClass("email")}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>
              </section>

              {/* Shipping */}
              <section className="rounded-xl border border-stone-200 bg-white p-6">
                <h2 className="text-lg font-semibold text-stone-900">Shipping Address</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <input
                      type="text"
                      placeholder="First name"
                      value={form.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      className={inputClass("firstName")}
                    />
                    {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Last name"
                      value={form.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                      className={inputClass("lastName")}
                    />
                    {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      placeholder="Address"
                      value={form.address}
                      onChange={(e) => updateField("address", e.target.value)}
                      className={inputClass("address")}
                    />
                    {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      placeholder="Apartment, suite, etc. (optional)"
                      value={form.address2}
                      onChange={(e) => updateField("address2", e.target.value)}
                      className={inputClass("address2")}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="City"
                      value={form.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      className={inputClass("city")}
                    />
                    {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <select
                        value={form.state}
                        onChange={(e) => updateField("state", e.target.value)}
                        className={inputClass("state")}
                      >
                        <option value="">State</option>
                        {US_STATES.filter(Boolean).map((s) => (
                          <option key={s} value={s}>
                            {STATE_NAMES[s]}
                          </option>
                        ))}
                      </select>
                      {errors.state && <p className="mt-1 text-xs text-red-600">{errors.state}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="ZIP"
                        maxLength={10}
                        value={form.zip}
                        onChange={(e) => updateField("zip", e.target.value)}
                        className={inputClass("zip")}
                      />
                      {errors.zip && <p className="mt-1 text-xs text-red-600">{errors.zip}</p>}
                    </div>
                  </div>
                </div>
              </section>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-[#C4A484] py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#B8997A] disabled:opacity-50"
              >
                {submitting ? "Processing..." : `Continue to Payment — $${total.toFixed(2)}`}
              </button>

              <p className="text-center text-xs text-stone-400">
                You&rsquo;ll enter payment details on the next step.
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div className="mt-8 lg:col-span-5 lg:mt-0">
            <div className="sticky top-8 rounded-xl border border-stone-200 bg-white">
              <div className="border-b border-stone-100 px-6 py-4">
                <h2 className="text-lg font-semibold text-stone-900">Order Summary</h2>
              </div>

              <div className="px-6 py-5">
                <div className="flex gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-stone-100">
                    <img
                      src="/hero.png"
                      alt="BPC-157 Joint & Mobility Chews"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-stone-700 text-[10px] font-bold text-white">
                      {cart.quantity}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-stone-900">
                      BPC-157 Joint &amp; Mobility Chews
                    </h3>
                    <p className="text-xs text-stone-500">{cart.size} — {cart.subtitle}</p>
                    <p className="mt-1 text-sm font-semibold text-stone-900">
                      ${cart.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 border-t border-stone-100 px-6 py-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-500">Subtotal</span>
                  <span className="text-stone-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Shipping</span>
                  <span className="text-stone-900">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div className="border-t border-stone-200 px-6 py-4">
                <div className="flex justify-between text-base font-bold text-stone-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust signals */}
              <div className="border-t border-stone-100 px-6 py-4">
                <div className="space-y-2 text-xs text-stone-500">
                  <p>🔒 SSL encrypted checkout</p>
                  <p>🔄 90-day satisfaction guarantee</p>
                  <p>🇺🇸 Made in USA · Vet reviewed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sold Out Modal */}
      {soldOut && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
            {!waitlistSubmitted ? (
              <>
                <div className="text-5xl">🐾</div>
                <h2 className="mt-4 font-serif text-2xl text-stone-900">
                  We&rsquo;re Sold Out!
                </h2>
                <p className="mt-2 text-sm text-stone-600">
                  Our first batch sold out faster than expected. Join the waitlist
                  and we&rsquo;ll notify you the moment we restock — plus you&rsquo;ll
                  get <strong>20% off</strong> your order.
                </p>
                <div className="mt-6">
                  <input
                    type="email"
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full rounded-lg border border-stone-200 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-[#C4A484] focus:outline-none focus:ring-2 focus:ring-[#C4A484]/20"
                  />
                  <button
                    onClick={handleWaitlistSubmit}
                    disabled={submitting}
                    className="mt-3 w-full rounded-full bg-[#C4A484] py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#B8997A] disabled:opacity-50"
                  >
                    {submitting ? "..." : "Notify Me + Get 20% Off"}
                  </button>
                </div>
                <button
                  onClick={() => setSoldOut(false)}
                  className="mt-4 text-xs text-stone-400 hover:text-stone-600"
                >
                  No thanks
                </button>
              </>
            ) : (
              <>
                <div className="text-5xl">🎉</div>
                <h2 className="mt-4 font-serif text-2xl text-stone-900">
                  You&rsquo;re on the list!
                </h2>
                <p className="mt-2 text-sm text-stone-600">
                  We&rsquo;ll email <strong>{waitlistEmail}</strong> as soon as
                  we restock. Your 20% discount will be waiting.
                </p>
                <Link
                  href="/"
                  className="mt-6 inline-block rounded-full bg-[#C4A484] px-6 py-3 text-sm font-medium text-white hover:bg-[#B8997A]"
                >
                  Back to Home
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
