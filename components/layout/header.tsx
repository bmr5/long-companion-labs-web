import Link from "next/link";
import { MobileNav } from "components/landing/mobile-nav";

const navigation = [
  { name: "BPC-157 SCIENCE", href: "/science" },
  { name: "HOW IT WORKS", href: "/how-it-works" },
  { name: "ABOUT", href: "/about" },
  { name: "LEARN", href: "/learn" },
  { name: "FAQ", href: "/faq" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-stone-200 bg-stone-50/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <nav
          aria-label="Global"
          className="flex h-16 items-center justify-between"
        >
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Long Companion Labs</span>
            <span className="font-serif text-2xl text-stone-900">
              Long Companion Labs
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
          <div className="hidden lg:ml-auto lg:flex lg:items-center lg:gap-x-6">
            <Link
              href="#guide"
              className="rounded-full bg-[#0D7377] px-5 py-2 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-[#0A5C5F]"
            >
              Free Longevity Guide
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
