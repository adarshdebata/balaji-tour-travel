"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";
import { BusScene } from "@/components/ui/BusScene";
import { BajrangbaliMark } from "@/components/ui/BajrangbaliMark";
import { SITE_CONFIG } from "@/constants/site";

const MIN_INTRO_MS = 1600; // guaranteed brand moment
const MAX_INTRO_MS = 7000; // hard cap so we never trap the user

type Controls = ReturnType<typeof animate>;

/**
 * Full-screen bus-travel loading screen.
 *
 * Shows ONLY on a full document load — the initial visit and on refresh — and
 * never during client-side route navigation (it mounts once with the layout
 * and dismisses itself; SPA navigations don't remount it). It is SSR-rendered
 * (active by default) so the bus is on screen from the very first paint rather
 * than a flash of blank content.
 */
export function PageLoader({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const controls = useRef<Controls | null>(null);

  const setP = useCallback((v: number) => {
    progressRef.current = v;
    setProgress(v);
  }, []);

  const finish = useCallback(() => {
    controls.current?.stop();
    controls.current = animate(progressRef.current, 100, {
      duration: 0.4,
      ease: "easeInOut",
      onUpdate: setP,
      onComplete: () => window.setTimeout(() => setActive(false), 320),
    });
  }, [setP]);

  // Lock scroll while the loader covers the page.
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);

  // Trickle up, then race to 100% once window load + a minimum time have passed.
  useEffect(() => {
    setP(0);
    controls.current = animate(0, 85, {
      duration: 1.7,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setP,
    });

    let loaded = document.readyState === "complete";
    let minPassed = false;
    const tryFinish = () => {
      if (loaded && minPassed) finish();
    };
    const onLoad = () => {
      loaded = true;
      tryFinish();
    };
    window.addEventListener("load", onLoad);
    const minT = window.setTimeout(() => {
      minPassed = true;
      tryFinish();
    }, MIN_INTRO_MS);
    const capT = window.setTimeout(finish, MAX_INTRO_MS);

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(minT);
      window.clearTimeout(capT);
      controls.current?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {children}

      <AnimatePresence>
        {active && (
          <motion.div
            id="page-loader"
            role="status"
            aria-live="polite"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-cream/90 px-6 backdrop-blur-2xl"
          >
            {/* Subtle, simple background accent */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-saffron-200/40 blur-3xl"
            />

            {/* Brand */}
            <div className="relative mb-4 flex items-center gap-3 sm:mb-6">
              <BajrangbaliMark idSuffix="loader" className="h-12 w-12 drop-shadow-sm sm:h-14 sm:w-14" />
              <div className="flex flex-col leading-none">
                <span className="font-display text-2xl font-medium text-ink-900 sm:text-3xl">
                  {SITE_CONFIG.shortName}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-saffron-700 sm:text-xs">
                  Tour &amp; Travel Line
                </span>
              </div>
            </div>

            {/* Bus scene */}
            <div className="relative w-full max-w-sm sm:max-w-md">
              <BusScene />
            </div>

            {/* Progress */}
            <div className="relative mt-6 w-full max-w-xs">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-200/70">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-saffron-500 to-crimson-600 transition-[width] duration-200 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-ink-500">
                <span className="uppercase tracking-[0.2em]">Preparing your journey</span>
                <span className="tabular-nums font-medium text-ink-700">{Math.round(progress)}%</span>
              </div>
            </div>

            <span className="sr-only">Loading, please wait.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* If JS is unavailable the overlay can't dismiss itself — hide it. */}
      <noscript>
        <style>{`#page-loader{display:none!important}`}</style>
      </noscript>
    </>
  );
}
