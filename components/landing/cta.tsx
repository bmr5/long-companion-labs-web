import { LeadMagnetForm } from "./lead-magnet-form";

export function CTA() {
  return (
    <section className="bg-stone-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-4xl tracking-tight text-stone-900 sm:text-5xl">
            The Senior Dog
            <br />
            Longevity Guide
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-stone-600">
            5 science-backed ways to help your aging dog live longer, move
            better, and thrive — delivered free to your inbox.
          </p>
          <div className="mt-10 flex justify-center">
            <LeadMagnetForm source="cta" variant="inline" />
          </div>
          <p className="mt-6 text-sm text-stone-500">
            Vet-Supervised · Pharmacy-Compounded · Shipped to Your Door
          </p>
        </div>
      </div>
    </section>
  );
}
