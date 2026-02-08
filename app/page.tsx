import { Hero } from "components/landing/hero";
import { Features } from "components/landing/features";
import { Stats } from "components/landing/stats";
import { Testimonial } from "components/landing/testimonial";
import { FAQ } from "components/landing/faq";
import { CTA } from "components/landing/cta";
import { Footer } from "components/landing/footer";

export const metadata = {
  title: "Puptides — BPC-157 Dog Treats for Joint Health & Recovery",
  description:
    "Science-backed BPC-157 chews formulated specifically for dogs. Support your pet's joint health, tissue recovery, and overall vitality.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Stats />
      <Testimonial />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
