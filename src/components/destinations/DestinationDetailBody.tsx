"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Calendar, Check, Clock, IndianRupee, MapPin, Phone } from "lucide-react";
import type { Destination } from "@/types";
import { CONTACT } from "@/constants/site";
import { formatPrice } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  show: (delay: number = 0) => ({
    transition: { delayChildren: delay, staggerChildren: 0.08 },
  }),
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * The written content of a destination — fades/staggers in. `revealDelay` lets
 * the caller hold it back until an expand/entrance animation has finished, so
 * the details appear *after* the image settles.
 */
export function DestinationDetailBody({
  destination,
  revealDelay = 0,
}: {
  destination: Destination;
  revealDelay?: number;
}) {
  const tel = `tel:${CONTACT.phonePrimary.replace(/\s/g, "")}`;

  return (
    <motion.div
      variants={container}
      custom={revealDelay}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-3xl"
    >
      <motion.div variants={item} className="eyebrow">
        {destination.region}
      </motion.div>

      <motion.div variants={item} className="mt-6 space-y-5">
        {destination.longDescription.map((para, i) => (
          <p key={i} className="text-lg leading-relaxed text-ink-700 dark:text-ink-300">
            {para}
          </p>
        ))}
      </motion.div>

      {/* Meta */}
      <motion.dl
        variants={item}
        className="mt-8 grid grid-cols-2 gap-4 rounded-2xl bg-saffron-50/70 p-5 ring-1 ring-saffron-100 dark:bg-white/5 dark:ring-white/10 sm:grid-cols-3"
      >
        <div>
          <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
            <Calendar className="h-3.5 w-3.5" /> Best time
          </dt>
          <dd className="mt-1 font-medium text-ink-900 dark:text-cream">{destination.bestTime}</dd>
        </div>
        <div>
          <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
            <Clock className="h-3.5 w-3.5" /> Duration
          </dt>
          <dd className="mt-1 font-medium text-ink-900 dark:text-cream">{destination.duration}</dd>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
            <IndianRupee className="h-3.5 w-3.5" /> Starts from
          </dt>
          <dd className="mt-1 font-medium text-ink-900 dark:text-cream">
            {formatPrice(destination.priceFrom)}
            <span className="text-xs font-normal text-ink-500 dark:text-ink-400"> / group</span>
          </dd>
        </div>
      </motion.dl>

      {/* Highlights */}
      <motion.div variants={item} className="mt-10">
        <h3 className="font-display text-2xl text-ink-900 dark:text-cream">Trip highlights</h3>
        <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {destination.highlights.map((h) => (
            <li key={h} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-saffron-100 text-saffron-700 dark:bg-saffron-500/15 dark:text-saffron-300">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm leading-relaxed text-ink-700 dark:text-ink-300">{h}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Locations */}
      <motion.div variants={item} className="mt-10">
        <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
          <MapPin className="h-3.5 w-3.5" /> Locations covered
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {destination.locations.map((loc) => (
            <span
              key={loc}
              className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-saffron-800 ring-1 ring-saffron-100 dark:bg-white/5 dark:text-saffron-300 dark:ring-white/10"
            >
              {loc}
            </span>
          ))}
        </div>
      </motion.div>

      {/* CTAs */}
      <motion.div variants={item} className="mt-10 flex flex-wrap gap-3">
        <Link href="/contact" className="btn-primary">
          Plan this trip
          <ArrowRight className="h-4 w-4" />
        </Link>
        <a href={tel} className="btn-ghost">
          <Phone className="h-4 w-4" />
          Call to customise
        </a>
      </motion.div>
    </motion.div>
  );
}
