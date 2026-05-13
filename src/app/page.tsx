import { Hero } from "@/components/sections/Hero";
import { Introduction } from "@/components/sections/Introduction";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Stats } from "@/components/sections/Stats";
import { Destinations } from "@/components/sections/Destinations";
import { EnquiryEstimator } from "@/components/sections/EnquiryEstimator";
import { Testimonials } from "@/components/sections/Testimonials";
import { AirportTransfer } from "@/components/sections/AirportTransfer";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <WhyChooseUs />
      <Stats />
      <Destinations />
      <EnquiryEstimator />
      <Testimonials />
      <AirportTransfer />
      <FinalCTA />
    </>
  );
}
