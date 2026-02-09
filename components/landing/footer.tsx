import Link from "next/link";
import { DisclaimerBanner } from "components/layout/disclaimer-banner";

const helpLinks = [
  { name: "Treats", href: "/products" },
  { name: "FAQ", href: "/#faq" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms and Conditions", href: "/terms" },
];

const disclaimers = [
  "All product information available on this website is for educational purposes only.",
  "The statements made regarding these products have not been evaluated by the Food and Drug Administration.",
  "The efficacy of these products has not been confirmed by FDA-approved research.",
  "These products are not intended to diagnose, treat, cure or prevent any disease.",
];

export function Footer() {
  return (
    <>
      <DisclaimerBanner />
      <footer className="bg-[#1a2744] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Column 1 - Help */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Help
              </h3>
              <ul className="mt-4 space-y-3">
                {helpLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-stone-300 transition-colors hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 - Newsletter */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Newsletter
              </h3>
              <p className="mt-4 text-sm text-stone-300">
                Subscribe for dog health tips and product updates.
              </p>
              <form className="mt-4">
                <div className="flex flex-col gap-2">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="rounded-lg border border-stone-600 bg-stone-800 px-4 py-2 text-sm text-white placeholder-stone-400 focus:border-[#C4A484] focus:outline-none focus:ring-1 focus:ring-[#C4A484]"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-[#C4A484] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#B8997A]"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>

            {/* Column 3 - Disclaimers */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Disclaimers
              </h3>
              <ul className="mt-4 space-y-3">
                {disclaimers.map((disclaimer, index) => (
                  <li key={index} className="text-xs leading-relaxed text-stone-400">
                    {disclaimer}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Contact */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Contact
              </h3>
              <div className="mt-4 space-y-3 text-sm text-stone-300">
                <p>
                  <a
                    href="mailto:support@puptides.com"
                    className="transition-colors hover:text-white"
                  >
                    support@puptides.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 border-t border-stone-700 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <Link href="/" className="font-serif text-2xl text-white">
                Puptides
              </Link>
              <p className="text-sm text-stone-400">
                &copy; {new Date().getFullYear()} Puptides. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
