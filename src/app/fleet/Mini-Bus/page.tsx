import Link from "next/link";
import { Phone } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { VehicleCard } from "@/components/ui/VehicleCard";
import { getVehiclesByCategory } from "@/data/vehicles";
import { CONTACT } from "@/constants/site";

export const metadata = {
  title: "Mini Bus Fleet",
  description:
    "Air-conditioned mini buses for wedding baraats, school and college trips, pilgrimages, and staff transport across Delhi NCR.",
};

export default function MiniBusFleetPage() {
  // Add vehicles with category "Mini-Bus" in src/data/vehicles.ts and they
  // replace the on-request panel below automatically.
  const vehicles = getVehiclesByCategory("Mini-Bus");

  return (
    <>
      <PageHeader
        eyebrow="Our Fleet · Mini Bus"
        title="Room for the whole group, none of the fuss."
        description="The step up from a Tempo Traveller — for baraats, school trips, pilgrimages, and staff runs."
      />

      <section className="pb-24">
        <div className="container-padded">
          {vehicles.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {vehicles.map((v, i) => (
                <VehicleCard key={v.id} vehicle={v} index={i} />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-2xl rounded-3xl bg-white p-10 text-center ring-1 ring-ink-200/60 shadow-sm dark:bg-ink-900 dark:ring-white/10">
              <p className="eyebrow justify-center">Available on request</p>
              <h2 className="mt-5 font-display text-3xl text-ink-900 dark:text-cream">
                Tell us the date and the headcount.
              </h2>
              <p className="mt-4 text-ink-600 dark:text-ink-300">
                Mini buses are allotted per trip. Share your route and group size
                and we&apos;ll confirm the right vehicle and a quote.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="btn-primary">
                  Get a Quote
                </Link>
                <a
                  href={`tel:${CONTACT.phonePrimary.replace(/\s/g, "")}`}
                  className="btn-ghost"
                >
                  <Phone className="h-4 w-4" />
                  {CONTACT.phonePrimary}
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
