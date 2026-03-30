import { Metadata } from "next";
import { PageLayout } from "components/layout/page-layout";
import { LeadMagnetCTA } from "components/landing/lead-magnet-cta";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about Long Companion Labs, BPC-157 peptide therapy for dogs, telehealth consultations, and compounded medications.",
};

const generalFaqs = [
  {
    question: "What is peptide therapy for dogs?",
    answer:
      "Peptide therapy uses naturally occurring compounds like BPC-157 to support tissue repair, joint health, and recovery. Unlike over-the-counter supplements, our peptides are prescribed by a licensed vet and compounded by a regulated pharmacy — ensuring clinical-grade quality and proper dosing for your dog.",
  },
  {
    question: "What is BPC-157?",
    answer:
      "BPC-157 (Body Protection Compound-157) is a 15-amino-acid peptide originally derived from a protective protein found in human gastric juice. It has been studied in over 100 peer-reviewed publications across multiple species. The 2022 beagle pharmacokinetic study (He et al., Frontiers in Pharmacology) showed 45–51% intramuscular bioavailability in dogs — significantly higher than in rats — with no accumulation after 7 days of repeat dosing.",
  },
  {
    question: "Is this safe for my dog?",
    answer:
      "Every treatment plan is prescribed and supervised by a licensed veterinarian. The medications are prepared by licensed compounding pharmacies following strict quality standards. In the most comprehensive safety study to date (Xu et al. 2020), BPC-157 was tested in mice, rats, rabbits, and dogs with zero deaths at any dose. Researchers could not identify a toxic dose, and the only finding — a decrease in creatinine — occurred at 333x the therapeutic dose and resolved on its own within two weeks.",
  },
  {
    question: "What conditions can peptide therapy help with?",
    answer:
      "BPC-157 therapy is most commonly considered for age-related mobility issues, joint stiffness, arthritis, tendon and ligament injuries, post-surgical recovery, and general decline in vitality in senior dogs. Your veterinarian will determine whether peptide therapy is appropriate for your dog's specific condition during the consultation.",
  },
];

const regulatoryFaqs = [
  {
    question: "Is BPC-157 FDA-approved?",
    answer:
      "No. BPC-157 is not FDA-approved for any use — human or veterinary. There are no completed Phase III clinical trials. We operate through veterinary compounding: a licensed veterinarian evaluates your dog and writes a patient-specific prescription, which is then filled by a licensed 503A compounding pharmacy. This is the same legal framework used for many veterinary compounded medications.",
  },
  {
    question: "Is this legal?",
    answer:
      "Yes. Veterinary compounding is governed by FDA Guidance for Industry (GFI) #256, finalized in April 2022. The process works like this: a licensed veterinarian establishes a veterinarian-client-patient relationship (VCPR), evaluates your dog, and writes a patient-specific prescription. A licensed 503A compounding pharmacy then prepares the medication. This is the proper medical channel for compounded veterinary medications.",
  },
  {
    question: "How is this different from supplements I see online?",
    answer:
      "This is an important distinction. Some companies sell BPC-157 as a pet \"supplement,\" but there is no legal dietary supplement category for animals. The Dietary Supplement Health and Education Act (DSHEA) does not apply to animals — the FDA determined this in 1996. Every \"pet supplement\" containing BPC-157 is operating without a recognized legal framework. We use the proper medical channel: veterinary prescription + licensed pharmacy compounding. It costs more, but it's the right way to do this.",
  },
  {
    question: "Why should I trust a compounded medication over a supplement?",
    answer:
      "Compounded medications are prepared by licensed pharmacies that are inspected and regulated. They use pharmaceutical-grade ingredients with verified potency and purity. Supplements sold online have no required testing, no dosing oversight, and no guarantee of what's actually in the product. When you're giving something to your dog, quality control matters.",
  },
];

