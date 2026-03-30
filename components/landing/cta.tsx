import { LeadMagnetForm } from "./lead-magnet-form";

export function CTA() {
  return (
    <section className="bg-stone-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-4xl tracking-tight text-stone-900 sm:text-5xl">
            Want to Learn More
            <br />
            Before You Decide?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-stone-600">
            Learn why veterinarians are prescribing BPC-157 for senior dogs —
            the research, how it works, and what it could mean for your dog&apos;s
            mobility and comfort. Written by our veterinary team.
          </p>
          <div className="mt-10 flex justify-center">
            <LeadMagnetForm source="cta" variant="inline" />
          </div>
          <p className="mt-6 text-sm text-stone-500">
            Free. Science-based. Straight to your inbox.
          </p>
        </div>
      </div>
    </section>
  );
}
