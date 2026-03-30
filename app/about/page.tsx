import { Metadata } from "next";
import { PageLayout } from "components/layout/page-layout";
import { LeadMagnetCTA } from "components/landing/lead-magnet-cta";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Long Companion Labs — why we started, what we believe, and where we're going.",
};

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Page Header */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="font-serif text-5xl tracking-tight text-stone-900 sm:text-6xl">
            About Us
          </h1>
          <p className="mt-6 text-xl text-stone-600">
            We started Long Companion Labs because we weren&apos;t ready to
            accept &quot;it&apos;s just age.&quot;
          </p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="border-t border-stone-200 bg-stone-50 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="font-serif text-3xl tracking-tight text-stone-900 sm:text-4xl">
            The Story
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-stone-700">
            <blockquote className="border-l-4 border-[#0D7377] pl-6 text-xl font-medium text-stone-900 italic">
              My 12-year-old Golden couldn&apos;t do stairs anymore. The vet
              said it was just age. I wasn&apos;t ready to accept that.
            </blockquote>
            <p>
              For twelve years, she was the first one down the stairs in the
              morning and the last one to stop playing at the park. Then,
              gradually, things changed. She&apos;d hesitate at the bottom step.
              She&apos;d take longer to stand up after a nap. The spark in her
              eyes was still there, but her body wasn&apos;t keeping up.
            </p>
            <p>
              The vet prescribed NSAIDs and suggested a joint supplement. When I
              asked if there was anything else — anything more targeted,
              anything newer — the answer was essentially: &quot;She&apos;s a
              senior dog. This is what we do.&quot;
            </p>
            <p>
              That didn&apos;t sit right. Not when integrative medicine was
              transforming care for human patients. Not when peptide therapy was
              being used in human longevity clinics with real results. Not when
              the research on BPC-157 showed this kind of potential.
            </p>
            <p>
              So I started digging. I read the studies — over 100 peer-reviewed
              papers on BPC-157. I talked to integrative veterinarians. I
              learned about compounding pharmacies and prescription protocols.
              And eventually, I found a path: legitimate, vet-prescribed,
              pharmacy-compounded peptide therapy for dogs.
            </p>
            <p>
              The results were hard to ignore. More mobility. More energy. More
              good days. Not a miracle — just real science, properly applied.
            </p>
            <p>
              Long Companion Labs exists because every dog owner who&apos;s been
              told &quot;it&apos;s just age&quot; deserves to know there might
              be another option. One backed by research. One supervised by a
              real veterinarian. One that treats your aging dog&apos;s declining
              health as a problem worth solving — not an inevitability to
              accept.
            </p>
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="bg-[#0D7377] py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="font-serif text-3xl tracking-tight text-white sm:text-4xl">
            What We Believe
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {[
              {
                title: "Transparency over marketing",
                detail:
                  "We tell you what the research says and what it doesn't. We'll never fabricate statistics or make claims the science can't support.",
              },
              {
                title: "Medicine, not supplements",
                detail:
                  "If it's going into your dog, it should be prescribed by a vet and compounded by a licensed pharmacy. Period.",
              },
              {
                title: "Every dog is different",
                detail:
                  "A 10-pound Dachshund and a 120-pound Great Dane shouldn't get the same dose of anything. Weight-based, personalized protocols are non-negotiable.",
              },
              {
                title: "Honest about limitations",
                detail:
                  "BPC-157 isn't FDA-approved. Most studies are in rodents. We're building the evidence base — and we think that honesty builds more trust than hype.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl bg-white/10 p-6 backdrop-blur-sm"
              >
                <h3 className="font-medium text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="font-serif text-3xl tracking-tight text-stone-900 sm:text-4xl">
            Our Mission
          </h2>
          <div className="mt-8 space-y-6">
            <p className="text-2xl font-medium leading-relaxed text-stone-900">
              We believe every dog deserves to age with dignity, comfort, and
              vitality.
            </p>
            <p className="text-lg leading-relaxed text-stone-700">
              Long Companion Labs is building the bridge between cutting-edge
              regenerative science and everyday pet care. We believe that
              veterinary medicine should evolve as fast as human medicine — and
              that senior dogs deserve more than pain management and
              resignation.
            </p>
            <p className="text-lg leading-relaxed text-stone-700">
              Our approach is simple: connect dog owners with licensed
              veterinarians who understand integrative medicine, and make
              prescription-grade peptide therapy accessible, affordable, and
              properly supervised.
            </p>
          </div>
        </div>
      </section>

      {/* What's Next */}
      <section className="border-t border-stone-200 bg-stone-50 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="font-serif text-3xl tracking-tight text-stone-900 sm:text-4xl">
            What&apos;s Next
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-stone-700">
            <p>
              We&apos;re not just building a telehealth platform. We&apos;re
              working to establish BPC-157 as a recognized veterinary therapy
              through the proper channels.
            </p>
            <div className="mt-8 space-y-6">
              <div className="rounded-xl border border-stone-200 bg-white p-6">
                <h3 className="font-medium text-stone-900">
                  FDA Veterinary Bulk Drug Substance Nomination
                </h3>
                <p className="mt-2 text-stone-600">
                  We&apos;re preparing a formal nomination to add BPC-157 to the
                  FDA&apos;s veterinary bulk drug substance (BDS) list. This
                  would create a clear, recognized legal pathway for veterinary
                  compounding of BPC-157 — moving the field from gray area to
                  established practice.
                </p>
              </div>
              <div className="rounded-xl border border-stone-200 bg-white p-6">
                <h3 className="font-medium text-stone-900">
                  Clinical Outcomes Tracking
                </h3>
                <p className="mt-2 text-stone-600">
                  Every patient on our platform contributes to a growing body of
                  real-world evidence. We&apos;re tracking mobility scores,
                  quality of life measures, and treatment outcomes to build the
                  veterinary clinical data the field needs.
                </p>
              </div>
              <div className="rounded-xl border border-stone-200 bg-white p-6">
                <h3 className="font-medium text-stone-900">
                  Expanding the Research Base
                </h3>
                <p className="mt-2 text-stone-600">
                  We&apos;re committed to supporting and participating in
                  veterinary clinical research on BPC-157. The 2022 beagle study
                  was a critical first step — but more controlled trials in dogs
                  are needed, and we want to help make them happen.
                </p>
              </div>
            </div>
            <p>
              We see a future where science-backed longevity therapies are a
              standard part of veterinary care — where your vet has access to
              the same regenerative tools that are changing human medicine.
              Where &quot;it&apos;s just age&quot; stops being the end of the
              conversation and starts being the beginning.
            </p>
          </div>
        </div>
      </section>

      <LeadMagnetCTA source="about" />
    </PageLayout>
  );
}