const processFaqs = [
  {
    question: "How does the telehealth consultation work?",
    answer:
      "You'll book a virtual appointment with one of our licensed veterinarians. They'll review your dog's medical history, current symptoms, and any bloodwork to determine if peptide therapy is right for your pet. The entire process happens from home via video — no clinic visit needed. Consultations typically last 20–30 minutes.",
  },
  {
    question: "Do I need to provide my dog's medical records?",
    answer:
      "It's helpful but not always required. If you have recent bloodwork or veterinary records, your vet can use those to make a more informed assessment. If not, your vet will discuss what information they need and may recommend baseline bloodwork before starting treatment.",
  },
  {
    question: "How long until I see results?",
    answer:
      "Most pet owners report noticeable improvements in mobility and energy within 2–4 weeks of starting their prescribed protocol. Some dogs show improvement sooner. Your vet will monitor progress and adjust the treatment plan as needed. We track outcomes for every patient to build real-world evidence.",
  },
  {
    question: "How is the medication administered?",
    answer:
      "The specific administration method depends on your vet's prescription and is tailored to your dog's size and needs. Your shipment will include clear dosing instructions, and your vet will walk you through the process during your consultation. Most pet owners find administration straightforward after the first few days.",
  },
  {
    question: "Why is the dosing weight-based?",
    answer:
      "Dogs range from under 5 pounds to over 150 pounds — roughly a 30x difference in body weight. A flat dose that's appropriate for a Labrador could be dangerous for a Chihuahua, or sub-therapeutic for a Great Dane. Weight-based dosing is standard veterinary pharmacology. Our protocols are informed by the pharmacokinetic data from the He et al. 2022 beagle study, which tested doses at 6, 30, and 150 mcg/kg.",
  },
  {
    question: "Can I use this alongside my dog's current medications?",
    answer:
      "Your veterinarian will review all of your dog's current medications during the consultation and determine whether peptide therapy can be safely integrated with their existing treatment plan. This is one of the key reasons every treatment starts with a vet evaluation — to ensure safety and avoid interactions.",
  },
];

const logisticsFaqs = [
  {
    question: "How much does it cost?",
    answer:
      "Pricing depends on your dog's specific prescription — including the compound, dosage, and treatment duration determined by your veterinarian. We're committed to making peptide therapy accessible and will share detailed pricing information soon.",
  },
  {
    question: "How does shipping work?",
    answer:
      "Medications ship directly from our licensed compounding pharmacy to your door. Shipments include temperature-controlled packaging to ensure stability and efficacy. You'll receive tracking information so you know exactly when to expect delivery.",
  },
  {
    question: "Do you ship nationwide?",
    answer:
      "We're working toward nationwide availability. Veterinary telehealth regulations vary by state, and compounded medication shipping has its own regulatory requirements. Most states allow telehealth VCPR establishment, but a handful still require an in-person exam on file. We'll share coverage details as we launch.",
  },
  {
    question: "What about refills?",
    answer:
      "Refills are coordinated with your veterinarian's monitoring schedule. Your vet will determine the appropriate refill timing based on your dog's progress and treatment plan. We make the refill process as seamless as possible — no hassle, no gaps in treatment.",
  },
];

export default function FAQPage() {
  return (
    <PageLayout>
      {/* Page Header */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="font-serif text-5xl tracking-tight text-stone-900 sm:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-6 text-xl text-stone-600">
            Everything you need to know about Long Companion Labs and veterinary
            peptide therapy — including the questions most companies
            don&apos;t answer.
          </p>
        </div>
      </section>

      {/* General */}
      <section className="border-t border-stone-200 bg-stone-50 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="font-serif text-3xl tracking-tight text-stone-900 sm:text-4xl">
            About Peptide Therapy
          </h2>
          <Accordion type="single" collapsible className="mt-8">
            {generalFaqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`general-${index}`}
                className="border-stone-200"
              >
                <AccordionTrigger className="text-left font-serif text-lg text-stone-900 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-stone-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Regulatory Transparency */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="font-serif text-3xl tracking-tight text-stone-900 sm:text-4xl">
            Regulatory &amp; Legal
          </h2>
          <p className="mt-4 text-lg text-stone-600">
            We believe in full transparency about what BPC-157 is and
            isn&apos;t, and how we operate.
          </p>
          <Accordion type="single" collapsible className="mt-8">
            {regulatoryFaqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`regulatory-${index}`}
                className="border-stone-200"
              >
                <AccordionTrigger className="text-left font-serif text-lg text-stone-900 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-stone-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-stone-200 bg-stone-50 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="font-serif text-3xl tracking-tight text-stone-900 sm:text-4xl">
            The Process
          </h2>
          <Accordion type="single" collapsible className="mt-8">
            {processFaqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`process-${index}`}
                className="border-stone-200"
              >
                <AccordionTrigger className="text-left font-serif text-lg text-stone-900 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-stone-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Logistics */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="font-serif text-3xl tracking-tight text-stone-900 sm:text-4xl">
            Pricing &amp; Logistics
          </h2>
          <Accordion type="single" collapsible className="mt-8">
            {logisticsFaqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`logistics-${index}`}
                className="border-stone-200"
              >
                <AccordionTrigger className="text-left font-serif text-lg text-stone-900 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-stone-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <LeadMagnetCTA source="faq" />
    </PageLayout>
  );
}
