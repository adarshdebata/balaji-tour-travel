"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  X,
} from "lucide-react";
import type { Destination } from "@/types";
import { formatPrice } from "@/lib/utils";

const cardVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir >= 0 ? 56 : -56 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: (dir: number) => ({ opacity: 0, x: dir >= 0 ? -56 : 56, transition: { duration: 0.3, ease: "easeIn" } }),
};

export function DestinationsExplorer({ destinations }: { destinations: Destination[] }) {
  const [page, setPage] = useState<{ index: number; dir: number } | null>(null);
  const open = page !== null;
  const active = open ? destinations[page.index] : null;
  const len = destinations.length;

  const close = useCallback(() => setPage(null), []);
  const paginate = useCallback(
    (dir: number) =>
      setPage((p) => (p === null ? p : { index: (p.index + dir + len) % len, dir })),
    [len],
  );

  // Keyboard navigation + background scroll lock while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") paginate(-1);
      else if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, paginate]);

  return (
    <>
      {/* Card grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((dest, idx) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: (idx % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Real link for SEO / no-JS; JS intercepts to open the browser. */}
            <Link
              href={`/destinations/${dest.id}`}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                e.preventDefault();
                setPage({ index: idx, dir: 0 });
              }}
              className="group block h-full overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-ink-200/60 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 dark:bg-ink-900 dark:ring-white/10"
              aria-label={`Open ${dest.name} details`}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/25 to-transparent" />

                <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-saffron-700 backdrop-blur">
                  {dest.region}
                </div>
                <div className="absolute right-4 top-4 rounded-full bg-ink-950/70 px-3 py-1 text-[11px] font-medium text-cream backdrop-blur">
                  from {formatPrice(dest.priceFrom)}
                </div>

                <div className="absolute inset-x-5 bottom-5 text-cream">
                  <h2 className="font-display text-3xl tracking-tight">{dest.name}</h2>
                  <p className="mt-2 line-clamp-2 text-sm text-cream/80">{dest.shortDescription}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-cream/70">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {dest.bestTime}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {dest.duration}
                    </span>
                    <span className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Immersive destination browser */}
      <AnimatePresence>
        {open && active && (
          <motion.div
            key="overlay"
            role="dialog"
            aria-modal="true"
            aria-label={`${active.name} details`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[120]"
          >
            {/* Blurred, synchronized background — click to close */}
            <button
              type="button"
              onClick={close}
              aria-label="Close details"
              className="absolute inset-0 cursor-default overflow-hidden bg-ink-950"
            >
              <AnimatePresence>
                <motion.span
                  key={active.id}
                  initial={{ opacity: 0, scale: 1.15 }}
                  animate={{ opacity: 1, scale: 1.05, transition: { duration: 0.7, ease: "easeOut" } }}
                  exit={{ opacity: 0, transition: { duration: 0.5 } }}
                  className="absolute inset-0 block"
                >
                  <Image
                    src={active.image}
                    alt=""
                    aria-hidden="true"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover blur-2xl"
                  />
                </motion.span>
              </AnimatePresence>
              <span className="absolute inset-0 bg-ink-950/55" />
            </button>

            {/* Card: full bleed split on desktop, bottom sheet on mobile */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 top-auto md:inset-6 lg:inset-8">
              <AnimatePresence mode="wait" custom={page.dir}>
                <motion.div
                  key={active.id}
                  custom={page.dir}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="pointer-events-auto flex h-full max-h-[90vh] w-full flex-col overflow-y-auto rounded-t-[1.75rem] bg-cream shadow-2xl dark:bg-ink-900 md:max-h-none md:flex-row md:overflow-hidden md:rounded-[1.75rem]"
                >
                  {/* Image side (top on mobile, right on desktop) */}
                  <div className="relative order-1 aspect-[16/10] w-full shrink-0 md:order-2 md:aspect-auto md:h-full md:w-[56%]">
                    <Image
                      src={active.image}
                      alt={active.name}
                      fill
                      sizes="(min-width: 768px) 56vw, 100vw"
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-ink-950/20 md:bg-gradient-to-l" />

                    {/* Close */}
                    <button
                      onClick={close}
                      className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink-900 shadow-lg ring-1 ring-white/40 backdrop-blur transition-colors hover:bg-white"
                      aria-label="Close details"
                    >
                      <X className="h-5 w-5" />
                    </button>

                    {/* Prev / next + counter */}
                    <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center">
                      <div className="flex items-center gap-1 rounded-full bg-white/90 p-1 shadow-lg ring-1 ring-white/40 backdrop-blur">
                        <button
                          onClick={() => paginate(-1)}
                          className="flex h-9 w-9 items-center justify-center rounded-full text-ink-800 transition-colors hover:bg-saffron-100 hover:text-saffron-800"
                          aria-label="Previous destination"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <span className="min-w-[3.5rem] text-center text-sm font-medium tabular-nums text-ink-700">
                          {String(page.index + 1).padStart(2, "0")} / {String(len).padStart(2, "0")}
                        </span>
                        <button
                          onClick={() => paginate(1)}
                          className="flex h-9 w-9 items-center justify-center rounded-full text-ink-800 transition-colors hover:bg-saffron-100 hover:text-saffron-800"
                          aria-label="Next destination"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Details side (below on mobile, left on desktop) */}
                  <div className="order-2 flex w-full flex-col p-6 sm:p-8 md:order-1 md:w-[44%] md:min-h-0 md:overflow-y-auto lg:p-10 xl:p-12">
                    <div className="eyebrow">{active.region}</div>
                    <h2 className="display-text mt-3 text-4xl sm:text-5xl lg:text-6xl">{active.name}</h2>

                    <div className="mt-5 space-y-4">
                      {active.longDescription.map((para, i) => (
                        <p key={i} className="text-base leading-relaxed text-ink-700 dark:text-ink-300">
                          {para}
                        </p>
                      ))}
                    </div>

                    {/* Meta */}
                    <dl className="mt-7 grid grid-cols-3 gap-3 rounded-2xl bg-saffron-50 p-4 text-center ring-1 ring-saffron-100 dark:bg-white/5 dark:ring-white/10">
                      <div>
                        <dt className="text-[10px] uppercase tracking-[0.16em] text-ink-500 dark:text-ink-400">Best time</dt>
                        <dd className="mt-1 text-sm font-semibold text-ink-900 dark:text-cream">{active.bestTime}</dd>
                      </div>
                      <div className="border-x border-saffron-100 dark:border-white/10">
                        <dt className="text-[10px] uppercase tracking-[0.16em] text-ink-500 dark:text-ink-400">Duration</dt>
                        <dd className="mt-1 text-sm font-semibold text-ink-900 dark:text-cream">{active.duration}</dd>
                      </div>
                      <div>
                        <dt className="text-[10px] uppercase tracking-[0.16em] text-ink-500 dark:text-ink-400">From</dt>
                        <dd className="mt-1 text-sm font-semibold text-ink-900 dark:text-cream">{formatPrice(active.priceFrom)}</dd>
                      </div>
                    </dl>

                    {/* Highlights */}
                    <h3 className="mt-7 text-xs font-medium uppercase tracking-[0.18em] text-saffron-700 dark:text-saffron-300">
                      Trip highlights
                    </h3>
                    <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                      {active.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-saffron-100 text-saffron-700 dark:bg-saffron-500/15 dark:text-saffron-300">
                            <Check className="h-3 w-3" />
                          </span>
                          <span className="text-sm leading-snug text-ink-700 dark:text-ink-300">{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Locations */}
                    <div className="mt-7">
                      <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
                        <MapPin className="h-3.5 w-3.5" /> Locations covered
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {active.locations.map((loc) => (
                          <span
                            key={loc}
                            className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-saffron-800 ring-1 ring-saffron-100 dark:bg-white/5 dark:text-saffron-300 dark:ring-white/10"
                          >
                            {loc}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="mt-8 flex flex-col gap-2.5 sm:flex-row md:mt-auto md:pt-8">
                      <Link href="/contact" className="btn-primary flex-1">
                        Plan this trip
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/destinations/${active.id}`}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-6 py-3 text-sm font-medium text-saffron-700 ring-1 ring-saffron-200 transition-colors hover:bg-saffron-50 dark:text-saffron-300 dark:ring-white/15 dark:hover:bg-white/5"
                      >
                        View full page
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
