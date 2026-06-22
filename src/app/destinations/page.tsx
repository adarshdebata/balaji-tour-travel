import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ParallaxBanner } from "@/components/ui/Parallax";
import { DestinationsExplorer } from "@/components/destinations/DestinationsExplorer";
import { DESTINATIONS } from "@/data/destinations";

export const metadata = {
  title: "Destinations",
  description:
    "Curated travel destinations across North India — Rajasthan, Himachal, Kashmir, Char Dham, Uttarakhand, and more. Tap any destination to explore the full journey.",
};

export default function DestinationsPage() {
  return (
    <>
      <PageHeader
        eyebrow={`${DESTINATIONS.length} Signature Journeys`}
        title="Six journeys, one trusted partner."
        description="From royal Rajasthan to the high Himalayas — tap a destination to open the full story, highlights, and pricing, then glide between them."
      />

      <section className="pb-20 sm:pb-24">
        <div className="container-padded">
          <DestinationsExplorer destinations={DESTINATIONS} />
        </div>
      </section>

      {/* Premium parallax CTA band */}
      <section className="pb-24">
        <div className="container-padded">
          <ParallaxBanner
            src="https://images.unsplash.com/photo-1565459667879-4c7234fc4beb?q=80&w=2400&auto=format&fit=crop"
            alt="Himalayan valley road"
            className="overflow-hidden rounded-[2.5rem]"
            minHeight="min-h-[44vh] sm:min-h-[52vh]"
          >
            <div className="mx-auto max-w-2xl text-center text-cream">
              <p className="eyebrow !text-saffron-300 justify-center">Not sure where to begin?</p>
              <h2 className="display-text mt-5 text-balance text-3xl text-white sm:text-5xl">
                Tell us your dates. We&apos;ll craft the route.
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-base text-cream/85">
                Every journey is tailored — vehicle, stops, and pace built around
                your group. One call is all it takes.
              </p>
              <Link
                href="/contact"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-medium text-ink-900 shadow-2xl transition-transform hover:-translate-y-0.5"
              >
                Plan my trip
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ParallaxBanner>
        </div>
      </section>
    </>
  );
}
