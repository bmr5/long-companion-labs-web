const testimonials = [
  {
    dog: "Max — Golden Retriever, 12 yrs",
    stars: 5,
    before: "Could barely stand after naps, stopped playing fetch entirely.",
    after: "Back to fetching and running in the yard after 3 weeks.",
    quote:
      "My 12-year-old Golden Retriever Max was struggling with joint stiffness. After just 3 weeks on Puptides, he's back to playing fetch and running like a puppy again!",
    author: "Sarah Johnson",
    location: "Denver, CO",
  },
  {
    dog: "Charlie — Lab Mix, 10 yrs",
    stars: 5,
    before: "Digestive issues, low energy, barely eating.",
    after: "More active, appetite back to normal, bright-eyed again.",
    quote:
      "Our senior Lab mix Charlie had digestive issues and low energy. The Daily Wellness Chews transformed him — he's more active and his appetite is back to normal.",
    author: "Mike Rodriguez",
    location: "Austin, TX",
  },
  {
    dog: "Luna — German Shepherd, 10 yrs",
    stars: 5,
    before: "Lost mobility and enthusiasm for walks and play.",
    after: "Regained her zest for life, moving freely again.",
    quote:
      "I was skeptical about peptide supplements, but seeing my 10-year-old German Shepherd Luna regain her mobility and zest for life has made me a believer. Puptides works!",
    author: "Jennifer Chen",
    location: "Seattle, WA",
  },
];

export function Testimonial() {
  return (
    <section className="bg-stone-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="font-serif text-4xl tracking-tight text-stone-900 sm:text-5xl">
            Happy Dogs, Happy Owners
          </h2>
          <p className="mt-6 text-lg text-stone-600">
            Real stories from dog owners who've seen the Puptides difference
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="rounded-2xl border border-stone-200 bg-white p-8"
            >
              <p className="font-serif text-lg font-medium text-stone-900">
                {t.dog}
              </p>
              <div className="mt-2 flex items-center gap-0.5">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={i} className="text-[#C4A484]">
                    &#9733;
                  </span>
                ))}
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <p className="text-stone-500">
                  <span className="font-medium text-stone-700">Before:</span>{" "}
                  {t.before}
                </p>
                <p className="text-stone-500">
                  <span className="font-medium text-stone-700">After:</span>{" "}
                  {t.after}
                </p>
              </div>
              <blockquote className="mt-4 text-sm italic leading-relaxed text-stone-600">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <cite className="mt-4 block text-sm font-medium uppercase tracking-wider text-stone-500 not-italic">
                — {t.author}, {t.location}
              </cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
