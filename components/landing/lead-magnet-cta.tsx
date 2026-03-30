import { LeadMagnetForm } from "./lead-magnet-form";

export function LeadMagnetCTA({ source }: { source: string }) {
  return (
    <section className="bg-stone-100 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl tracking-tight text-stone-900 sm:text-4xl">
            The Senior Dog Longevity Guide
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-stone-600">
            What the research says about BPC-157, joint health, and helping
            your dog thrive after age 7 — delivered free to your inbox.
          </p>
          <div className="mt-8 flex justify-center">
            <LeadMagnetForm source={source} variant="inline" />
          </div>
        </div>
      </div>
    </section>
  );
}
