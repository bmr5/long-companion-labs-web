import { Metadata } from "next";
import { PageLayout } from "components/layout/page-layout";
import { LeadMagnetCTA } from "components/landing/lead-magnet-cta";
import {
  FlaskConical,
  Heart,
  Shield,
  Microscope,
  Droplets,
  AlertTriangle,
} from "lucide-react";

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
      "BPC-157 promotes the formation of new blood vessels (angiogenesis), improving blood flow to damaged tissues. This accelerates delivery of nutrients and oxygen needed for repair — particularly relevant for aging joints with compromised circulation.",
  },
  {
    icon: Shield,
    title: "Anti-Inflammatory Pathways",
    description:
      "The peptide modulates inflammatory pathways, reducing chronic inflammation in joints and connective tissue. Unlike NSAIDs, which block inflammation systemically, BPC-157 appears to modulate the inflammatory response without the liver and kidney risks associated with long-term NSAID use.",
  },
  {
    icon: FlaskConical,
    title: "Growth Factor Upregulation",
    description:
      "BPC-157 upregulates key growth factors including EGF (epidermal growth factor), VEGF (vascular endothelial growth factor), and others involved in tissue repair. This supports healing of tendons, ligaments, muscles, and the GI tract by enhancing collagen synthesis and cellular regeneration.",
  },
  {
    icon: Microscope,
    title: "Nitric Oxide System Modulation",
    description:
      "BPC-157 interacts with the nitric oxide (NO) system, which plays a central role in vascular function, inflammation, and nerve signaling. This NO modulation may contribute to its broad therapeutic effects across multiple tissue types.",
  },
  {
    icon: Droplets,
    title: "Unique Acid Stability",
    description:
      "Unlike most peptides, BPC-157 is remarkably stable in gastric acid — it was originally isolated from gastric juice. This unique property means it survives stomach acid intact, making oral dosing viable. Most therapeutic peptides are destroyed by digestion and require injection.",
  },
];

