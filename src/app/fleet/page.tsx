import Link from "next/link";
import { Bus, Car, Crown, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { VEHICLES } from "@/data/vehicles";

const CATEGORIES = [
  {
    slug: "suv",
    name: "SUV",
    icon: Car,
    description: "Premium SUVs for small families, couples, and executive travel.",
    href: "/fleet/suv",
  },
  {
    slug: "tempo-traveller",
    name: "Tempo Traveller",
    icon: Bus,
    description: "Our signature segment — 12, 17, and 20-seater coaches for group tours.",
    href: "/fleet/tempo-traveller",
  },
  {
    slug: "luxury-coaches",
    name: "Luxury Coaches",
    icon: Crown,
    description: "30 to 45-seater Volvo-class coaches for weddings and corporate offsites.",
    href: "/fleet/luxury-coaches",
  },
];

export const metadata = {
  title: "Our Fleet",
  description:
    "Explore our complete fleet of SUVs, Tempo Travellers, and Luxury Coaches — maintained and ready for the road.",
};

export default function FleetPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Fleet"
        title="Every kind of journey, every kind of vehicle."
        description="From a 6-seater SUV to a 45-seater Volvo coach — 80+ vehicles, all maintained to the same standard."
      />

      <section className="pb-16">
        <div className="container-padded">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {CATEGORIES.map(({ slug, name, icon: Icon, description, href }) => {
              const count = VEHICLES.filter((v) => v.category === slug).length;
              return (
                <Link
                  key={slug}
                  href={href}
                  className="group relative overflow-hidden rounded-3xl bg-white p-8 ring-1 ring-ink-200/60 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
                >
                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-saffron-100 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-saffron-500 to-crimson-600 text-white shadow-lg shadow-saffron-500/30">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h2 className="mt-6 font-display text-3xl text-ink-900">
                      {name}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink-600">
                      {description}
                    </p>

                    <div className="mt-8 flex items-center justify-between border-t border-ink-100 pt-5">
                      <span className="text-xs uppercase tracking-[0.2em] text-saffron-700">
                        {count} vehicle{count > 1 ? "s" : ""}
                      </span>
                      <ArrowRight className="h-5 w-5 text-saffron-700 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
