import { WaitlistForm } from "./waitlist-form";

export function CTA() {
  return (
    <section id="waitlist" className="bg-stone-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-4xl tracking-tight text-stone-900 sm:text-5xl">
            Give Your Dog
            <br />
            Their Best Years Back
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-stone-600">
            Be the first to access veterinary-guided peptide therapy for your
            senior dog. Join the waitlist and we&apos;ll notify you the moment
            we launch.
          </p>
          <div className="mt-10 flex justify-center">
            <WaitlistForm position="bottom" />
          </div>
          <p className="mt-6 text-sm text-stone-500">
            Vet-Supervised · Pharmacy-Compounded · Shipped to Your Door
          </p>
        </div>
      </div>
    </section>
  );
}
