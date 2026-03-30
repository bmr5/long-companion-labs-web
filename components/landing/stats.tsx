"use client";

import { NumberTicker } from "@/components/ui/number-ticker";

const stats = [
  {
    value: 100,
    suffix: "+",
    label: "Published Studies on BPC-157",
    sublabel: "Over 25 years of peer-reviewed research",
    decimals: 0,
  },
  {
    value: 0,
    suffix: "",
    label: "Side Effects Reported in Safety Studies",
    sublabel: "Tested across multiple species including dogs",
    decimals: 0,
    isZero: true,
  },
  {
    value: 100,
    suffix: "%",
    label: "Vet-Supervised",
    sublabel: "Every treatment prescribed by a licensed veterinarian",
    decimals: 0,
  },
  {
    value: 25,
    suffix: "+",
    label: "Years of Research",
    sublabel: "BPC-157 studied since the late 1990s",
    decimals: 0,
  },
];

export function Stats() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl tracking-tight text-stone-900 sm:text-4xl">
            Built on Science, Guided by Vets
          </h2>
        </div>
        <div className="mx-auto mt-16 max-w-4xl">
          <dl className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2">
                {stat.isZero ? (
                  <dt className="font-serif text-4xl tracking-tight text-stone-900 sm:text-5xl">
                    <span className="text-stone-900">0</span>
                  </dt>
                ) : (
                  <dt className="font-serif text-4xl tracking-tight text-stone-900 sm:text-5xl">
                    <NumberTicker
                      value={stat.value}
                      decimalPlaces={stat.decimals}
                      className="text-stone-900"
                    />
                    <span className="text-[#0D7377]">{stat.suffix}</span>
                  </dt>
                )}
                <dd className="text-sm font-medium uppercase tracking-wider text-stone-500">
                  {stat.label}
                </dd>
                {stat.sublabel && (
                  <dd className="text-xs text-stone-400">{stat.sublabel}</dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
