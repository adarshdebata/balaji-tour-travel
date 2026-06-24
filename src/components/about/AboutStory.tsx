"use client";

import { motion, type Variants } from "framer-motion";
import { ParallaxBg } from "@/components/ui/Parallax";

/** India Gate at dusk — Delhi NCR, the home base. */
const DELHI =
  "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1600&auto=format&fit=crop";
/** An expressway threading through Noida — where the company began. */
const NOIDA =
  "https://images.unsplash.com/photo-1661858435242-ed971767e954?q=80&w=1400&auto=format&fit=crop";

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

function Frame({
  src,
  alt,
  caption,
  className,
}: {
  src: string;
  alt: string;
  caption: string;
  className?: string;
}) {
  return (
    <motion.figure
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={`relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-ink-200/50 dark:ring-white/10 ${className ?? ""}`}
    >
      <ParallaxBg
        src={src}
        alt={alt}
        travel={70}
        sizes="(min-width: 1024px) 45vw, 100vw"
        overlayClassName="bg-gradient-to-t from-ink-950/75 via-ink-950/10 to-transparent"
      />
      <figcaption className="absolute bottom-5 left-5 z-10 rounded-full bg-black/40 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-cream backdrop-blur">
        {caption}
      </figcaption>
    </motion.figure>
  );
}

export function AboutStory() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container-padded">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="eyebrow justify-center">Our story</div>
          <h2 className="display-text mt-5 text-4xl sm:text-5xl lg:text-6xl">
            A Noida garage, one rented coach, and a stubborn idea.
          </h2>
        </motion.div>

        {/* Row 1 — Noida, where it began */}
        <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Frame
            src={NOIDA}
            alt="An expressway threading through Noida's skyline at dawn"
            caption="Noida — where it began, 2000"
          />
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-5 text-base leading-relaxed text-ink-700 dark:text-ink-300 sm:text-lg"
          >
            <p>
              Before app cabs and instant bookings, founder Shri Vinod Sharma
              noticed something simple: groups leaving Delhi NCR were being
              short-changed — tired coaches, surly drivers, and surprise
              surcharges at journey&apos;s end.
            </p>
            <p>
              So he started a one-vehicle operation out of a small Noida garage,
              with a single Tempo Traveller and one rule:{" "}
              <span className="font-medium text-ink-900 dark:text-cream">
                Do every trip the way you&apos;d want your own family treated.
              </span>{" "}
              That rule still runs the company.
            </p>
          </motion.div>
        </div>

        {/* Row 2 — Delhi NCR, home base */}
        <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="order-2 space-y-5 text-base leading-relaxed text-ink-700 dark:text-ink-300 sm:text-lg lg:order-1"
          >
            <p>
              Twenty-five years on, the fleet is 80+ vehicles and we move more
              than 12,000 travellers a year — yet the ethos hasn&apos;t budged.
              Honest pricing. Vehicles that arrive early. Drivers who carry the
              bags. Phones that get answered.
            </p>
            <p>
              From Delhi&apos;s monuments to Char Dham, Spiti, and Rajasthan&apos;s
              forts, the destination changes. The standard doesn&apos;t.
            </p>
          </motion.div>
          <Frame
            src={DELHI}
            alt="India Gate, New Delhi, glowing under a dusk sky"
            caption="Delhi NCR — home base"
            className="order-1 lg:order-2"
          />
        </div>
      </div>
    </section>
  );
}
