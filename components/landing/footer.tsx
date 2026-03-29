import Link from "next/link";
import { DisclaimerBanner } from "components/layout/disclaimer-banner";
import { WaitlistForm } from "./waitlist-form";

const helpLinks = [
  { name: "Science", href: "/#benefits" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "FAQ", href: "/#faq" },
];

const disclaimers = [
  "Long Companion Labs provides veterinary telehealth services. All treatments are prescribed by licensed veterinarians.",
  "Compounded medications are prepared by licensed pharmacies in accordance with applicable regulations.",
  "Individual results may vary. Consult your veterinarian for medical advice specific to your pet.",
];

export function Footer() {
  return (
    <>
      <DisclaimerBanner />
      <footer className="bg-[#1a2744] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Column 1 - Navigation */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Navigate
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

            {/* Column 2 - Waitlist */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Get Early Access
              </h3>
              <p className="mt-4 text-sm text-stone-300">
                Be the first to know when we launch.
              </p>
              <WaitlistForm position="footer" variant="footer" />
            </div>

            {/* Column 3 - Disclaimers */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Disclaimers
              </h3>
              <ul className="mt-4 space-y-3">
                {disclaimers.map((disclaimer, index) => (
                  <li
                    key={index}
                    className="text-xs leading-relaxed text-stone-400"
                  >
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
                    href="mailto:hello@longcompanionlabs.com"
                    className="transition-colors hover:text-white"
                  >
                    hello@longcompanionlabs.com
                  </a>
                </p>
                <p>
                  <a
                    href="https://instagram.com/longcompanionlabs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    @longcompanionlabs
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 border-t border-stone-700 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <Link href="/" className="font-serif text-2xl text-white">
                Long Companion Labs
              </Link>
              <p className="text-sm text-stone-400">
                &copy; {new Date().getFullYear()} Long Companion Labs. All
                rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
