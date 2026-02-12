import type { Metadata } from "next";
import Image from "next/image";
import { AdvertorialTracking, CTAButton, StickyMobileCTA } from "./tracking";

export const metadata: Metadata = {
  title:
    "The Recovery Peptide Now Helping Senior Dogs Move Like Puppies Again | Puptides",
  description:
    "Discover how BPC-157, the compound elite athletes swear by, is giving aging dogs a second chance at pain-free movement. Now available as a daily treat.",
  robots: "noindex, nofollow",
};

const symptoms = [
  "Struggling to stand up after resting",
  "Hesitating before stairs or jumping onto the couch",
  "Walking slower on daily walks — or refusing them entirely",
  "Whimpering or flinching when touched in certain spots",
  "Sleeping more and playing less",
  "That look in their eyes — like they want to, but just can't",
];

const faqs = [
  {
    q: "Is BPC-157 safe for dogs?",
    a: "Yes. BPC-157 is a naturally occurring peptide — a small protein fragment found in the body's own gastric juices. Our formula is vet-reviewed and made with clean, minimal ingredients. No harsh chemicals, no steroids, nothing synthetic.",
  },
  {
    q: "How long until I see results?",
    a: "Most owners notice subtle changes within the first 1–2 weeks, with more noticeable improvements by weeks 3–4. Every dog is different, but consistency is key — daily use delivers the best results.",
  },
  {
    q: "What if my dog doesn't like the taste?",
    a: "Our treats are made with real chicken liver, and dogs overwhelmingly love them. But if yours doesn't? We offer a 90-day satisfaction guarantee. No questions asked.",
  },
  {
    q: "Can I give this alongside other supplements?",
    a: "Absolutely. BPC-157 works through its own unique pathways and complements other supplements like fish oil, glucosamine, or probiotics. As always, consult your vet if you have specific concerns.",
  },
];

const testimonials = [
  {
    name: "Sarah J.",
    location: "Denver, CO",
    stars: 5,
    text: "My 11-year-old Lab could barely get up in the morning. After 3 weeks on Puptides, she's meeting me at the door again. I honestly didn't think anything would help at this point.",
  },
  {
    name: "Mike R.",
    location: "Austin, TX",
    stars: 5,
    text: "I take BPC-157 myself for recovery, so when I saw a version for dogs I had to try it. My shepherd is moving like he's 5 years younger. This stuff is the real deal.",
  },
  {
    name: "Jennifer C.",
    location: "Seattle, WA",
    stars: 5,
    text: "We were considering some really tough decisions about our senior dog's quality of life. Puptides gave us more time. More good days. I can't say enough.",
  },
];

