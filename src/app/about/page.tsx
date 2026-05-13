import Image from "next/image";
import { Award, Compass, Heart, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Stats } from "@/components/sections/Stats";

export const metadata = {
  title: "About Us",
  description:
    "25+ years of moving travellers across North India. Family-run, fleet-strong, and obsessed with getting the details right.",
};

const VALUES = [
  {
    icon: Heart,
    title: "Family-run since day one",
    body: "Started in 2000 with a single Tempo Traveller, run today by the same family. The phone you call is still answered by someone who knows the business top to bottom.",
  },
  {
    icon: ShieldCheck,
    title: "Safety isn't a slogan",
    body: "Every vehicle passes a daily checklist before it leaves the yard. Tyres, brakes, fluids, AC, lights — all logged. The maintenance budget is roughly twice the industry average, and that's on purpose.",
  },
  {
    icon: Award,
    title: "Drivers we'd send our own family with",
    body: "Verified background, route-trained, and tested on mountain roads before they take on Himalayan trips. Most of our drivers have been with us for over a decade.",
  },
  {
    icon: Compass,
    title: "We know the routes",
    body: "Char Dham detours during landslide season. The right dhaba on the Jaipur highway. The shortcut into Manali that saves an hour. Two and a half decades of road knowledge, baked in.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Balaji Travels"
        title="The travel partner Delhi NCR has trusted for 25 years."
        description="A family business that grew quietly, one happy traveller at a time."
      />

      <section className="py-12 lg:py-20">
        <div className="container-padded">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl lg:col-span-5">
              <Image
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80"
                alt="Mountain travel"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
            </div>

            <div className="lg:col-span-7">
              <div className="eyebrow">Our story</div>
              <h2 className="display-text mt-5 text-4xl sm:text-5xl">
                A small Noida garage, one rented coach, and a stubborn idea.
              </h2>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-700">
                <p>
                  In the year 2000, before app-based cabs and online bookings,
                  founder Shri Vinod Sharma noticed something simple: groups
                  travelling out of Delhi NCR were being short-changed.
                  Unreliable coaches, surly drivers, surprise fuel surcharges
                  at the end of the trip. The standard was low because nobody
                  was raising it.
                </p>
                <p>
                  So he started a one-vehicle operation in a small Noida
                  garage, with a single Tempo Traveller and one rule: do every
                  trip the way you&apos;d want your own family to be treated.
                  That rule still runs the company.
                </p>
                <p>
                  Twenty-five years later, the fleet has grown to 80+ vehicles
                  and we move more than 12,000 travellers a year — but the
                  ethos is the same. Honest pricing. Vehicles that arrive
                  early. Drivers who carry the bags. Phones that get answered.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-20">
        <div className="container-padded">
          <div className="max-w-2xl">
            <div className="eyebrow">What we stand for</div>
            <h2 className="display-text mt-5 text-4xl sm:text-5xl">
              Four principles, lived daily.
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {VALUES.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-3xl bg-white p-8 ring-1 ring-ink-200/60 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-saffron-100 text-saffron-700">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-display text-2xl text-ink-900">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Stats />
    </>
  );
}
