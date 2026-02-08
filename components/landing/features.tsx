import { Droplets, FlaskConical, FileCheck } from "lucide-react";

const features = [
  {
    name: "99%+ Purity",
    description:
      "Every compound synthesized to 99%+ purity and verified through rigorous HPLC testing. Quality you can trust for accurate research results.",
    icon: Droplets,
  },
  {
    name: "Third-Party Verified",
    description:
      "Independent laboratory testing confirms purity and identity. Certificates of analysis available for every batch.",
    icon: FlaskConical,
  },
  {
    name: "Research Grade",
    description:
      "Manufactured under strict quality control for in vitro research and laboratory experimentation. Not for human consumption.",
    icon: FileCheck,
  },
];

export function Features() {
  return (
    <section id="benefits" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-4xl tracking-tight text-stone-900 sm:text-5xl">
            The Genesis Difference
          </h2>
          <p className="mt-6 text-lg text-stone-600">
            Premium research peptides trusted by laboratories and researchers
            worldwide.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-5xl sm:mt-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="rounded-2xl border border-stone-200 bg-white p-8 text-center transition-shadow hover:shadow-sm"
              >
                <div className="mx-auto flex size-12 items-center justify-center">
                  <feature.icon
                    aria-hidden="true"
                    className="size-8 text-[#9CAF88]"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="mt-6 font-serif text-xl text-stone-900">
                  {feature.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-stone-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
