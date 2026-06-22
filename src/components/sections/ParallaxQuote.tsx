"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ParallaxBanner } from "@/components/ui/Parallax";

// Clean, staggered reveal — children rise in sequence once the band scrolls in.
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function ParallaxQuote() {
  return (
    <ParallaxBanner
      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2400&auto=format&fit=crop"
      alt="Open mountain road winding through the Himalayas"
      travel={120}
      className="my-8 rounded-none sm:my-12"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-3xl text-center text-cream"
      >
        <motion.p variants={item} className="eyebrow !text-saffron-300 justify-center">
          The road is calling
        </motion.p>

        <motion.h2
          variants={item}
          className="display-text mt-6 text-balance text-4xl text-white sm:text-5xl lg:text-6xl"
        >
          Every great journey begins with a comfortable seat.
        </motion.h2>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg"
        >
          Mountains, deserts, temples, coastlines — wherever North India leads,
          we make the ride there the easy part.
        </motion.p>

        <motion.div variants={item} className="mt-9">
          <Link
            href="/destinations"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-medium text-ink-900 shadow-2xl transition-all hover:-translate-y-0.5"
          >
            Explore destinations
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </ParallaxBanner>
  );
}
