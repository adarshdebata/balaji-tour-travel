"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Introduction() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container-padded">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="eyebrow">About Balaji Travels</div>
            <h2 className="display-text mt-6 text-4xl sm:text-5xl lg:text-6xl">
              A quarter century of moving people, carefully.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 lg:pl-8"
          >
            <p className="text-lg leading-relaxed text-ink-700">
              Since 2000, Balaji Tour &amp; Travel Line has been Delhi NCR&apos;s
              trusted partner for group travel. What began as a small Tempo
              Traveller service has grown into a fleet of 80+ vehicles — every
              one of them maintained, inspected, and ready for the road.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-ink-700">
              We move families on Char Dham yatras, corporate teams to
              Himalayan offsites, weddings across Rajasthan, and college groups
              through Spiti. The job is the same every time: get people there
              safely, comfortably, and on schedule. Twenty-five years in, we
              still treat each booking like our first.
            </p>

            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-2 font-medium text-saffron-700"
            >
              Read our full story
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
