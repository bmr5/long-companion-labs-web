import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is peptide therapy for dogs?",
    answer:
      "Peptide therapy uses naturally occurring compounds like BPC-157 to support tissue repair, joint health, and recovery. Unlike over-the-counter supplements, our peptides are prescribed by a licensed vet and compounded by a regulated pharmacy — ensuring clinical-grade quality and proper dosing for your dog.",
  },
  {
    question: "How does the telehealth consultation work?",
    answer:
      "After you join the waitlist and we launch, you'll book a virtual appointment with one of our licensed veterinarians. They'll review your dog's medical history, current symptoms, and any bloodwork to determine if peptide therapy is right for your pet. The entire process happens from home — no clinic visit needed.",
  },
  {
    question: "Is this safe for my dog?",
    answer:
      "Yes. Every treatment plan is prescribed and supervised by a licensed veterinarian. The medications are prepared by licensed compounding pharmacies following strict quality standards. BPC-157 has been studied in over 100 published papers with an excellent safety profile.",
  },
  {
    question: "How is this different from supplements I can buy online?",
    answer:
      "Over-the-counter supplements are unregulated and often under-dosed. Long Companion Labs provides prescription-grade, pharmacy-compounded medications — prescribed by a vet who knows your dog's specific needs. It's the difference between a vitamin and a real treatment.",
  },
  {
    question: "How long until I see results?",
    answer:
      "Most pet owners report noticeable improvements in mobility and energy within 2–4 weeks of starting their prescribed protocol. Your vet will monitor progress and adjust the treatment plan as needed.",
  },
  {
    question: "When will Long Companion Labs launch?",
    answer:
      "We're currently in the final stages of preparation. Join the waitlist to get early access and be the first to know when we open for consultations.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-stone-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-4xl tracking-tight text-stone-900 sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-stone-600">
            Everything you need to know about Long Companion Labs.
          </p>
          <Accordion type="single" collapsible className="mt-12">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
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
      </div>
    </section>
  );
}