export default function RecoveryAdvertorial() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <AdvertorialTracking />

      {/* Trust Bar */}
      <div className="border-b border-stone-200 bg-stone-50 px-4 py-3.5 sm:py-4">
        <p className="mx-auto max-w-4xl text-center text-sm font-medium text-stone-600 sm:text-base">
          Vet-Reviewed Formula · 100+ Published Studies · 90-Day Guarantee ·
          Free Shipping over $50
        </p>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_340px] lg:gap-12">
          {/* Article Column */}
          <article>
            {/* Headline */}
            <h1 className="mb-6 font-serif text-[1.75rem] font-bold leading-[1.2] text-gray-900 sm:text-4xl lg:text-[2.65rem]">
              The Recovery Peptide Athletes Swear By Is Now Helping Senior Dogs
              Move Like Puppies Again
            </h1>

            {/* Author Byline */}
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xl font-bold text-white">
                DVM
              </div>
              <div>
                <p className="font-bold text-gray-900">
                  Reviewed by the Puptides Veterinary Team
                </p>
                <p className="text-sm text-gray-500">Updated on 2/10/2026</p>
              </div>
            </div>

            {/* Hero Video */}
            <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-lg">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
              >
                <source src="/hero-video.mp4" type="video/mp4" />
              </video>
            </div>

            {/* The Problem */}
            <section className="mb-10">
              <p className="mb-4 text-lg leading-relaxed">
                Is your dog struggling to get up after naps? Collapsing back
                down when trying to sit or stand? Hesitating on stairs or
                slipping across the floor? Then the issue has gone beyond
                &ldquo;just getting old.&rdquo;
              </p>
              <p className="mb-6 text-lg leading-relaxed">
                It&apos;s easy to feel helpless when your once-playful companion
                is now stiff, tired, or in obvious discomfort. But it all leads
                back to the same thing:{" "}
                <strong className="text-gray-900">
                  their body&apos;s natural repair systems are breaking down
                </strong>
                &mdash;and traditional solutions aren&apos;t fixing it.
              </p>

              <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-5 sm:p-6">
                <p className="mb-4 font-bold text-gray-900">
                  Does any of this sound familiar?
                </p>
                <ul className="space-y-3">
                  {symptoms.map((s) => (
                    <li key={s} className="flex items-start gap-3">
                      <span className="mt-0.5 text-orange-600">&#10003;</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-gray-600 italic">
                If you checked even one of these, keep reading. There&apos;s a
                reason traditional supplements haven&apos;t worked&mdash;and a
                science-backed alternative that&apos;s changing everything.
              </p>

              <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-lg">
                <Image
                  src="/images/lp-recovery/01-senior-dog-resting.png"
                  alt="Senior golden retriever resting on a dog bed"
                  fill
                  className="object-cover"
                />
              </div>
            </section>

            {/* Mobile CTA - inline for mobile, hidden on desktop (sidebar handles it) */}
            <div className="mb-10 lg:hidden">
              <CTAButton position="top">Try Puptides Risk-Free</CTAButton>
            </div>

            {/* Why Traditional Solutions Fail */}
            <section className="mb-10">
              <h2 className="mb-6 font-serif text-2xl font-bold text-gray-900 sm:text-3xl">
                Why the &ldquo;Solutions&rdquo; You&apos;ve Tried Aren&apos;t
                Working
              </h2>

              <div className="mb-6 space-y-5">
                <div>
                  <p className="font-bold text-gray-900">
                    NSAIDs (Rimadyl, Metacam, etc.)
                  </p>
                  <p className="mt-1 text-gray-600">
                    They mask pain&mdash;they don&apos;t fix anything. And
                    long-term use? It can quietly damage your dog&apos;s liver
                    and kidneys. You&apos;re trading one problem for another.
                  </p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">
                    Glucosamine &amp; Chondroitin
                  </p>
                  <p className="mt-1 text-gray-600">
                    The go-to recommendation for years. But recent research
                    shows minimal evidence of meaningful improvement&mdash;and
                    even when it helps, it takes months to notice anything.
                  </p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">
                    &ldquo;Senior&rdquo; Dog Food
                  </p>
                  <p className="mt-1 text-gray-600">
                    Mostly a marketing label. A slightly different kibble ratio
                    doesn&apos;t address the cellular-level breakdown happening
                    in your dog&apos;s joints, gut, and connective tissue.
                  </p>
                </div>
              </div>

              <p className="font-medium leading-relaxed text-gray-900">
                The truth is, none of these solutions address what&apos;s
                actually happening inside your dog&apos;s body&mdash;the
                breakdown of tissue, the chronic inflammatory cycle, the gut
                dysfunction that accelerates aging.
              </p>

              <div className="relative mt-6 w-full overflow-hidden rounded-lg">
                <Image
                  src="/images/lp-recovery/02-comparison-infographic.png"
                  alt="Comparison: NSAIDs mask pain, Glucosamine has minimal evidence, BPC-157 repairs tissue"
                  width={900}
                  height={550}
                  className="w-full"
                />
              </div>
            </section>

            {/* The Discovery */}
            <section className="mb-10">
              <h2 className="mb-6 font-serif text-2xl font-bold text-gray-900 sm:text-3xl">
                The Discovery That Changed Everything
              </h2>

              <p className="mb-4 text-lg leading-relaxed">
                What if there was a compound that professional athletes have
                been using for years to recover from injuries&mdash;and it works
                for dogs too?
              </p>

              <p className="mb-4 leading-relaxed">
                It&apos;s called <strong>BPC-157</strong>&mdash;short for{" "}
                <em>Body Protection Compound</em>. It&apos;s a naturally
                occurring peptide, a small chain of amino acids originally
                discovered in human gastric juice. Your dog&apos;s body already
                recognizes it.
              </p>

              <p className="mb-6 leading-relaxed">
                Over the past two decades, BPC-157 has been the subject of{" "}
                <strong>more than 100 published research studies</strong>. What
                researchers have found is remarkable:
              </p>

              <div className="mb-6 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-2xl">🔬</span>
                  <div>
                    <p className="font-bold text-gray-900">
                      Supports Tissue Repair &amp; Joint Recovery
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Studies show BPC-157 supports the body&apos;s natural
                      healing processes in tendons, ligaments, and connective
                      tissue.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-2xl">🧬</span>
                  <div>
                    <p className="font-bold text-gray-900">
                      Promotes Gut Health &amp; Nutrient Absorption
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Originally found in gastric juice, BPC-157 supports gut
                      lining integrity&mdash;critical for aging dogs with
                      sensitive stomachs.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-2xl">🛡️</span>
                  <div>
                    <p className="font-bold text-gray-900">
                      Supports a Healthy Inflammatory Response
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Rather than masking symptoms, BPC-157 supports the
                      body&apos;s ability to manage inflammation naturally.
                    </p>
                  </div>
                </div>
              </div>

              <p className="leading-relaxed text-gray-600">
                Athletes and biohackers have known about BPC-157 for years. Now,
                for the first time, it&apos;s available in a treat your dog will
                actually love.
              </p>

              <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-lg">
                <Image
                  src="/images/lp-recovery/03-dog-eating-treat.png"
                  alt="Owner giving a Puptides treat to their golden retriever"
                  fill
                  className="object-cover"
                />
              </div>
            </section>

            {/* CTA */}
            <section className="mb-10">
              <CTAButton position="top">
                See How Puptides Can Help Your Dog
              </CTAButton>
            </section>

            {/* Why Puptides Is Different */}
            <section className="mb-10">
              <h2 className="mb-6 font-serif text-2xl font-bold text-gray-900 sm:text-3xl">
                Why Puptides Is Different
              </h2>

              <p className="mb-6 leading-relaxed">
                Until now, the only way to give your dog BPC-157 was through
                injections&mdash;expensive vet visits, needles, and stress for
                everyone involved. Puptides changed that.
              </p>

              <div className="mb-6 grid gap-3">
                {[
                  {
                    title: "A Treat, Not a Treatment",
                    desc: "Chicken liver flavor dogs genuinely love. No needles, no vet visits, no wrestling your dog into submission.",
                  },
                  {
                    title: "Clean Ingredients Only",
                    desc: "No grain, no soy, no seed oils, no artificial colors or preservatives. Just real food and real science.",
                  },
                  {
                    title: "Made in the USA",
                    desc: "Manufactured in an FDA-registered facility with rigorous quality standards.",
                  },
                  {
                    title: "Vet-Reviewed Formula",
                    desc: "Developed with input from veterinary professionals who understand canine physiology.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4"
                  >
                    <span className="mt-0.5 text-orange-600">&#10003;</span>
                    <div>
                      <p className="font-bold text-gray-900">{item.title}</p>
                      <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* The 90-Day Journey */}
            <section className="mb-10">
              <h2 className="mb-6 font-serif text-2xl font-bold text-gray-900 sm:text-3xl">
                The 90-Day Journey
              </h2>

              <div className="space-y-6">
                <div className="border-l-4 border-orange-500 pl-5">
                  <p className="font-bold text-gray-900">
                    Week 1 &mdash; The Foundation
                  </p>
                  <p className="mt-1 text-gray-600">
                    BPC-157 begins working at the cellular level, supporting
                    your dog&apos;s natural repair and recovery processes. You
                    might not see dramatic changes yet&mdash;but the groundwork
                    is being laid.
                  </p>
                  <div className="relative mt-3 aspect-[3/2] w-full overflow-hidden rounded-lg">
                    <Image
                      src="/images/lp-recovery/04-timeline-week1.png"
                      alt="Senior dog resting comfortably in warm sunlight"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="border-l-4 border-orange-500 pl-5">
                  <p className="font-bold text-gray-900">
                    Weeks 2&ndash;4 &mdash; The Shift
                  </p>
                  <p className="mt-1 text-gray-600">
                    This is where most owners start to notice. A little more
                    energy on walks. Less stiffness in the morning. Maybe they
                    attempt the stairs again for the first time in months. Small
                    moments that mean everything.
                  </p>
                  <div className="relative mt-3 aspect-[3/2] w-full overflow-hidden rounded-lg">
                    <Image
                      src="/images/lp-recovery/05-timeline-weeks2-4.png"
                      alt="Senior dog walking with owner in a park, showing more energy"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="border-l-4 border-orange-500 pl-5">
                  <p className="font-bold text-gray-900">
                    Month 2 &mdash; The Transformation
                  </p>
                  <p className="mt-1 text-gray-600">
                    More comfortable movement. A brighter demeanor. The tail
                    wagging a little harder. Daily walks feel easier, and the
                    morning stiffness that used to linger is noticeably reduced.
                  </p>
                  <div className="relative mt-3 aspect-[3/2] w-full overflow-hidden rounded-lg">
                    <Image
                      src="/images/lp-recovery/06-timeline-month2.png"
                      alt="Golden retriever walking confidently on a trail with tail wagging"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="border-l-4 border-orange-500 pl-5">
                  <p className="font-bold text-gray-900">
                    Month 3 &mdash; The New Normal
                  </p>
                  <p className="mt-1 text-gray-600">
                    This is where the compound benefits show. Sustained
                    mobility, a stronger gut, and a dog that&apos;s genuinely
                    enjoying life again. It won&apos;t turn back the clock
                    entirely&mdash;but it can give your dog more good days. And
                    that&apos;s what matters.
                  </p>
                  <div className="relative mt-3 aspect-[3/2] w-full overflow-hidden rounded-lg">
                    <Image
                      src="/images/lp-recovery/07-timeline-month3.png"
                      alt="Happy golden retriever playing with a tennis ball in the grass"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <p className="mt-6 text-sm text-gray-500 italic">
                Every dog is different, but most owners see noticeable changes
                within the first month&mdash;and the best results by month
                three. That&apos;s why we back every order with a 90-day
                guarantee.
              </p>
            </section>

            {/* Social Proof */}
            <section className="mb-10">
              <h2 className="mb-6 font-serif text-2xl font-bold text-gray-900 sm:text-3xl">
                What Dog Owners Are Saying
              </h2>

              <div className="space-y-4">
                {testimonials.map((t) => (
                  <div
                    key={t.name}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-5 sm:p-6"
                  >
                    <div className="mb-2 flex items-center gap-0.5">
                      {Array.from({ length: t.stars }).map((_, i) => (
                        <span key={i} className="text-orange-500">
                          &#9733;
                        </span>
                      ))}
                    </div>
                    <p className="mb-3 leading-relaxed text-gray-700">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      {t.name}{" "}
                      <span className="font-normal text-gray-400">
                        &mdash; {t.location}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Product shot before final push */}
            <section className="mb-10">
              <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-lg">
                <Image
                  src="/images/lp-recovery/08-product-with-dog.png"
                  alt="Puptides treats bag with a senior dog"
                  fill
                  className="object-cover"
                />
              </div>
              <CTAButton position="middle">
                Give Your Dog The Recovery They Deserve
              </CTAButton>
            </section>

            {/* FAQ */}
            <section className="mb-10">
              <h2 className="mb-6 font-serif text-2xl font-bold text-gray-900 sm:text-3xl">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                {faqs.map((faq) => (
                  <div key={faq.q}>
                    <p className="mb-2 font-bold text-gray-900">{faq.q}</p>
                    <p className="leading-relaxed text-gray-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Final CTA + Guarantee */}
            <section className="mb-10">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center sm:p-8">
                <p className="mb-2 font-serif text-xl font-bold text-gray-900">
                  90-Day Satisfaction Guarantee
                </p>
                <p className="mb-6 text-sm text-gray-500">
                  If you don&apos;t see a difference&mdash;or if your dog simply
                  doesn&apos;t like the treats&mdash;we&apos;ll make it right.
                  No questions asked.
                </p>

                <CTAButton position="bottom">
                  Try Puptides Risk-Free Today
                </CTAButton>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-gray-400">
                  <span>Made in USA</span>
                  <span>&middot;</span>
                  <span>Vet-Reviewed</span>
                  <span>&middot;</span>
                  <span>Free Shipping over $50</span>
                </div>
              </div>
            </section>
          </article>

          {/* Sticky Sidebar - Desktop Only */}
          <aside className="hidden lg:block">
            <div className="sticky top-8 space-y-6">
              {/* Product Card */}
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="bg-gray-50 p-4">
                  <Image
                    src="/products/carousel-2-multi-breed.png"
                    alt="Puptides BPC-157 Joint & Recovery Treats with dogs"
                    width={340}
                    height={200}
                    className="mx-auto w-full rounded"
                  />
                </div>

                <div className="p-5">
                  <h3 className="mb-4 text-center text-lg font-bold uppercase tracking-wide text-gray-900">
                    Puptides Recovery Treats
                  </h3>
                  <ul className="mb-6 space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-orange-600">&#10003;</span>
                      <span>90-day satisfaction guarantee</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-orange-600">&#10003;</span>
                      <span>
                        Vet-reviewed BPC-157 recovery formula
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-orange-600">&#10003;</span>
                      <span>Free shipping on orders over $50</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-orange-600">&#10003;</span>
                      <span>Subscribe &amp; save 20%</span>
                    </li>
                  </ul>
                  <CTAButton position="sidebar" className="!py-3.5 !text-base">
                    Try Puptides Risk-Free
                  </CTAButton>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA />

      {/* Published Research References */}
      <section className="border-t border-gray-200 bg-gray-50 py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="mb-6 font-serif text-xl font-bold text-gray-900">
            Published Research on BPC-157
          </h2>
          <p className="mb-6 text-sm text-gray-500">
            The following peer-reviewed animal studies form the scientific basis
            for BPC-157&apos;s mechanisms of action. All studies were published
            in indexed journals and are available on PubMed.
          </p>
          <ol className="space-y-4 text-sm text-gray-600">
            <li>
              <p className="font-medium text-gray-900">
                Joint &amp; Tendon Recovery
              </p>
              <p>
                Cerovecki T, et al. &ldquo;Pentadecapeptide BPC 157 improves
                ligament healing in the rat.&rdquo;{" "}
                <em>Journal of Orthopaedic Research</em>, 2010;28(9):1155–1161.
                Oral delivery showed functional and biomechanical healing
                improvements.{" "}
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/20225319/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 underline"
                >
                  PubMed
                </a>
              </p>
            </li>
            <li>
              <p className="font-medium text-gray-900">
                Achilles Tendon Repair
              </p>
              <p>
                Staresinic M, et al. &ldquo;Gastric pentadecapeptide BPC 157
                accelerates healing of transected rat Achilles tendon and in
                vitro stimulates tendocytes growth.&rdquo;{" "}
                <em>Journal of Orthopaedic Research</em>, 2003;21(6):976–983.
                Full tendon integrity restored with significantly higher
                load-to-failure strength.{" "}
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/14554208/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 underline"
                >
                  PubMed
                </a>
              </p>
            </li>
            <li>
              <p className="font-medium text-gray-900">
                Tendon-to-Bone Healing
              </p>
              <p>
                Krivic A, et al. &ldquo;Achilles detachment in rat and stable
                gastric pentadecapeptide BPC 157: Promoted tendon-to-bone
                healing and opposed corticosteroid aggravation.&rdquo;{" "}
                <em>Journal of Orthopaedic Research</em>, 2006;24(5):982–989.{" "}
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/16583442/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 underline"
                >
                  PubMed
                </a>
              </p>
            </li>
            <li>
              <p className="font-medium text-gray-900">
                Gut Health &amp; Ulcer Protection
              </p>
              <p>
                Xue XC, et al. &ldquo;Protective effects of pentadecapeptide
                BPC 157 on gastric ulcer in rats.&rdquo;{" "}
                <em>World Journal of Gastroenterology</em>, 2004;10(7):1032–1036.
                Outperformed famotidine at significantly lower doses.{" "}
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/15052695/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 underline"
                >
                  PubMed
                </a>
              </p>
            </li>
            <li>
              <p className="font-medium text-gray-900">
                Gut Mucosal Repair &amp; Colitis
              </p>
              <p>
                Duzel A, et al. &ldquo;Stable gastric pentadecapeptide BPC 157
                in the treatment of colitis and ischemia and reperfusion in
                rats.&rdquo;{" "}
                <em>World Journal of Gastroenterology</em>,
                2017;23(48):8465–8488. Preserved mucosal lining and restored
                blood flow.{" "}
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/29358856/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 underline"
                >
                  PubMed
                </a>
              </p>
            </li>
            <li>
              <p className="font-medium text-gray-900">
                Muscle Recovery
              </p>
              <p>
                Novinscak T, et al. &ldquo;Gastric pentadecapeptide BPC 157 as
                an effective therapy for muscle crush injury in the
                rat.&rdquo;{" "}
                <em>Surgery Today</em>, 2008;38(8):716–725. Full function
                restored with reduced inflammation markers.{" "}
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/18668315/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 underline"
                >
                  PubMed
                </a>
              </p>
            </li>
            <li>
              <p className="font-medium text-gray-900">
                Safety in Dogs
              </p>
              <p>
                Xu C, et al. &ldquo;Preclinical safety evaluation of body
                protection compound-157.&rdquo;{" "}
                <em>Regulatory Toxicology and Pharmacology</em>, 2020;114.
                BPC-157 was well-tolerated in dogs with no adverse effects.{" "}
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/32334036/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 underline"
                >
                  PubMed
                </a>
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 pb-20 lg:pb-6">
        <p className="mx-auto max-w-2xl px-4 text-center text-xs text-gray-400">
          &copy; 2026 Puptides. These statements have not been evaluated by the
          FDA. This product is not intended to diagnose, treat, cure, or prevent
          any disease.
        </p>
      </footer>
    </div>
  );
}
