const symptoms = [
  "Struggling to stand up after resting or naps",
  "Hesitating before stairs, jumps, or getting in the car",
  "Sleeping more and playing less — low energy, low enthusiasm",
];

export function Problem() {
  return (
    <section className="bg-stone-100 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-serif text-4xl tracking-tight text-stone-900 sm:text-5xl">
          You&apos;ve Noticed the Signs
        </h2>
        <ul className="mx-auto mt-10 max-w-xl space-y-4 text-left">
          {symptoms.map((s) => (
            <li key={s} className="flex items-start gap-3">
              <span className="mt-1 text-[#0D7377]">&#10003;</span>
              <span className="text-lg text-stone-700">{s}</span>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-lg text-stone-600">
          These aren&apos;t just signs of aging — they&apos;re signs your
          dog&apos;s body needs support its current routine isn&apos;t
          providing.{" "}
          <span className="font-medium text-stone-900">
            Long Companion Labs was built for exactly this.
          </span>
        </p>
      </div>
    </section>
  );
}
