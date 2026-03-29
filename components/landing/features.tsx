import { Video, Stethoscope, Pill, Truck } from "lucide-react";

const features = [
  {
    name: "Veterinary Telehealth Consult",
    description:
      "Connect with a licensed veterinarian from home. They'll review your dog's history, symptoms, and bloodwork to build a personalized treatment plan.",
    icon: Video,
  },
  {
    name: "Custom Prescription",
    description:
      "Your vet prescribes a peptide protocol tailored to your dog's specific needs — dosage, compound, and duration based on clinical evidence.",
    icon: Stethoscope,
  },
  {
    name: "Pharmacy-Compounded Medication",
    description:
      "Your dog's prescription is filled by a licensed compounding pharmacy. Clinical-grade peptides, not over-the-counter supplements.",
    icon: Pill,
  },
  {
    name: "Delivered to Your Door",
    description:
      "Temperature-controlled shipping ensures your dog's medication arrives fresh and ready. Ongoing refills handled automatically.",
    icon: Truck,
  },
];

export function Features() {
  return (
    <section id="how-it-works" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-4xl tracking-tight text-stone-900 sm:text-5xl">
            How It Works
          </h2>
          <p className="mt-6 text-lg text-stone-600">
            Veterinary-guided peptide therapy, from consultation to your
            doorstep. No clinic visits required.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-5xl sm:mt-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <div
                key={feature.name}
                className="rounded-2xl border border-stone-200 bg-white p-8 text-center transition-shadow hover:shadow-sm"
              >
                <div className="mx-auto flex size-12 items-center justify-center">
                  <span className="mb-1 text-xs font-bold text-[#0D7377]">
                    {i + 1}
                  </span>
                </div>
                <div className="mx-auto flex size-12 items-center justify-center">
                  <feature.icon
                    aria-hidden="true"
                    className="size-8 text-[#0D7377]"
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
