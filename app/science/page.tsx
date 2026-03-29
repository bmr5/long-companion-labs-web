import { Metadata } from "next";
import { PageLayout } from "components/layout/page-layout";
import { LeadMagnetCTA } from "components/landing/lead-magnet-cta";
import { FlaskConical, Heart, Shield, Microscope } from "lucide-react";

export const metadata: Metadata = {
  title: "The Science Behind BPC-157",
  description:
    "Learn about BPC-157 peptide therapy for dogs — mechanism of action, peer-reviewed research, and why veterinary-prescribed peptides are different from supplements.",
};

const mechanisms = [
  {
    icon: Heart,
    title: "Angiogenesis",
    description:
      "BPC-157 promotes the formation of new blood vessels, improving blood flow to damaged tissues and accelerating the delivery of nutrients and oxygen needed for repair.",
  },
  {
    icon: Shield,
    title: "Anti-Inflammatory",
    description:
      "The peptide modulates inflammatory pathways, reducing chronic inflammation in joints and connective tissue — a primary driver of pain and stiffness in aging dogs.",
  },
  {
    icon: FlaskConical,
    title: "Tissue Repair",
    description:
      "BPC-157 accelerates the healing of tendons, ligaments, muscles, and the GI tract by upregulating growth factor expression and collagen synthesis.",
  },
  {
    icon: Microscope,
    title: "Neuroprotective",
    description:
      "Emerging research suggests BPC-157 supports nerve repair and may help protect against age-related cognitive decline through its effects on the nitric oxide system.",
  },
];

