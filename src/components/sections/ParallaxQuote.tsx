"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ParallaxBanner } from "@/components/ui/Parallax";

export function ParallaxQuote() {
  return (
    <ParallaxBanner
      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2400&auto=format&fit=crop"
      alt="Open mountain road winding through the Himalayas"
      className="my-8 rounded-none sm:my-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-3xl text-center text-cream"
      >
        <p className="eyebrow !text-saffron-300 justify-center">The road is calling</p>
        <h2 className="display-text mt-6 text-balance text-4xl text-white sm:text-5xl lg:text-6xl">
          Every great journey begins with a single, comfortable seat.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
          Mountains, deserts, temples, coastlines — wherever North India takes
          you, we make sure the ride there is the easy part.
        </p>
        <Link
          href="/destinations"
          className="group mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-medium text-ink-900 shadow-2xl transition-all hover:-translate-y-0.5"
        >
          Explore destinations
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </ParallaxBanner>
  );
}
