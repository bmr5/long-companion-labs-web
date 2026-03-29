import { Metadata } from "next";
import { PageLayout } from "components/layout/page-layout";
import { LeadMagnetCTA } from "components/landing/lead-magnet-cta";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Educational resources about senior dog health, peptide therapy, arthritis, and longevity — from Long Companion Labs.",
};

const articles = [
  {
    title: "Understanding Arthritis in Senior Dogs",
    description:
      "Arthritis affects up to 80% of dogs over age 8. Learn what's actually happening in your dog's joints, why traditional treatments often fall short, and what emerging therapies offer for long-term mobility support.",
    category: "Senior Dog Health",
  },
  {
    title: "What Are Peptides? A Pet Owner's Guide",
    description:
      "Peptides are everywhere in longevity medicine — but what are they, exactly? A plain-language breakdown of peptide therapy, how it works, and why veterinarians are paying attention.",
    category: "Peptide Therapy",
  },
  {
    title: "5 Signs Your Dog Is Aging Faster Than They Should",
    description:
      "Not all aging is inevitable. Some signs that look like 'just getting old' are actually signals that your dog's body needs more support. Here's what to watch for — and what you can do about it.",
    category: "Senior Dog Health",
  },
  {
    title: "The Difference Between Supplements and Prescription Therapy",
    description:
      "Glucosamine, CBD, fish oil, prescription peptides — they're all marketed for joint health. But they're not the same. A clear comparison of what's regulated, what's proven, and what actually matters.",
    category: "Education",
  },
];

export default function LearnPage() {
  return (
    <PageLayout>
      {/* Page Header */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="font-serif text-5xl tracking-tight text-stone-900 sm:text-6xl">
            Learn
          </h1>
          <p className="mt-6 text-xl text-stone-600">
            Educational resources about senior dog health, peptide therapy, and
            the science of helping your dog live better, longer.
          </p>
        </div>
      </section>

      {/* Article Cards */}
      <section className="border-t border-stone-200 bg-stone-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {articles.map((article) => (
              <div
                key={article.title}
                className="group relative rounded-2xl border border-stone-200 bg-white p-8 transition-shadow hover:shadow-sm"
              >
                {/* Coming Soon Badge */}
                <div className="absolute right-6 top-6">
                  <span className="inline-flex items-center rounded-full bg-[#0D7377]/10 px-3 py-1 text-xs font-medium text-[#0D7377]">
                    Coming Soon
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <BookOpen
                    className="size-5 text-[#0D7377]"
                    strokeWidth={1.5}
                  />
                  <span className="text-xs font-medium uppercase tracking-wider text-stone-400">
                    {article.category}
                  </span>
                </div>

                <h3 className="mt-4 font-serif text-2xl text-stone-900">
                  {article.title}
                </h3>

                <p className="mt-4 text-stone-600 leading-relaxed">
                  {article.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-8 py-6">
              <BookOpen
                className="size-6 text-[#0D7377]"
                strokeWidth={1.5}
              />
              <div className="text-left">
                <p className="font-medium text-stone-900">
                  More articles coming soon
                </p>
                <p className="text-sm text-stone-500">
                  We&apos;re building a comprehensive resource library for
                  senior dog owners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LeadMagnetCTA source="learn" />
    </PageLayout>
  );
}
