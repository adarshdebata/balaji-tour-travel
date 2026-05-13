"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = TESTIMONIALS[index];

  const next = () => setIndex((i) => (i + 1) % TESTIMONIALS.length);
  const prev = () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="relative py-24 lg:py-32 bg-white/50">
      <div className="container-padded">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="eyebrow">Travellers say</div>
            <h2 className="display-text mt-6 text-4xl sm:text-5xl lg:text-5xl">
              Stories that travelled with us.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink-600">
              Real feedback from real journeys. We&apos;re proud of what people
              say about our drivers, our coaches, and the care we bring to
              every booking.
            </p>

            <div className="mt-10 flex items-center gap-3">
              <button
                onClick={prev}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white ring-1 ring-ink-200 transition-colors hover:bg-saffron-50 hover:ring-saffron-300"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-900 text-white transition-colors hover:bg-ink-800"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <span className="ml-3 text-sm text-ink-500 tabular-nums">
                {String(index + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="relative lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.figure
                key={t.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-[2rem] bg-white p-10 ring-1 ring-ink-200/60 shadow-xl sm:p-14"
              >
                <Quote
                  className="absolute right-8 top-8 h-20 w-20 text-saffron-100"
                  aria-hidden="true"
                />

                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-saffron-500 text-saffron-500"
                    />
                  ))}
                </div>

                <blockquote className="relative mt-8 font-display text-2xl leading-tight text-ink-900 sm:text-3xl">
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                <figcaption className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink-100 pt-6">
                  <div>
                    <p className="font-display text-lg text-ink-900">{t.name}</p>
                    <p className="text-sm text-ink-500">{t.location}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-saffron-700">
                      {t.tripType}
                    </p>
                    <p className="mt-1 text-xs text-ink-500">{t.date}</p>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