const studies = [
  {
    number: 1,
    title: "He et al. 2022 — Beagle Pharmacokinetic Study",
    journal: "Frontiers in Pharmacology",
    doi: "10.3389/fphar.2022.1026182",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9794587/",
    description:
      "The strongest dog-specific evidence for BPC-157. This study evaluated the pharmacokinetics of BPC-157 in beagle dogs at three intramuscular doses (6, 30, and 150 mcg/kg) and one intravenous dose (6 mcg/kg).",
    findings: [
      "45–51% intramuscular bioavailability in dogs — significantly higher than the 14–19% observed in rats (dogs absorb 2.5–3x more)",
      "Half-life under 30 minutes with peak absorption (Tmax) at approximately 6–8 minutes after IM injection",
      "Linear pharmacokinetics across all doses tested",
      "No accumulation observed with 7-day repeat dosing",
    ],
    significance:
      "This is the first study to establish absorption, distribution, and bioavailability data specifically in a canine model. The high bioavailability in dogs compared to rats suggests dogs may be particularly good candidates for BPC-157 therapy.",
  },
  {
    number: 2,
    title: "Xu et al. 2020 — Comprehensive Safety Assessment",
    journal: "Regulatory Toxicology and Pharmacology",
    link: "https://www.sciencedirect.com/science/article/abs/pii/S027323002030091X",
    description:
      "A systematic safety evaluation of BPC-157 across multiple species — mice, rats, rabbits, and dogs.",
    findings: [
      "No deaths at any dose in any species tested",
      "No toxic dose identified — researchers could not establish a lethal dose",
      "No genotoxicity (no DNA damage)",
      "No embryo-fetal toxicity",
      "Only finding: decreased creatinine at 2,000 mcg/kg (333x the therapeutic dose) — which self-resolved within 2 weeks",
      "Greater than 300x safety margin between therapeutic dose and any observed effect",
    ],
    significance:
      "An exceptional safety profile. The inability to identify a toxic dose, combined with no adverse events across four species, provides strong preclinical safety data.",
  },
  {
    number: 3,
    title: "Seiwerth et al. 2018 — Comprehensive Mechanism Review",
    journal: "Current Pharmaceutical Design",
    description:
      "A thorough review of BPC-157's mechanisms of action across 25+ years of research, covering its effects on multiple organ systems and tissue types.",
    findings: [
      "Documented effects on angiogenesis, NO system, growth factor expression, and anti-inflammatory pathways",
      "Healing effects demonstrated across tendons, ligaments, muscles, bone, GI tract, nerves, and corneal tissue",
      "Unique gastroprotective properties — BPC-157 protects and heals the GI lining",
    ],
    significance:
      "Establishes BPC-157 as a multi-system peptide with broad therapeutic potential, not a single-pathway drug.",
  },
  {
    number: 4,
    title: "Chang et al. 2011 — Tendon Healing",
    journal: "Journal of Applied Physiology",
    description:
      "Evaluated BPC-157's effects on tendon-to-bone healing in a rat model.",
    findings: [
      "Accelerated tendon healing with improved biomechanical strength",
      "Enhanced collagen organization at the repair site",
    ],
    significance:
      "Directly relevant to senior dogs with tendon injuries or age-related tendon degeneration.",
  },
  {
    number: 5,
    title: "Kang et al. 2012 — Bone Healing Properties",
    journal: "Journal of Bone and Mineral Metabolism",
    description:
      "Studied BPC-157's effects on bone healing in a segmental bone defect model.",
    findings: [
      "Promoted new bone formation and improved fracture healing",
      "Enhanced osteogenic activity at the defect site",
    ],
    significance:
      "Suggests BPC-157 may support bone health in aging dogs — relevant for osteoarthritis and fracture recovery.",
  },
  {
    number: 6,
    title: "Cesarec et al. 2013 — Muscle Healing",
    journal: "Current Pharmaceutical Design",
    description:
      "Examined BPC-157's effects on crush-injured muscle tissue.",
    findings: [
      "Accelerated muscle fiber repair and regeneration",
      "Reduced inflammation at the injury site",
    ],
    significance:
      "Relevant for senior dogs experiencing muscle wasting (sarcopenia) and soft tissue injuries.",
  },
  {
    number: 7,
    title: "Sikiric et al. — 25+ Years of Original Research",
    journal: "Multiple publications",
    description:
      "The original BPC-157 research group, led by Predrag Sikiric at the University of Zagreb, has published extensively on BPC-157 since the early 1990s. Their body of work spans tissue repair, organ protection, and systemic healing effects.",
    findings: [
      "Demonstrated healing effects across virtually every tissue type studied",
      "Established the peptide's unique acid stability and gastric origin",
      "Proposed BPC-157 as a 'stable gastric pentadecapeptide' with systemic protective properties",
    ],
    significance:
      "The foundational research that everything else builds on. Over two decades of consistent, positive findings across multiple labs and models.",
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
            What the published research actually says — including what we know,
            what we don&apos;t, and why we believe veterinary peptide therapy
            deserves serious attention.
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
              BPC-157 (Body Protection Compound-157) is a 15-amino-acid
              synthetic peptide fragment of a gastroprotective protein found
              naturally in human gastric juice. First isolated and studied in the
              early 1990s by researchers at the University of Zagreb, it has
              since become one of the most extensively researched peptides in
              regenerative medicine.
            </p>
            <p>
              Unlike traditional pharmaceuticals that target a single pathway,
              BPC-157 works through multiple mechanisms — promoting blood vessel
              formation, modulating the nitric oxide system, upregulating growth
              factors, reducing inflammation, and accelerating tissue repair
              across tendons, ligaments, muscles, the GI tract, bone, and nerve
              tissue.
            </p>
            <p>
              With over 100 peer-reviewed studies published across multiple
              species, BPC-157 has demonstrated a remarkably consistent safety
              profile and broad therapeutic potential. Most research has been
              conducted in rodent models, but the 2022 beagle pharmacokinetic
              study (He et al.) provides the strongest dog-specific evidence to
              date — showing that dogs actually absorb BPC-157 significantly
              better than rats.
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
              level through multiple pathways to support the body&apos;s natural
              healing processes.
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
            The evidence base for BPC-157 spans over 100 published studies.
            These are the most relevant to veterinary applications.
          </p>

          <div className="mt-12 space-y-10">
            {studies.map((study) => (
              <div
                key={study.number}
                className="rounded-2xl border border-stone-200 bg-white p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#0D7377]/10">
                    <span className="text-sm font-bold text-[#0D7377]">
                      {study.number}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-xl text-stone-900">
                      {study.title}
                    </h3>
                    <p className="mt-1 text-sm text-stone-500">
                      Published in <em>{study.journal}</em>
                      {study.doi && (
                        <>
                          {" "}
                          · DOI:{" "}
                          <a
                            href={`https://doi.org/${study.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#0D7377] hover:underline"
                          >
                            {study.doi}
                          </a>
                        </>
                      )}
                      {study.link && !study.doi && (
                        <>
                          {" "}
                          ·{" "}
                          <a
                            href={study.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#0D7377] hover:underline"
                          >
                            View Study
                          </a>
                        </>
                      )}
                    </p>
                    <p className="mt-4 text-stone-700 leading-relaxed">
                      {study.description}
                    </p>
                    <div className="mt-4">
                      <p className="text-sm font-medium text-stone-900">
                        Key Findings:
                      </p>
                      <ul className="mt-2 space-y-2">
                        {study.findings.map((finding, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-stone-600"
                          >
                            <span className="mt-1 text-[#0D7377]">•</span>
                            <span>{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="mt-4 text-sm italic text-stone-500">
                      <strong className="not-italic text-stone-700">
                        Why it matters:
                      </strong>{" "}
                      {study.significance}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Don't Know */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 sm:p-10">
            <div className="flex items-start gap-4">
              <AlertTriangle
                className="size-8 shrink-0 text-amber-600"
                strokeWidth={1.5}
              />
              <div>
                <h2 className="font-serif text-3xl tracking-tight text-stone-900 sm:text-4xl">
                  What We Don&apos;t Know Yet
                </h2>
                <p className="mt-4 text-lg text-stone-700">
                  Transparency matters. Here&apos;s an honest look at the
                  current limitations of BPC-157 research.
                </p>
              </div>
            </div>
            <div className="mt-8 space-y-6 text-stone-700">
              <div>
                <h3 className="font-medium text-stone-900">
                  No FDA-Approved Indication
                </h3>
                <p className="mt-2 leading-relaxed">
                  BPC-157 is not FDA-approved for any use — human or veterinary.
                  There are no completed Phase III clinical trials. Our
                  treatments are provided through veterinary compounding under a
                  licensed vet&apos;s prescription, which is the legal and
                  proper way to access compounded medications.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-stone-900">
                  Most Studies Are in Rodent Models
                </h3>
                <p className="mt-2 leading-relaxed">
                  The majority of the 100+ published studies were conducted in
                  rats and mice. While the results have been remarkably
                  consistent across models, rodent studies don&apos;t always
                  translate directly to dogs or humans. The He et al. 2022
                  beagle study is the strongest dog-specific evidence available.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-stone-900">
                  More Veterinary Clinical Trials Are Needed
                </h3>
                <p className="mt-2 leading-relaxed">
                  We need more controlled clinical studies in dogs — measuring
                  real outcomes like mobility, pain scores, and quality of life
                  over time. This is one of the reasons Long Companion Labs
                  tracks outcomes for every patient: to build the real-world
                  evidence base that the field needs.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-stone-900">
                  Mechanism Not Fully Understood
                </h3>
                <p className="mt-2 leading-relaxed">
                  While BPC-157&apos;s effects have been documented extensively,
                  the precise molecular mechanisms are still being studied. We
                  know it works through multiple pathways (angiogenesis, NO
                  system, growth factors), but the complete picture is still
                  emerging.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Peptide Therapy for Dogs */}
      <section className="border-t border-stone-200 bg-stone-50 py-20 sm:py-24">
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
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="font-serif text-3xl tracking-tight text-stone-900 sm:text-4xl">
            How Long Companion Labs Is Different
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-stone-700">
            <p>
              We&apos;re not a supplement company. Long Companion Labs provides{" "}
              <strong>
                prescription-grade, pharmacy-compounded peptide therapy
              </strong>{" "}
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
                title: "Weight-Based Dosing",
                detail:
                  "Dogs range from 5 lb to 150+ lb. Flat dosing is inappropriate. Every prescription is calculated for your dog's specific weight, based on the pharmacokinetic data from published research.",
              },
              {
                title: "Ongoing Monitoring",
                detail:
                  "Your vet monitors your dog's progress and adjusts the protocol as needed. We track outcomes to build the evidence base the field needs.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-stone-200 bg-stone-50 p-6"
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
