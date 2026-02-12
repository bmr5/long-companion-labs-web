import { Hero } from "components/landing/hero";
import { Problem } from "components/landing/problem";
import { Features } from "components/landing/features";
import { Testimonial } from "components/landing/testimonial";
import { Stats } from "components/landing/stats";
import { Comparison } from "components/landing/comparison";
import { FAQ } from "components/landing/faq";
import { CTA } from "components/landing/cta";
import { Footer } from "components/landing/footer";
import { HomepageTracking } from "components/landing/tracking";

export const metadata = {
  title: "Puptides — BPC-157 Dog Treats for Joint Health & Recovery",
  description:
    "Science-backed BPC-157 chews formulated specifically for dogs. Support your pet's joint health, tissue recovery, and overall vitality.",
};

export default function HomePage() {
  return (
    <>
      <HomepageTracking />
      <Hero />
      <Problem />
      <Features />
      <Testimonial />
      <Stats />
      <Comparison />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
