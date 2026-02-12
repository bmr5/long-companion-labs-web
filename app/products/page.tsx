import type { Metadata } from "next";
import Link from "next/link";
import { ProductFooter } from "./product-footer";
import { ProductPageClient } from "./product-page-client";
import { ProductGallery } from "./product-gallery";
import { MobileNav } from "components/landing/mobile-nav";

const navigation = [
  { name: "TREATS", href: "/products" },
  { name: "RESEARCH", href: "/#benefits" },
  { name: "QUALITY", href: "/#about" },
  { name: "FAQ", href: "/#faq" },
];

export const metadata: Metadata = {
  title: "BPC-157 Joint & Mobility Chews | Puptides",
  description:
    "Premium BPC-157 dog treats for joint health, mobility, and recovery. Vet-reviewed, made in USA. Give your dog their best years back.",
};

export default function ProductsPage() {
  return (
    <>
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-stone-200 bg-stone-50/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav
            aria-label="Global"
            className="flex h-16 items-center justify-between"
          >
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="font-serif text-2xl text-stone-900">
                Puptides
              </span>
            </Link>
            <MobileNav />
            <div className="hidden lg:ml-12 lg:flex lg:gap-x-10">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-xs font-medium uppercase tracking-wider text-stone-600 transition-colors hover:text-stone-900"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="hidden lg:ml-auto lg:flex lg:items-center lg:gap-x-6" />
          </nav>
        </div>
      </header>

      <div className="bg-stone-50 pt-16">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-stone-500">
              <li>
                <Link href="/" className="hover:text-stone-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-stone-900">BPC-157 Joint &amp; Mobility Chews</li>
            </ol>
          </nav>

          {/* Product Grid */}
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Product Gallery */}
            <ProductGallery />

            {/* Product Details */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-[#C4A484]">
                  Puptides
                </p>
                <h1 className="mt-1 font-serif text-3xl text-stone-900 sm:text-4xl">
                  BPC-157 Joint &amp; Mobility Chews
                </h1>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex text-amber-400">
                    {"★★★★★".split("").map((star, i) => (
                      <span key={i} className="text-lg">{star}</span>
                    ))}
                  </div>
                  <span className="text-sm text-stone-500">4.9 (127 reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-semibold text-stone-900">$49.99</span>
                  <span className="text-lg text-stone-400 line-through">$64.99</span>
                  <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                    Save 23%
                  </span>
                </div>
                <p className="mt-1 text-sm text-stone-500">
                  As low as <span className="font-medium text-[#9CAF88]">$1.39/day</span> with the 90-chew pack
                </p>
              </div>

              {/* Key Benefits */}
              <div className="rounded-xl border border-stone-200 bg-white p-5">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-stone-900">
                  What it does
                </h3>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2.5 text-sm text-stone-700">
                    <span className="mt-0.5 text-green-500">✓</span>
                    <span><strong>Supports joint health &amp; mobility</strong> — helps maintain comfortable movement</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-stone-700">
                    <span className="mt-0.5 text-green-500">✓</span>
                    <span><strong>Promotes tissue recovery</strong> — supports your dog's natural healing processes</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-stone-700">
                    <span className="mt-0.5 text-green-500">✓</span>
                    <span><strong>Supports gut health</strong> — promotes digestive wellness and nutrient absorption</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-stone-700">
                    <span className="mt-0.5 text-green-500">✓</span>
                    <span><strong>Senior dog vitality</strong> — helps maintain energy and cognitive function in aging dogs</span>
                  </li>
                </ul>
              </div>

              {/* Size Selector + CTA */}
              <ProductPageClient />

              {/* Shipping info */}
              <div className="space-y-2 text-sm text-stone-500">
                <p className="flex items-center gap-2">
                  <span>🚚</span> Free shipping on orders over $50
                </p>
                <p className="flex items-center gap-2">
                  <span>🔄</span> 90-day satisfaction guarantee
                </p>
                <p className="flex items-center gap-2">
                  <span>📦</span> Ships within 1-2 business days
                </p>
              </div>
            </div>
          </div>

          {/* Product Details Sections */}
          <div className="mt-16 grid gap-12 lg:grid-cols-3">
            {/* How It Works */}
            <div className="rounded-2xl border border-stone-200 bg-white p-8">
              <h3 className="font-serif text-xl text-stone-900">How It Works</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                BPC-157 (Body Protection Compound-157) is a naturally occurring peptide 
                found in gastric juice. Our treats deliver a precise dose in a delicious 
                chicken-flavored chew your dog will love.
              </p>
              <ol className="mt-4 space-y-3">
                <li className="flex gap-3 text-sm text-stone-600">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C4A484] text-xs font-bold text-white">1</span>
                  Give one chew daily with food
                </li>
                <li className="flex gap-3 text-sm text-stone-600">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C4A484] text-xs font-bold text-white">2</span>
                  BPC-157 supports your dog's natural processes
                </li>
                <li className="flex gap-3 text-sm text-stone-600">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C4A484] text-xs font-bold text-white">3</span>
                  See improvements in mobility and vitality in 2-4 weeks
                </li>
              </ol>
            </div>

            {/* Ingredients */}
            <div className="rounded-2xl border border-stone-200 bg-white p-8">
              <h3 className="font-serif text-xl text-stone-900">Ingredients</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                Every ingredient is chosen for quality and your dog's safety.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-stone-600">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C4A484]" />
                  BPC-157 (Body Protection Compound)
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C4A484]" />
                  Chicken liver flavor
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C4A484]" />
                  Sweet potato
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C4A484]" />
                  Coconut oil
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C4A484]" />
                  Turmeric extract
                </li>
              </ul>
              <p className="mt-4 text-xs text-stone-400">
                No artificial colors, flavors, or preservatives. Grain-free. Soy-free. Seed oil-free.
              </p>
            </div>

            {/* Dosage */}
            <div className="rounded-2xl border border-stone-200 bg-white p-8">
              <h3 className="font-serif text-xl text-stone-900">Dosage Guide</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                Give as a daily treat. One chew per day based on your dog's weight.
              </p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-stone-50 px-4 py-2.5 text-sm">
                  <span className="text-stone-600">Small (under 25 lbs)</span>
                  <span className="font-medium text-stone-900">½ chew</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-stone-50 px-4 py-2.5 text-sm">
                  <span className="text-stone-600">Medium (25-50 lbs)</span>
                  <span className="font-medium text-stone-900">1 chew</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-stone-50 px-4 py-2.5 text-sm">
                  <span className="text-stone-600">Large (50-100 lbs)</span>
                  <span className="font-medium text-stone-900">1½ chews</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-stone-50 px-4 py-2.5 text-sm">
                  <span className="text-stone-600">XL (over 100 lbs)</span>
                  <span className="font-medium text-stone-900">2 chews</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof / Testimonials */}
          <div className="mt-16 mb-16">
            <h2 className="text-center font-serif text-3xl text-stone-900">
              What Dog Owners Are Saying
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-stone-200 bg-white p-6">
                <div className="flex text-amber-400">★★★★★</div>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  &ldquo;My 12-year-old Golden Retriever was struggling with stiff joints. After 3 weeks 
                  on Puptides, he&rsquo;s back to his morning walks and even playing fetch again. I can&rsquo;t 
                  believe the difference.&rdquo;
                </p>
                <p className="mt-4 text-sm font-medium text-stone-900">— Sarah J., Denver, CO</p>
                <p className="text-xs text-stone-400">Verified Buyer</p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-6">
                <div className="flex text-amber-400">★★★★★</div>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  &ldquo;Charlie had digestive issues and low energy for months. These chews 
                  transformed him — he&rsquo;s more active and his appetite is back to normal. 
                  Plus he goes crazy for the taste.&rdquo;
                </p>
                <p className="mt-4 text-sm font-medium text-stone-900">— Mike R., Austin, TX</p>
                <p className="text-xs text-stone-400">Verified Buyer</p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-6">
                <div className="flex text-amber-400">★★★★★</div>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  &ldquo;I was skeptical about peptide supplements for dogs, but seeing my 
                  10-year-old German Shepherd regain her mobility has made me a believer. 
                  She&rsquo;s like a different dog.&rdquo;
                </p>
                <p className="mt-4 text-sm font-medium text-stone-900">— Jennifer C., Seattle, WA</p>
                <p className="text-xs text-stone-400">Verified Buyer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductFooter />
    </>
  );
}
