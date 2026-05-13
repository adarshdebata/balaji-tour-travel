"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { CONTACT } from "@/constants/site";

export function FinalCTA() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container-padded">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative isolate overflow-hidden rounded-[3rem] bg-gradient-to-br from-saffron-600 via-crimson-600 to-saffron-700 px-8 py-20 text-center sm:px-16 lg:px-24"
        >
          {/* Decorative pattern */}
          <svg
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full opacity-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="cta-pattern"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="20" cy="20" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-pattern)" />
          </svg>

          {/* Glow accents */}
          <div className="absolute -top-32 left-1/4 h-64 w-64 rounded-full bg-yellow-300 opacity-30 blur-3xl" />
          <div className="absolute -bottom-32 right-1/4 h-64 w-64 rounded-full bg-pink-400 opacity-20 blur-3xl" />

          <div className="relative">
            <p className="eyebrow !text-white/90 justify-center">
              Ready to roll
            </p>

            <h2 className="display-text mx-auto mt-6 max-w-4xl text-balance text-4xl text-white sm:text-5xl lg:text-7xl">
              Book your Tempo Traveller on rent in Delhi NCR today.
            </h2>

            <p className="mx-auto mt-8 max-w-xl text-lg text-white/85">
              One call, one quote, one trip handled end-to-end. We&apos;ll get
              you on the road in 24 hours or less.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-medium text-ink-900 shadow-2xl transition-all hover:-translate-y-0.5"
              >
                Get a Free Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={`tel:${CONTACT.phonePrimary.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-7 py-3.5 font-medium text-white backdrop-blur transition-all hover:bg-white/20"
              >
                <Phone className="h-4 w-4" />
                {CONTACT.phonePrimary}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
