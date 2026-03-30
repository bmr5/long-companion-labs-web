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
        <div className="mx-auto mt-10 max-w-xl text-left">
          <p className="text-lg text-stone-600">
            Most owners try the standard options first.{" "}
            <strong className="text-stone-900">NSAIDs</strong> reduce pain but
            carry real risks — liver damage, kidney damage, and GI ulceration
            with long-term use.{" "}
            <strong className="text-stone-900">Glucosamine supplements</strong>{" "}
            may help marginally, but they don&apos;t address the underlying
            tissue damage. Neither approach supports the body&apos;s own
            repair mechanisms.
          </p>
        </div>
        <p className="mt-8 text-lg text-stone-600">
          These aren&apos;t just signs of aging — they&apos;re signs your
          dog&apos;s body needs support its current routine isn&apos;t
          providing.{" "}
          <span className="font-medium text-stone-900">
            There&apos;s a better option — and your dog doesn&apos;t have to just live with it.
          </span>
        </p>
      </div>
    </section>
  );
}
