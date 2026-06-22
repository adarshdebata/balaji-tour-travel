import { Hero } from "@/components/sections/Hero";
import { Introduction } from "@/components/sections/Introduction";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Stats } from "@/components/sections/Stats";
import { ParallaxQuote } from "@/components/sections/ParallaxQuote";
import { AirportTransfer } from "@/components/sections/AirportTransfer";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <WhyChooseUs />
      <Stats />
      <ParallaxQuote />
      <AirportTransfer />
      <FinalCTA />
    </>
  );
}
