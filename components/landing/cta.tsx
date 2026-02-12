import { TrackedCTA } from "./tracking";

export function CTA() {
  return (
    <section className="bg-stone-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-4xl tracking-tight text-stone-900 sm:text-5xl">
            Give Your Dog
            <br />
            Their Best Years Back
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-stone-600">
            Join thousands of dog owners who&apos;ve watched their senior pups
            rediscover the joy of moving, playing, and living fully — backed by
            our 90-day satisfaction guarantee.
          </p>
          <div className="mt-10">
            <TrackedCTA
              href="/products"
              event="homepage_cta_clicked"
              position="bottom"
              className="inline-block rounded-full bg-[#C4A484] px-8 py-4 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-[#B8997A]"
            >
              Try Puptides Risk-Free
            </TrackedCTA>
          </div>
          <p className="mt-6 text-sm text-stone-500">
            90-Day Guarantee · Vet-Reviewed · Free Shipping over $50
          </p>
        </div>
      </div>
    </section>
  );
}
