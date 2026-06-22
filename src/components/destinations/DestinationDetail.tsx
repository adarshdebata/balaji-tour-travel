"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { Destination } from "@/types";
import { ParallaxBg } from "@/components/ui/Parallax";
import { DestinationDetailBody } from "@/components/destinations/DestinationDetailBody";

/**
 * Immersive, deep-linkable destination page. The blurred image fills the
 * screen as a parallax backdrop, a crisp framed hero scales into place, and the
 * written details fade in afterwards — the same premium "card opens" feeling,
 * delivered as a full page.
 */
export function DestinationDetail({ destination }: { destination: Destination }) {
  return (
    <article>
      {/* Immersive hero with blurred parallax backdrop */}
      <section className="relative isolate overflow-hidden px-4 pb-12 pt-24 sm:px-6 lg:pt-28">
        <ParallaxBg
          src={destination.image}
          travel={70}
          blur
          priority
          overlayClassName="bg-gradient-to-b from-cream/55 via-cream/80 to-cream"
        />

        <div className="container-padded">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/destinations"
              className="group inline-flex items-center gap-2 text-sm font-medium text-ink-700 hover:text-saffron-700"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              All destinations
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-6 aspect-[16/10] w-full overflow-hidden rounded-[2rem] shadow-2xl sm:aspect-[5/2]"
          >
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              priority
              sizes="(min-width: 1280px) 1152px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="absolute inset-x-5 bottom-5 text-cream sm:inset-x-10 sm:bottom-10"
            >
              <div className="text-xs font-medium uppercase tracking-[0.22em] text-saffron-300">
                {destination.region}
              </div>
              <h1 className="display-text mt-2 text-4xl sm:text-6xl lg:text-7xl">
                {destination.name}
              </h1>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Details */}
      <section className="relative pb-24">
        <div className="container-padded">
          <DestinationDetailBody destination={destination} revealDelay={0.2} />
        </div>
      </section>
    </article>
  );
}
