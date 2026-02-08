const testimonials = [
  {
    quote: "My 12-year-old Golden Retriever Max was struggling with joint stiffness. After just 3 weeks on Puptides, he's back to playing fetch and running like a puppy again!",
    author: "Sarah Johnson",
    location: "Denver, CO"
  },
  {
    quote: "Our senior Lab mix Charlie had digestive issues and low energy. The Daily Wellness Chews transformed him - he's more active and his appetite is back to normal.",
    author: "Mike Rodriguez", 
    location: "Austin, TX"
  },
  {
    quote: "I was skeptical about peptide supplements, but seeing my 10-year-old German Shepherd Luna regain her mobility and zest for life has made me a believer. Puptides works!",
    author: "Jennifer Chen",
    location: "Seattle, WA"
  }
];

export function Testimonial() {
  return (
    <section className="bg-stone-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl tracking-tight text-stone-900 sm:text-5xl">
            Happy Dogs, Happy Owners
          </h2>
          <p className="mt-6 text-lg text-stone-600">
            Real stories from dog owners who've seen the Puptides difference
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl border border-stone-200 p-8 text-center">
              <blockquote className="font-serif text-lg italic text-stone-700">
                "{testimonial.quote}"
              </blockquote>
              <cite className="mt-6 block text-sm font-medium uppercase tracking-wider text-stone-500 not-italic">
                — {testimonial.author}, {testimonial.location}
              </cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
