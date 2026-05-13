"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/constants/site";
import { formatNumber } from "@/lib/utils";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {formatNumber(count)}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container-padded">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-ink-950 via-ink-900 to-ink-950 px-8 py-16 sm:px-16 lg:px-20">
          {/* Decorative glow */}
          <div
            aria-hidden="true"
            className="absolute -top-40 -right-20 h-96 w-96 rounded-full bg-saffron-500 opacity-20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-crimson-600 opacity-15 blur-3xl"
          />

          {/* Compass watermark */}
          <svg
            aria-hidden="true"
            className="absolute right-8 top-8 h-32 w-32 text-saffron-400 opacity-10"
            viewBox="0 0 100 100"
            fill="none"
          >
            <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1" />
            <path d="M50 5 L55 50 L50 95 L45 50 Z" fill="currentColor" />
            <path d="M5 50 L50 55 L95 50 L50 45 Z" fill="currentColor" />
          </svg>

          <div className="relative">
            <div className="max-w-2xl">
              <div className="eyebrow !text-saffron-300">By the numbers</div>
              <h2 className="display-text mt-5 text-4xl text-cream sm:text-5xl lg:text-6xl">
                Two and a half decades, plenty of miles.
              </h2>
            </div>

            <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
              {STATS.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="border-t border-white/10 pt-6"
                >
                  <dt className="text-xs uppercase tracking-[0.2em] text-saffron-300">
                    {stat.label}
                  </dt>
                  <dd className="mt-3 font-display text-5xl text-cream lg:text-6xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
