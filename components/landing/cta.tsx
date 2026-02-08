import Link from "next/link";

export function CTA() {
  return (
    <section className="bg-stone-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-4xl tracking-tight text-stone-900 sm:text-5xl">
            Ready to Start
            <br />
            Your Research?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-stone-600">
            Browse our catalog of high-purity research peptides. Every product
            ships with a certificate of analysis.
          </p>
          <div className="mt-10">
            <Link
              href="/products"
              className="inline-block rounded-full bg-[#C4A484] px-8 py-4 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-[#B8997A]"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
