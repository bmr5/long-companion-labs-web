import { HeartPulse, Shield, Zap } from "lucide-react";

const features = [
  {
    name: "Joint & Mobility Support",
    description:
      "BPC-157 helps promote healthy joint function and mobility, supporting your dog's active lifestyle and natural movement.",
    icon: HeartPulse,
  },
  {
    name: "Gut Health",
    description:
      "Supports digestive wellness and immune function through scientifically-backed BPC-157 formulation designed for canine health.",
    icon: Shield,
  },
  {
    name: "Senior Dog Vitality",
    description:
      "Specially formulated to support cognitive function, energy levels, and overall vitality in aging dogs 7+ years old.",
    icon: Zap,
  },
];

export function Features() {
  return (
    <section id="benefits" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-4xl tracking-tight text-stone-900 sm:text-5xl">
            Why Choose Puptides
          </h2>
          <p className="mt-6 text-lg text-stone-600">
            Science-backed BPC-157 treats designed specifically for your dog's 
            health and wellbeing.
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
