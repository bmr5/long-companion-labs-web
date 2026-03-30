import Image from "next/image";
import { AlertCircle, Pill, ShieldAlert } from "lucide-react";

const symptoms = [
  {
    text: "Struggling to stand up after resting or naps",
    detail: "Stiffness that takes longer and longer to shake off",
    image: "/images/symptoms/struggling.png",
  },
  {
    text: "Hesitating before stairs, jumps, or getting in the car",
    detail: "Activities they used to do without thinking twice",
    image: "/images/symptoms/stairs.png",
  },
  {
    text: "Sleeping more and playing less",
    detail: "Low energy, low enthusiasm — not the dog you remember",
    image: "/images/symptoms/sleeping.png",
  },
];

const triedOptions = [
  {
    icon: Pill,
    name: "NSAIDs",
    problem: "Mask pain but risk liver, kidney, and GI damage with long-term use",
  },
  {
    icon: ShieldAlert,
    name: "Glucosamine",
    problem: "May help marginally, but doesn't address underlying tissue damage",
  },
  {
    icon: AlertCircle,
    name: "CBD & Supplements",
    problem: "Unregulated, inconsistent quality, hard to tell if they're working",
  },
];

export function Problem() {
  return (
    <section className="bg-stone-100 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-4xl tracking-tight text-stone-900 sm:text-5xl">
            You&apos;ve Noticed the Signs
          </h2>
          <p className="mt-4 text-lg text-stone-500">
            And you&apos;ve probably told yourself it&apos;s just age.
          </p>
        </div>

        {/* Symptoms cards */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-3">
          {symptoms.map((s) => (
            <div
              key={s.text}
              className="overflow-hidden rounded-xl border border-stone-200 bg-white"
            >
              <div className="relative h-48">
                <Image
                  src={s.image}
                  alt={s.text}
                  fill
                  className="object-cover"
                  sizes="(min-width: 640px) 33vw, 100vw"
                />
              </div>
              <div className="p-5">
                <p className="font-medium text-stone-900">{s.text}</p>
                <p className="mt-2 text-sm text-stone-500">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* What you've tried */}
        <div className="mx-auto mt-16 max-w-3xl">
          <h3 className="text-center font-serif text-2xl tracking-tight text-stone-900">
            You&apos;ve Tried the Standard Options
          </h3>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {triedOptions.map((opt) => (
              <div
                key={opt.name}
                className="rounded-xl border border-amber-200 bg-amber-50 p-5"
              >
                <div className="flex items-center gap-2">
                  <opt.icon className="h-5 w-5 text-amber-600" strokeWidth={1.5} />
                  <p className="font-medium text-stone-900">{opt.name}</p>
                </div>
                <p className="mt-2 text-sm text-stone-600">{opt.problem}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Transition */}
        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-lg text-stone-600">
            These aren&apos;t failures — they&apos;re just limited tools.
            None of them support your dog&apos;s own ability to repair
            and recover.{" "}
            <span className="font-medium text-[#0D7377]">
              That&apos;s exactly what peptide therapy is designed to do.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
