import Link from "next/link";

const disclaimers = [
  "All product information available on this website is for educational purposes only.",
  "The statements made regarding these products have not been evaluated by the Food and Drug Administration.",
  "The efficacy of these products has not been confirmed by FDA-approved research.",
  "These products are not intended to diagnose, treat, cure or prevent any disease.",
];

export function ProductFooter() {
  return (
    <>
      {/* FDA Disclaimer */}
      <div className="border-t border-stone-200 bg-stone-100 px-6 py-4 text-center text-xs text-stone-400">
        These statements have not been evaluated by the FDA. This product is not intended
        to diagnose, treat, cure, or prevent any disease. Consult your veterinarian before use.
      </div>

      <footer className="bg-[#1a2744] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Column 1 - About */}
            <div>
              <Link href="/" className="font-serif text-2xl text-white">
                Puptides
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-stone-300">
                Science-backed BPC-157 dog treats for joint health, mobility, and
                recovery. Premium peptide supplements designed for your dog&rsquo;s
                wellness.
              </p>
            </div>

            {/* Column 2 - Links */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/products" className="text-sm text-stone-300 transition-colors hover:text-white">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href="/#benefits" className="text-sm text-stone-300 transition-colors hover:text-white">
                    Research
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="text-sm text-stone-300 transition-colors hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-stone-300 transition-colors hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-stone-300 transition-colors hover:text-white">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
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
          </div>

          {/* Contact */}
          <div className="mt-8 border-t border-stone-700 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-sm text-stone-400">
                Questions? <a href="mailto:support@puptides.com" className="text-stone-300 hover:text-white transition-colors">support@puptides.com</a>
              </p>
              <p className="text-sm text-stone-400">
                &copy; {new Date().getFullYear()} Puptides. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
