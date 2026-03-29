import { Hero } from "components/landing/hero";
import { Problem } from "components/landing/problem";
import { Features } from "components/landing/features";
import { Stats } from "components/landing/stats";
import { Comparison } from "components/landing/comparison";
import { FAQ } from "components/landing/faq";
import { CTA } from "components/landing/cta";
import { Footer } from "components/landing/footer";
import { HomepageTracking } from "components/landing/tracking";

export const metadata = {
  title: "Long Companion Labs — Science-Backed Pet Longevity",
  description:
    "Helping senior dogs live longer, better lives through veterinary telehealth and compounded peptide therapy.",
};

export default function HomePage() {
  return (
    <>
      <HomepageTracking />
      <Hero />
      <Problem />
      <Features />
      <Stats />
      <Comparison />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