export default function SciencePage() {
  return (
    <PageLayout>
      {/* Page Header */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="font-serif text-5xl tracking-tight text-stone-900 sm:text-6xl">
            The Science Behind BPC-157
          </h1>
          <p className="mt-6 text-xl text-stone-600">
            A deep dive into the peptide therapy that&apos;s changing how we
            approach senior dog health.
          </p>
        </div>
      </section>

      {/* What is BPC-157 */}
      <section className="border-t border-stone-200 bg-stone-50 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="font-serif text-3xl tracking-tight text-stone-900 sm:text-4xl">
            What is BPC-157?
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-stone-700">
            <p>
              BPC-157 (Body Protection Compound-157) is a 15-amino-acid peptide
              derived from a protective protein found naturally in human gastric
              juice. First isolated and studied in the early 1990s, it has since
              become one of the most extensively researched peptides in
              regenerative medicine.
            </p>
            <p>
              Unlike traditional pharmaceuticals that target a single pathway,
              BPC-157 works through multiple mechanisms — promoting blood vessel
              formation, reducing inflammation, and accelerating tissue repair
              across tendons, ligaments, muscles, the GI tract, and even nerve
              tissue.
            </p>
            <p>
              With over 100 peer-reviewed studies published to date, BPC-157 has
              demonstrated a remarkably consistent safety profile and broad
              therapeutic potential. And while most research has been conducted in
              preclinical models, the results have been compelling enough to
              drive growing interest from both human and veterinary integrative
              medicine practitioners.
            </p>
          </div>
        </div>
      </section>

      {/* Mechanism of Action */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-3xl tracking-tight text-stone-900 sm:text-4xl">
              Mechanism of Action
            </h2>
            <p className="mt-4 text-lg text-stone-600">
              BPC-157 doesn&apos;t just mask symptoms. It works at the cellular
              level to support your dog&apos;s natural healing processes.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
            {mechanisms.map((mech) => (
              <div
                key={mech.title}
                className="rounded-2xl border border-stone-200 bg-white p-8"
              >
                <mech.icon
                  className="size-8 text-[#0D7377]"
                  strokeWidth={1.5}
                />
                <h3 className="mt-4 font-serif text-xl text-stone-900">
                  {mech.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  {mech.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Studies */}
      <section className="border-t border-stone-200 bg-stone-50 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="font-serif text-3xl tracking-tight text-stone-900 sm:text-4xl">
            Key Research
          </h2>
          <p className="mt-4 text-lg text-stone-600">
            The evidence base for BPC-157 is extensive. Here are two studies
            particularly relevant to veterinary applications.
          </p>

          <div className="mt-12 space-y-10">
            {/* Study 1 */}
            <div className="rounded-2xl border border-stone-200 bg-white p-8">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#0D7377]/10">
                  <span className="text-sm font-bold text-[#0D7377]">1</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-stone-900">
                    He et al. 2022 — Beagle Pharmacokinetic Study
                  </h3>
                  <p className="mt-1 text-sm text-stone-500">
                    Published in <em>Drug Design, Development and Therapy</em>
                  </p>
                  <p className="mt-4 text-stone-700 leading-relaxed">
                    This study evaluated the pharmacokinetics of BPC-157 in
                    beagle dogs — one of the first to establish absorption,
                    distribution, and bioavailability data in a canine model.
                    The results demonstrated that BPC-157 is well-absorbed and
                    reaches therapeutic tissue concentrations, providing a
                    critical foundation for dosing protocols in veterinary
                    applications.
                  </p>
                </div>
              </div>
            </div>

            {/* Study 2 */}
            <div className="rounded-2xl border border-stone-200 bg-white p-8">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#0D7377]/10">
                  <span className="text-sm font-bold text-[#0D7377]">2</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-stone-900">
                    Xu et al. 2020 — Safety Profile Assessment
                  </h3>
                  <p className="mt-1 text-sm text-stone-500">
                    Published in <em>Frontiers in Pharmacology</em>
                  </p>
                  <p className="mt-4 text-stone-700 leading-relaxed">
                    A comprehensive review of BPC-157&apos;s safety data across
                    multiple studies, Xu et al. found no reported toxic effects
                    even at high doses. The peptide demonstrated no mutagenic,
                    carcinogenic, or teratogenic activity — an exceptional safety
                    profile that supports its use in both human and veterinary
                    contexts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Peptide Therapy for Dogs */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="font-serif text-3xl tracking-tight text-stone-900 sm:text-4xl">
            Why Peptide Therapy for Dogs?
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-stone-700">
            <p>
              Integrative medicine has transformed human healthcare. Peptide
              therapy, in particular, has become a cornerstone of longevity and
              regenerative medicine for people — prescribed by physicians to
              support tissue repair, reduce inflammation, and improve quality of
              life.
            </p>
            <p>
              Dogs deserve the same standard of care. Senior dogs face many of
              the same age-related challenges humans do: joint degeneration,
              chronic inflammation, reduced mobility, and declining vitality.
              Traditional veterinary options — NSAIDs, glucosamine supplements,
              or simply accepting &quot;it&apos;s just age&quot; — often fall
              short.
            </p>
            <p>
              Peptide therapy offers a fundamentally different approach: instead
              of masking pain, it supports the body&apos;s own repair
              mechanisms. And with proper veterinary oversight, it can be
              delivered safely and effectively.
            </p>
          </div>
        </div>
      </section>

      {/* How LCL is Different */}
      <section className="border-t border-stone-200 bg-stone-50 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="font-serif text-3xl tracking-tight text-stone-900 sm:text-4xl">
            How Long Companion Labs Is Different
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-stone-700">
            <p>
              We&apos;re not a supplement company. Long Companion Labs provides{" "}
              <strong>prescription-grade, pharmacy-compounded peptide therapy</strong>{" "}
              under the supervision of licensed veterinarians.
            </p>
            <p>Here&apos;s what that means in practice:</p>
          </div>
          <div className="mt-8 space-y-4">
            {[
              {
                title: "Vet-Prescribed",
                detail:
                  "Every treatment starts with a licensed veterinarian who evaluates your dog's specific health needs.",
              },
              {
                title: "Pharmacy-Compounded",
                detail:
                  "Medications are prepared by licensed 503A compounding pharmacies — not manufactured in unregulated facilities.",
              },
              {
                title: "Clinical-Grade Quality",
                detail:
                  "Exact dosing, verified potency, and pharmaceutical-grade purity. This isn't a supplement you buy off a shelf.",
              },
              {
                title: "Ongoing Monitoring",
                detail:
                  "Your vet monitors your dog's progress and adjusts the protocol as needed. It's real medicine, treated like real medicine.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-stone-200 bg-white p-6"
              >
                <h3 className="font-medium text-stone-900">{item.title}</h3>
                <p className="mt-2 text-stone-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LeadMagnetCTA source="science" />
    </PageLayout>
  );
}
