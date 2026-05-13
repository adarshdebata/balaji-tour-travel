"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import { DESTINATIONS } from "@/data/destinations";

export function Destinations() {
  return (
    <section className="relative py-24 lg:py-32" id="destinations">
      <div className="container-padded">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="eyebrow">Destinations</div>
            <h2 className="display-text mt-6 text-4xl sm:text-5xl lg:text-6xl">
              The journeys we love to plan.
            </h2>
          </div>
          <Link
            href="/destinations"
            className="group inline-flex items-center gap-2 self-start font-medium text-saffron-700 sm:self-end"
          >
            View all destinations
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.slice(0, 6).map((dest, idx) => (
            <motion.article
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative overflow-hidden rounded-3xl bg-white ring-1 ring-ink-200/60 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/10 to-transparent" />

                <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-saffron-700 backdrop-blur">
                  {dest.region}
                </div>

                <div className="absolute inset-x-4 bottom-4 text-cream">
                  <h3 className="font-display text-3xl tracking-tight">
                    {dest.name}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm leading-relaxed text-ink-600">
                  {dest.shortDescription}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {dest.locations.slice(0, 4).map((loc) => (
                    <span
                      key={loc}
                      className="rounded-full bg-saffron-50 px-2.5 py-1 text-[11px] font-medium text-saffron-800"
                    >
                      {loc}
                    </span>
                  ))}
                  {dest.locations.length > 4 && (
                    <span className="rounded-full bg-ink-100 px-2.5 py-1 text-[11px] font-medium text-ink-700">
                      +{dest.locations.length - 4} more
                    </span>
                  )}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4">
                  <div className="flex items-center gap-4 text-xs text-ink-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {dest.bestTime}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {dest.duration}
                    </span>
                  </div>
                  <Link
                    href="/contact"
                    className="text-xs font-medium text-saffron-700 hover:text-saffron-800"
                  >
                    Enquire →
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
