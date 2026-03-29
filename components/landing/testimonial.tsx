const testimonials = [
  {
    dog: "Max — Golden Retriever, 12 yrs",
    stars: 5,
    before: "Could barely stand after naps, stopped playing fetch entirely.",
    after: "Back to fetching and running in the yard after 3 weeks of treatment.",
    quote:
      "Our vet put Max on a peptide protocol and the difference was unbelievable. He's moving like he did years ago. I wish we'd found this sooner.",
    author: "Sarah J.",
    location: "Denver, CO",
  },
  {
    dog: "Charlie — Lab Mix, 10 yrs",
    stars: 5,
    before: "Digestive issues, low energy, barely eating.",
    after: "More active, appetite back to normal, bright-eyed again.",
    quote:
      "The telehealth consult was so easy and the vet really took the time to understand Charlie's history. The compounded medication has been a game changer.",
    author: "Mike R.",
    location: "Austin, TX",
  },
  {
    dog: "Luna — German Shepherd, 10 yrs",
    stars: 5,
    before: "Lost mobility and enthusiasm for walks and play.",
    after: "Regained her zest for life, moving freely again.",
    quote:
      "I was skeptical, but having an actual vet prescribe and monitor Luna's treatment gave me confidence. The results speak for themselves.",
    author: "Jennifer C.",
    location: "Seattle, WA",
  },
];

export function Testimonial() {
  return (
    <section className="bg-stone-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="font-serif text-4xl tracking-tight text-stone-900 sm:text-5xl">
            Stories from Pet Parents
          </h2>
          <p className="mt-6 text-lg text-stone-600">
            Real results from dogs on veterinary-guided peptide therapy
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
                  <span key={i} className="text-[#0D7377]">
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
