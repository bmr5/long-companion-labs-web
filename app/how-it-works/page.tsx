import { Metadata } from "next";
import { PageLayout } from "components/layout/page-layout";
import { LeadMagnetCTA } from "components/landing/lead-magnet-cta";
import { Video, Stethoscope, Pill, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "From telehealth consultation to doorstep delivery — learn how Long Companion Labs brings veterinary peptide therapy to your senior dog.",
};

const steps = [
  {
    number: 1,
    icon: Video,
    title: "Book a Vet Consultation",
    subtitle: "Quick telehealth visit from the comfort of home",
    description:
      "Schedule a virtual appointment with a licensed veterinarian who specializes in integrative and regenerative medicine. During the consultation, your vet will review your dog's medical history, current symptoms, bloodwork (if available), and overall health picture. The entire visit happens over video — no stressful car rides or waiting rooms for your dog.",
    details: [
      "Licensed veterinarians with integrative medicine expertise",
      "Review of your dog's full health history",
      "Discussion of symptoms, mobility issues, and quality of life",
      "Typically 20–30 minutes",
    ],
  },
  {
    number: 2,
    icon: Stethoscope,
    title: "Get a Personalized Prescription",
    subtitle: "A treatment plan built for your dog's specific needs",
    description:
      "Based on the consultation, your veterinarian determines whether peptide therapy is appropriate for your dog. If so, they write a custom prescription — specifying the exact compound, dosage, and duration tailored to your dog's weight, breed, age, and condition. This isn't one-size-fits-all medicine.",
    details: [
      "Tailored to your dog's weight, breed, and condition",
      "Specific dosing protocol with clear instructions",
      "Treatment duration based on clinical assessment",
      "Ongoing adjustments as your vet monitors progress",
    ],
  },
  {
    number: 3,
    icon: Pill,
    title: "Pharmacy Compounding",
    subtitle: "Clinical-grade medication from a licensed pharmacy",
    description:
      "Your dog's prescription is sent to a licensed 503A compounding pharmacy — the same type of regulated facility that prepares custom medications for human patients. The pharmacy compounds your dog's medication to exact specifications, ensuring pharmaceutical-grade purity, verified potency, and precise dosing.",
    details: [
      "Licensed 503A compounding pharmacy",
      "Pharmaceutical-grade purity and potency",
      "Custom-compounded to your vet's exact specifications",
      "Strict quality controls and regulatory compliance",
    ],
  },
  {
    number: 4,
    icon: Truck,
    title: "Delivered to Your Door",
    subtitle: "Medication ships directly to you",
    description:
      "Your dog's compounded medication ships directly to your home with temperature-controlled packaging to ensure stability and efficacy. Each shipment includes clear dosing instructions so you know exactly how and when to administer the treatment. Refills are coordinated with your vet's ongoing monitoring schedule.",
    details: [
      "Temperature-controlled shipping for medication stability",
      "Clear dosing instructions included",
      "Ongoing refills coordinated with your vet",
      "Track your shipment from pharmacy to doorstep",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <PageLayout>
      {/* Page Header */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="font-serif text-5xl tracking-tight text-stone-900 sm:text-6xl">
            How It Works
          </h1>
          <p className="mt-6 text-xl text-stone-600">
            From consultation to doorstep — veterinary peptide therapy made
            accessible, safe, and simple.
          </p>
        </div>
      </section>

      {/* Steps */}
      {steps.map((step, i) => (
        <section
          key={step.number}
          className={`${i % 2 === 0 ? "bg-stone-50" : "bg-white"} border-t border-stone-200 py-20 sm:py-24`}
        >
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="flex items-start gap-6">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#0D7377]/10">
                <step.icon
                  className="size-7 text-[#0D7377]"
                  strokeWidth={1.5}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-[#0D7377]">
                    Step {step.number}
                  </span>
                </div>
                <h2 className="mt-2 font-serif text-3xl tracking-tight text-stone-900 sm:text-4xl">
                  {step.title}
                </h2>
                <p className="mt-2 text-lg text-stone-500">{step.subtitle}</p>
                <p className="mt-6 text-lg leading-relaxed text-stone-700">
                  {step.description}
                </p>
                <ul className="mt-8 space-y-3">
                  {step.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3">
                      <span className="mt-1 text-[#0D7377]">&#10003;</span>
                      <span className="text-stone-600">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      <LeadMagnetCTA source="how-it-works" />
    </PageLayout>
  );
}
