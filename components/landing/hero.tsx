import Image from "next/image";
import { Header } from "components/layout/header";
import { LeadMagnetForm } from "./lead-magnet-form";

export function Hero() {
  return (
    <div className="bg-stone-50">
      <Header />

      <div className="relative pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid min-h-[85vh] items-center lg:grid-cols-2">
            <div className="px-6 py-20 lg:px-8 lg:py-32">
              <div className="mx-auto max-w-xl lg:mx-0">
                <h1 className="font-serif text-5xl tracking-tight text-stone-900 sm:text-6xl lg:text-7xl">
                  Give Your Dog
                  <br />
                  More Good
                  <br />
                  Years
                </h1>

                {/* Credibility stats */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <div className="rounded-lg border border-[#0D7377]/20 bg-[#0D7377]/5 px-4 py-2">
                    <p className="text-sm font-medium text-[#0D7377]">
                      100+ peer-reviewed studies on BPC-157
                    </p>
                  </div>
                  <div className="rounded-lg border border-[#0D7377]/20 bg-[#0D7377]/5 px-4 py-2">
                    <p className="text-sm font-medium text-[#0D7377]">
                      Trusted by integrative veterinarians
                    </p>
                  </div>
                  <div className="rounded-lg border border-[#0D7377]/20 bg-[#0D7377]/5 px-4 py-2">
                    <p className="text-sm font-medium text-[#0D7377]">
                      Vet-prescribed · Pharmacy-compounded · Delivered
                    </p>
                  </div>
                </div>

                <p className="mt-8 text-lg text-stone-600">
                  Veterinary telehealth meets compounded peptide therapy. A
                  licensed vet evaluates your dog, prescribes a custom treatment
                  plan, and pharmacy-grade medication ships to your door.
                </p>
                <div id="guide" className="mt-10 flex flex-col gap-4">
                  <LeadMagnetForm source="hero" />
                  <p className="text-sm text-stone-500">
                    Get the free Senior Dog Longevity Guide. No spam, ever.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative flex h-[50vh] items-end lg:h-full">
              <Image
                alt="Happy senior dog in golden sunlight"
                src="/hero.png"
                fill
                priority
                className="object-cover object-[center_30%]"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-50/20 to-transparent lg:bg-gradient-to-r lg:from-stone-50/40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
