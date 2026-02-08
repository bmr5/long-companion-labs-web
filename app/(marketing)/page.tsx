import { CTA } from "components/landing/cta";
import { FAQ } from "components/landing/faq";
import { Features } from "components/landing/features";
import { Footer } from "components/landing/footer";
import { Hero } from "components/landing/hero";
import { Stats } from "components/landing/stats";
import { Testimonial } from "components/landing/testimonial";

export const metadata = {
  title: "Genesis Peptides | Premium Research Peptides",
  description:
    "High-purity research peptides for scientific study. Every compound verified through rigorous HPLC testing with certificates of analysis.",
};

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <Testimonial />
      <Stats />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
