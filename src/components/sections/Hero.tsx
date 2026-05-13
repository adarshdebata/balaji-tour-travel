"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Sparkles } from "lucide-react";
import { CONTACT } from "@/constants/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-8 pb-24 lg:pt-12 lg:pb-32">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-32 -right-20 h-[480px] w-[480px] rounded-full bg-gradient-to-br from-saffron-300 to-crimson-400 opacity-30 blur-3xl" />
        <div className="absolute top-1/3 -left-40 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-amber-200 to-saffron-300 opacity-30 blur-3xl" />
        {/* Faint travel-poster grid */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hero-grid"
              width="64"
              height="64"
              patternUnits="userSpaceOnUse"
            >
              <path d="M64 0L0 0 0 64" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="container-padded">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left: Copy */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow"
            >
              <Sparkles className="h-3 w-3" />
              25+ years of trusted travel
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="display-text mt-6 text-5xl sm:text-6xl lg:text-[5.5rem]"
            >
              Unveiling{" "}
              <span className="text-gradient-saffron italic">Luxury</span>,
              <br />
              Crafting{" "}
              <span className="relative inline-block">
                <span className="text-gradient-saffron italic">Journeys</span>
                <svg
                  className="absolute -bottom-3 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 Q 75 2, 150 6 T 298 5"
                    stroke="rgb(255 126 21)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
              .
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-8 max-w-xl text-base leading-relaxed text-ink-600 sm:text-lg"
            >
              Premium Tempo Traveller, SUV, and Luxury Coach rentals across
              Delhi NCR. Family tours, corporate offsites, pilgrimages, and
              wedding logistics — handled the way North India's most discerning
              travellers expect.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <Link href="/contact" className="btn-primary">
                Book Now
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact Us
              </Link>
              <a
                href={`tel:${CONTACT.phonePrimary.replace(/\s/g, "")}`}
                className="btn-ghost"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 flex items-center gap-6 text-xs uppercase tracking-[0.2em] text-ink-500"
            >
              <span>Tempo Traveller</span>
              <span className="h-1 w-1 rounded-full bg-ink-400" />
              <span>SUV Rentals</span>
              <span className="h-1 w-1 rounded-full bg-ink-400" />
              <span>Luxury Coaches</span>
            </motion.div>
          </div>

          {/* Right: Visual collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:col-span-5"
          >
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto">
              {/* Main image card */}
              <div className="absolute inset-x-0 top-0 aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-white/40">
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80")`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent" />
              </div>

              {/* Floating stat card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-6 bottom-12 w-56 rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-ink-200/60"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-saffron-700">
                  Happy travellers
                </p>
                <p className="mt-2 font-display text-3xl text-ink-900">
                  12,000+
                </p>
                <div className="mt-3 flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-7 w-7 rounded-full ring-2 ring-white"
                      style={{
                        background: `linear-gradient(135deg, hsl(${20 + i * 15}, 80%, 60%), hsl(${10 + i * 10}, 70%, 50%))`,
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 top-12 rounded-full bg-ink-950 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-cream shadow-xl"
              >
                Delhi NCR
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
