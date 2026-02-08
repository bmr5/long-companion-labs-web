"use client";

import { NumberTicker } from "@/components/ui/number-ticker";

const stats = [
  {
    value: 10000,
    suffix: "+",
    label: "Happy Dogs",
    decimals: 0,
  },
  {
    value: 97,
    suffix: "%",
    label: "Owner Satisfaction",
    decimals: 0,
  },
  {
    value: 100,
    suffix: "%",
    label: "Vet Reviewed",
    decimals: 0,
  },
  {
    value: 1,
    suffix: "",
    label: "Made in USA",
    decimals: 0,
    hideValue: true,
  },
];

export function Stats() {
  return (
    <section id="about" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl tracking-tight text-stone-900 sm:text-4xl">
            Trusted by Dog Owners Nationwide
          </h2>
        </div>
        <div className="mx-auto mt-16 max-w-4xl">
          <dl className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2">
                {stat.hideValue ? (
                  <dt className="font-serif text-2xl tracking-tight text-stone-900 sm:text-3xl">
                    <span className="text-[#9CAF88]">🇺🇸</span>
                  </dt>
                ) : (
                  <dt className="font-serif text-4xl tracking-tight text-stone-900 sm:text-5xl">
                    <NumberTicker
                      value={stat.value}
                      decimalPlaces={stat.decimals}
                      className="text-stone-900"
                    />
                    <span className="text-[#9CAF88]">{stat.suffix}</span>
                  </dt>
                )}
                <dd className="text-sm font-medium uppercase tracking-wider text-stone-500">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
