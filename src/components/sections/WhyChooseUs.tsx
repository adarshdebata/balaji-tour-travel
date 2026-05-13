"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { FEATURES } from "@/data/features";
import { cn } from "@/lib/utils";

type IconName = keyof typeof Icons;

export function WhyChooseUs() {
  return (
    <section className="relative py-24 lg:py-32 bg-white/50">
      <div className="container-padded">
        <div className="mx-auto max-w-2xl text-center">
          <div className="eyebrow justify-center">Why choose us</div>
          <h2 className="display-text mt-6 text-4xl sm:text-5xl lg:text-6xl">
            Six reasons travellers keep coming back.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, idx) => {
            const Icon = Icons[feature.icon as IconName] as React.ComponentType<{
              className?: string;
            }>;

            return (
              <motion.article
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={cn(
                  "group relative overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-ink-200/60",
                  "transition-all duration-500 hover:shadow-2xl hover:shadow-saffron-200/40 hover:-translate-y-1",
                )}
              >
                {/* Decorative corner */}
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-saffron-100 opacity-0 transition-opacity duration-500 group-hover:opacity-80" />

                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-saffron-500 to-crimson-600 text-white shadow-lg shadow-saffron-500/30 ring-1 ring-saffron-300/40">
                    {Icon && <Icon className="h-6 w-6" />}
                  </div>

                  <h3 className="mt-6 font-display text-2xl text-ink-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-ink-600">
                    {feature.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-saffron-700 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <span>0{idx + 1}</span>
                    <span className="h-px w-8 bg-saffron-600" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
