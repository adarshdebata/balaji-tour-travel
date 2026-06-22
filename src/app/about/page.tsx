import { AboutHero } from "@/components/about/AboutHero";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutValues } from "@/components/about/AboutValues";
import { Stats } from "@/components/sections/Stats";

export const metadata = {
  title: "About Us",
  description:
    "25+ years of moving travellers across North India. Family-run, fleet-strong, and obsessed with getting the details right.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <Stats />
    </>
  );
}
