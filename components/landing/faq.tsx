import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is BPC-157 and is it safe for dogs?",
    answer:
      "BPC-157 is a naturally occurring peptide that supports tissue repair and healing. Our formulation is specifically designed for dogs and has been reviewed by veterinarians for safety. Always consult your vet before starting any new supplement.",
  },
  {
    question: "How do I know which formula is right for my dog?",
    answer:
      "Choose Joint & Recovery Chews for mobility issues, Daily Wellness Chews for general health maintenance, or Senior Dog Formula for dogs 7+ years old. When in doubt, consult your veterinarian for personalized advice.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "Most dog owners notice improvements in mobility and energy within 2-4 weeks of consistent use. Individual results may vary based on your dog's age, health condition, and consistency of use.",
  },
  {
    question: "What's the proper dosage for my dog?",
    answer:
      "Each chew is pre-dosed for optimal effectiveness. Give one chew daily for dogs under 50 lbs, or as directed by your veterinarian. Our treats are formulated to be safe and effective at the recommended dosage.",
  },
  {
    question: "Are there any side effects?",
    answer:
      "BPC-157 is generally well-tolerated by dogs. Some pets may experience mild digestive upset initially. If you notice any concerning symptoms, discontinue use and consult your veterinarian immediately.",
  },
  {
    question: "Can I give these to puppies or pregnant dogs?",
    answer:
      "Our treats are formulated for adult dogs. Consult your veterinarian before giving any supplements to puppies under 1 year old, pregnant, or nursing dogs.",
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
            Everything you need to know about BPC-157 for your dog.
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
