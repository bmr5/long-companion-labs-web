import Link from "next/link";
import { Video, Stethoscope, Pill, Truck, ArrowRight } from "lucide-react";

const features = [
  {
    name: "Vet Telehealth Consult",
    description:
      "Connect with a licensed veterinarian from home — no clinic visit needed.",
    icon: Video,
  },
  {
    name: "Custom Prescription",
    description:
      "Your vet prescribes a peptide protocol tailored to your dog's specific needs.",
    icon: Stethoscope,
  },
  {
    name: "Pharmacy-Compounded Medication",
    description:
      "Clinical-grade peptides from a licensed 503A compounding pharmacy.",
    icon: Pill,
  },
  {
    name: "Delivered to Your Door",
    description:
      "Temperature-controlled shipping with dosing instructions included.",
    icon: Truck,
  },
];

export function Features() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-4xl tracking-tight text-stone-900 sm:text-5xl">
            How It Works
          </h2>
          <p className="mt-6 text-lg text-stone-600">
            Veterinary-guided peptide therapy, from consultation to your
            doorstep.
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
        <div className="mt-12 text-center">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-[#0D7377] transition-colors hover:text-[#0A5C5F]"
          >
            Learn more about our process
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
