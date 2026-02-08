import { CTA } from "components/landing/cta";
import { FAQ } from "components/landing/faq";
import { Features } from "components/landing/features";
import { Footer } from "components/landing/footer";
import { Hero } from "components/landing/hero";
import { Stats } from "components/landing/stats";
import { Testimonial } from "components/landing/testimonial";

export const metadata = {
  title: "Puptides | BPC-157 Dog Treats for Health & Recovery",
  description:
    "Science-backed BPC-157 dog treats for joint health, mobility, and recovery. Premium peptide supplements designed for your dog's wellness and vitality.",
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
