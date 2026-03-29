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
      "BPC-157 (Body Protection Compound-157) is a 15-amino-acid peptide originally derived from a protective protein found in human gastric juice. It has been studied in over 100 peer-reviewed publications and has shown remarkable potential for tissue repair, reducing inflammation, and promoting healing in tendons, ligaments, muscles, and the GI tract.",
  },
  {
    question: "Is this safe for my dog?",
    answer:
      "Yes. Every treatment plan is prescribed and supervised by a licensed veterinarian. The medications are prepared by licensed compounding pharmacies following strict quality standards. BPC-157 has been studied in over 100 published papers with an excellent safety profile — no toxic effects have been reported even at high doses.",
  },
  {
    question: "How is this different from supplements I can buy online?",
    answer:
      "Over-the-counter supplements are unregulated and often under-dosed. Long Companion Labs provides prescription-grade, pharmacy-compounded medications — prescribed by a vet who knows your dog's specific needs. It's the difference between a vitamin and a real treatment. Our medications come from licensed 503A compounding pharmacies with verified potency and purity.",
  },
  {
    question: "What conditions can peptide therapy help with?",
    answer:
      "BPC-157 therapy is most commonly used for age-related mobility issues, joint stiffness, arthritis, tendon and ligament injuries, post-surgical recovery, and general decline in vitality in senior dogs. Your veterinarian will determine whether peptide therapy is appropriate for your dog's specific condition during the consultation.",
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
      "Most pet owners report noticeable improvements in mobility and energy within 2–4 weeks of starting their prescribed protocol. Some dogs show improvement sooner. Your vet will monitor progress and adjust the treatment plan as needed.",
  },
  {
    question: "How is the medication administered?",
    answer:
      "The specific administration method depends on your vet's prescription. Your shipment will include clear dosing instructions, and your vet will walk you through the process during your consultation. Most pet owners find administration straightforward after the first few days.",
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
      "We're working toward nationwide availability. Veterinary telehealth regulations vary by state, and compounded medication shipping has its own regulatory requirements. We'll share coverage details as we launch.",
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
            Everything you need to know about Long Companion Labs and
            veterinary peptide therapy.
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

      {/* Process */}
      <section className="bg-white py-20 sm:py-24">
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
      <section className="border-t border-stone-200 bg-stone-50 py-20 sm:py-24">
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
