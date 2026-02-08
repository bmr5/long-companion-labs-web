export function Testimonial() {
  return (
    <section className="bg-stone-50 py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <blockquote className="font-serif text-2xl italic text-stone-700 sm:text-3xl">
          "Genesis provides the consistent purity and documentation our lab
          requires. Their certificates of analysis and batch-to-batch
          reliability have made them our preferred supplier."
        </blockquote>
        <cite className="mt-6 block text-sm font-medium uppercase tracking-wider text-stone-500 not-italic">
          — Dr. Michael Chen, Research Director
        </cite>
      </div>
    </section>
  );
}
