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
    category: "Senior Dog Health",
    content: `Osteoarthritis affects up to 80% of dogs over age 8, making it one of the most common conditions in veterinary medicine. It's not just "stiffness" — it's a progressive disease where cartilage breaks down, bones remodel, and chronic inflammation becomes self-perpetuating.

Most owners first notice their dog hesitating before stairs or taking longer to get up after lying down. By the time these signs are visible, the joint damage is often already significant. Dogs are stoic — they hide pain until it's severe.

The standard veterinary response is NSAIDs (non-steroidal anti-inflammatory drugs) like carprofen or meloxicam. These are effective at reducing pain and inflammation, but they come with real trade-offs. Long-term NSAID use carries risks of liver damage, kidney damage, and GI ulceration — particularly concerning in older dogs whose organs are already aging.

Glucosamine and chondroitin supplements are the other common recommendation. The evidence for these is mixed at best. A 2007 meta-analysis found "moderate-to-large" effects in some studies, but many were industry-funded, and the overall evidence quality was low. They may provide marginal benefit, but they don't address the underlying tissue damage.

This gap — between drugs that carry organ risks and supplements with questionable efficacy — is exactly where regenerative approaches like peptide therapy enter the conversation. The goal isn't to replace your vet's recommendations, but to explore what else might be possible.`,
  },
  {
    title: "What Are Peptides? A Dog Owner's Guide",
    category: "Peptide Therapy",
    content: `Peptides are short chains of amino acids — the building blocks of proteins. Your dog's body already produces thousands of peptides that regulate everything from digestion to healing to immune response. They're natural biological signals that tell cells what to do.

BPC-157 is a specific peptide — just 15 amino acids long — that was originally discovered in human gastric juice, the protective fluid in your stomach. Researchers found that this particular peptide had remarkable tissue-repair properties across virtually every tissue type they tested: tendons, muscles, bone, gut lining, nerves, and blood vessels.

How is this different from a supplement? In a word: regulation. Supplements like glucosamine sit on a shelf, unregulated, with no required testing and no dosing oversight. Anyone can buy them. Peptide therapy through Long Companion Labs is prescribed by a licensed veterinarian who evaluates your specific dog, compounded by a licensed pharmacy with verified purity and potency, and dosed based on your dog's weight using published pharmacokinetic data.

The 2022 beagle study (He et al., Frontiers in Pharmacology) showed that dogs absorb BPC-157 significantly better than rats — with 45–51% bioavailability via intramuscular injection, compared to just 14–19% in rodents. This suggests dogs may actually be better candidates for BPC-157 therapy than the rodent models most studies use.

One unique property of BPC-157: it's stable in stomach acid. Most peptides are destroyed by digestion, which is why they typically require injection. BPC-157's acid stability means oral formulations are viable — though higher doses are needed to achieve similar tissue levels.`,
  },
  {
    title: "5 Signs Your Dog Is Aging Faster Than They Should",
    category: "Senior Dog Health",
    content: `Not all aging is equal. Some dogs stay active and sharp well into their senior years. Others start slowing down earlier than expected. Here are five signs that your dog's body may need more support than it's getting:

1. Reluctance to jump or climb stairs. This is often the earliest sign of joint discomfort. Your dog isn't being stubborn — they're anticipating pain. If a dog that used to leap onto the couch now needs a running start or avoids it entirely, that's not laziness.

2. Stiffness after rest, especially in the morning. "Morning stiffness" that improves as the day goes on is a hallmark of osteoarthritis. If your dog is slow to rise after sleeping and then loosens up after moving around, joint inflammation is the likely culprit.

3. Decreased muscle mass in the hind legs. Run your hands over your dog's thighs and compare to six months ago. Age-related muscle wasting (sarcopenia) is common in senior dogs and creates a vicious cycle: less muscle means less joint support, which means more pain, which means less activity, which means more muscle loss.

4. Changes in posture or gait. A dog shifting weight to their front legs, walking with a shortened stride, or swinging their hips instead of driving from behind is compensating for pain. These subtle gait changes are often visible before obvious limping.

5. Reduced enthusiasm for activities they used to love. When a ball-obsessed dog stops chasing the ball, or a social dog stops greeting visitors at the door, it's worth investigating. Pain and fatigue often present as behavioral changes before physical ones.

If you're seeing two or more of these signs, your dog may benefit from a veterinary evaluation that looks beyond standard bloodwork and considers musculoskeletal health specifically.`,
  },
  {
    title: "Why Your Vet Hasn't Mentioned Peptides Yet",
    category: "Education",
    content: `If peptide therapy has this much research behind it, why hasn't your vet brought it up? It's a fair question, and the answer isn't that your vet is behind the times.

First, veterinary school curricula change slowly. Most DVMs graduated without any training in peptide therapy, regenerative medicine, or integrative approaches. The curriculum is (rightly) focused on proven, FDA-approved treatments. BPC-157 doesn't have FDA approval, so it doesn't make it into the standard education.

Second, peptide therapy entered veterinary medicine through integrative and sports medicine practitioners — a relatively small subset of the profession. Vets who work with canine athletes, agility dogs, or performance animals were the early adopters, because they see the most soft tissue injuries and are most motivated to explore regenerative options. Your general practice vet may simply not have exposure to this space.

Third, the regulatory picture is genuinely complicated. BPC-157 isn't on the FDA's veterinary bulk drug substance list, and there's no legal "dietary supplement" category for animals. Vets who prescribe it are doing so through compounding — which is legal, but requires understanding the regulatory framework. Many vets reasonably decide it's easier to stick with FDA-approved options.

Fourth, the evidence base, while strong preclinically, lacks the large-scale clinical trials that most vets want to see before recommending a treatment. The 100+ published studies are compelling, but most are in rodent models. The 2022 beagle pharmacokinetic study is a landmark — but it's a PK study, not a clinical efficacy trial.

None of this means peptide therapy doesn't work or isn't worth considering. It means the field is early. Long Companion Labs exists to bridge that gap — connecting interested pet owners with veterinarians who have the training and protocols to offer peptide therapy properly.`,
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
            Honest, research-backed information about senior dog health, peptide
            therapy, and the science of helping your dog live better, longer.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="border-t border-stone-200 bg-stone-50 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="space-y-16">
            {articles.map((article) => (
              <article
                key={article.title}
                className="rounded-2xl border border-stone-200 bg-white p-8 sm:p-10"
              >
                <div className="flex items-center gap-3">
                  <BookOpen
                    className="size-5 text-[#0D7377]"
                    strokeWidth={1.5}
                  />
                  <span className="text-xs font-medium uppercase tracking-wider text-stone-400">
                    {article.category}
                  </span>
                </div>

                <h2 className="mt-4 font-serif text-2xl text-stone-900 sm:text-3xl">
                  {article.title}
                </h2>

                <div className="mt-6 space-y-4 text-stone-600 leading-relaxed">
                  {article.content.split("\n\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <LeadMagnetCTA source="learn" />
    </PageLayout>
  );
}
