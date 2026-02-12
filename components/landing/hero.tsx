import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "./mobile-nav";
import { TrackedCTA } from "./tracking";

const navigation = [
  { name: "TREATS", href: "/products" },
  { name: "RESEARCH", href: "#benefits" },
  { name: "QUALITY", href: "#about" },
  { name: "FAQ", href: "#faq" },
];

export function Hero() {
  return (
    <div className="bg-stone-50">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-stone-200 bg-stone-50/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav
            aria-label="Global"
            className="flex h-16 items-center justify-between"
          >
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Puptides</span>
              <span className="font-serif text-2xl text-stone-900">
                Puptides
              </span>
            </Link>

            {/* Mobile menu - client component */}
            <MobileNav />

            {/* Desktop nav */}
            <div className="hidden lg:ml-12 lg:flex lg:gap-x-10">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-xs font-medium uppercase tracking-wider text-stone-600 transition-colors hover:text-stone-900"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden lg:ml-auto lg:flex lg:items-center lg:gap-x-6">
              <TrackedCTA
                href="/products"
                event="homepage_cta_clicked"
                position="nav"
                className="rounded-full bg-[#C4A484] px-5 py-2 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-[#B8997A]"
              >
                Try Puptides Risk-Free
              </TrackedCTA>
            </div>
          </nav>
        </div>
      </header>

      <div className="relative pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid min-h-[85vh] items-center lg:grid-cols-2">
            {/* Left content */}
            <div className="px-6 py-20 lg:px-8 lg:py-32">
              <div className="mx-auto max-w-xl lg:mx-0">
                <h1 className="font-serif text-5xl tracking-tight text-stone-900 sm:text-6xl lg:text-7xl">
                  Watch Your Dog
                  <br />
                  Move Like a<br />
                  Puppy Again
                </h1>
                <p className="mt-8 text-lg text-stone-600">
                  A daily treat backed by 100+ studies that supports joint
                  recovery, gut health, and mobility in aging dogs. No pills.
                  No vet visits. Just a chew they'll love.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link
                    href="#benefits"
                    className="rounded-full border border-stone-300 px-6 py-3 text-sm font-medium uppercase tracking-wider text-stone-900 transition-colors hover:bg-stone-100"
                  >
                    See How It Works
                  </Link>
                  <TrackedCTA
                    href="/products"
                    event="homepage_cta_clicked"
                    position="hero"
                    className="rounded-full bg-[#C4A484] px-6 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-[#B8997A]"
                  >
                    Try Puptides Risk-Free
                  </TrackedCTA>
                </div>
              </div>
            </div>

            {/* Right image */}
            <div className="relative flex h-[50vh] items-end lg:h-full">
              <Image
                alt="Golden retriever running through sunlit grass"
                src="/hero.png"
                fill
                priority
                className="object-cover object-[center_30%]"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-50/20 to-transparent lg:bg-gradient-to-r lg:from-stone-50/40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
