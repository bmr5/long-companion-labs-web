import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Why do I need to create an account?",
    answer:
      "Account verification helps us maintain quality control and ensures our products reach those committed to their wellness journey. It also allows us to provide personalized recommendations.",
  },
  {
    question: "How long does account verification take?",
    answer:
      "Most accounts are verified instantly after email confirmation. In rare cases where additional review is needed, verification typically completes within 24 hours.",
  },
  {
    question: "What purity levels can I expect?",
    answer:
      "All our peptides are crafted to a minimum 99% purity standard, verified through HPLC testing. Certificates of Analysis are available for every batch and included with your order.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Currently we ship within the United States only. All domestic orders placed before 2pm EST ship the same business day with discreet, elegant packaging.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit cards, debit cards, and bank transfers. All transactions are processed through secure, encrypted payment systems.",
  },
  {
    question: "Are these products for human use?",
    answer:
      "Our peptides are sold strictly for research and laboratory purposes only. They are not intended for human consumption, veterinary use, or any therapeutic applications.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-stone-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-4xl tracking-tight text-stone-900 sm:text-5xl">
            Common Questions
          </h2>
          <p className="mt-4 text-lg text-stone-600">
            Everything you need to know about Genesis.
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
