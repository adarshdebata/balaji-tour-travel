"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Plane, Clock, ShieldCheck, MapPin } from "lucide-react";

const FEATURES = [
  { icon: Clock, label: "On-time pickup, every time" },
  { icon: ShieldCheck, label: "Verified, uniformed drivers" },
  { icon: MapPin, label: "All Delhi NCR airports" },
];

export function AirportTransfer() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container-padded">
        <div className="relative grid grid-cols-1 items-center gap-12 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-saffron-50 via-cream to-crimson-50 p-8 ring-1 ring-saffron-200/40 sm:p-12 lg:grid-cols-12 lg:gap-16 lg:p-16">
          {/* Decorative plane path */}
          <svg
            aria-hidden="true"
            className="absolute right-0 top-0 h-full w-1/2 opacity-30"
            viewBox="0 0 400 400"
            fill="none"
          >
            <path
              d="M50 350 Q 150 100, 350 80"
              stroke="rgb(199 71 11)"
              strokeWidth="2"
              strokeDasharray="6 8"
              strokeLinecap="round"
            />
            <circle cx="50" cy="350" r="4" fill="rgb(199 71 11)" />
            <circle cx="350" cy="80" r="6" fill="rgb(220 38 38)" />
          </svg>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 ring-1 ring-saffron-200">
              <Plane className="h-3.5 w-3.5 text-saffron-700" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-saffron-700">
                Airport Transfer
              </span>
            </div>

            <h2 className="display-text mt-6 text-4xl sm:text-5xl lg:text-[3.5rem]">
              From the runway to your doorstep — without the chaos.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-700">
              We handle Delhi (IGI), Hindon, and onward connections with the
              kind of precision business travellers expect and families
              appreciate. Flight tracking, waiting time included, and a driver
              who&apos;s genuinely glad to see you.
            </p>

            <ul className="mt-8 space-y-3">
              {FEATURES.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-ink-800">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white ring-1 ring-saffron-200">
                    <Icon className="h-4 w-4 text-saffron-700" />
                  </span>
                  <span className="text-base">{label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Book Airport Transfer
              </Link>
              <Link href="/fleet" className="btn-secondary">
                See Vehicle Options
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative lg:col-span-5"
          >
            <div className="rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-ink-200/40">
              <p className="text-xs uppercase tracking-[0.2em] text-saffron-700">
                Sample fares
              </p>
              <div className="mt-6 space-y-4">
                {[
                  { from: "IGI Airport", to: "Noida", price: "₹1,200" },
                  { from: "IGI Airport", to: "Gurugram", price: "₹950" },
                  { from: "IGI Airport", to: "Faridabad", price: "₹1,400" },
                  { from: "Hindon", to: "Delhi NCR", price: "₹1,100" },
                ].map((row) => (
                  <div
                    key={`${row.from}-${row.to}`}
                    className="flex items-center justify-between border-b border-ink-100 pb-3 last:border-0"
                  >
                    <div className="text-sm">
                      <p className="font-medium text-ink-900">{row.from}</p>
                      <p className="text-xs text-ink-500">→ {row.to}</p>
                    </div>
                    <span className="font-display text-xl text-saffron-700">
                      {row.price}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[11px] uppercase tracking-[0.15em] text-ink-400">
                *Sedan rates. Tolls &amp; parking extra.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
