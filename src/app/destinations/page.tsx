import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DESTINATIONS } from "@/data/destinations";

export const metadata = {
  title: "Destinations",
  description: "Curated travel destinations across North India — Rajasthan, Himachal, Kashmir, Char Dham, Uttarakhand, and more.",
};

export default function DestinationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Destinations"
        title="Six journeys, one trusted partner."
        description="From royal Rajasthan to the high Himalayas — destinations we know inside out, every season."
      />

      <section className="pb-24">
        <div className="container-padded">
          <div className="space-y-8 lg:space-y-16">
            {DESTINATIONS.map((dest, idx) => (
              <article
                key={dest.id}
                className={`grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 ${
                  idx % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:col-span-7">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                <div className="lg:col-span-5 lg:flex lg:flex-col lg:justify-center">
                  <div className="eyebrow">{dest.region}</div>
                  <h2 className="display-text mt-4 text-4xl sm:text-5xl">
                    {dest.name}
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-ink-700">
                    {dest.shortDescription}
                  </p>

                  <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-ink-100 py-5 text-sm">
                    <div>
                      <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-ink-500">
                        <Calendar className="h-3.5 w-3.5" /> Best time
                      </dt>
                      <dd className="mt-1 font-medium text-ink-900">{dest.bestTime}</dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-ink-500">
                        <Clock className="h-3.5 w-3.5" /> Duration
                      </dt>
                      <dd className="mt-1 font-medium text-ink-900">{dest.duration}</dd>
                    </div>
                  </dl>

                  <div className="mt-5">
                    <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-ink-500">
                      <MapPin className="h-3.5 w-3.5" /> Locations covered
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {dest.locations.map((loc) => (
                        <span
                          key={loc}
                          className="rounded-full bg-saffron-50 px-2.5 py-1 text-xs font-medium text-saffron-800"
                        >
                          {loc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link href="/contact" className="btn-primary mt-8 self-start">
                    Plan this trip
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
