import Link from "next/link";
import { Video, Stethoscope, Pill, Truck, ArrowRight } from "lucide-react";

const features = [
  {
    name: "Talk to a Vet From Home",
    description:
      "A quick video call with a licensed veterinarian who understands senior dog care. No stressful clinic visit.",
    icon: Video,
  },
  {
    name: "Get a Plan Made for Your Dog",
    description:
      "Your vet evaluates your dog's specific needs and prescribes a personalized peptide treatment.",
    icon: Stethoscope,
  },
  {
    name: "Medication From a Licensed Pharmacy",
    description:
      "Your dog's prescription is prepared by a licensed US compounding pharmacy — not a supplement factory.",
    icon: Pill,
  },
  {
    name: "Delivered to Your Door",
    description:
      "Ships directly to you with clear dosing instructions. No pickups, no hassle.",
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
