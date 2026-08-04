"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";
import { NeonBusScene } from "@/components/ui/NeonBusScene";
import { BusBadge } from "@/components/ui/BusBadge";
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
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#0a0512] px-6"
          >
            {/* One soft violet bloom is the whole background — the neon has to
                be the brightest thing on screen. Deliberately dark in both
                themes; neon on cream reads as a smudge. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-royal-700/25 blur-[110px]"
            />

            {/* Brand, held back so the bus stays the focus */}
            <div className="relative mb-2 flex items-center gap-2.5 opacity-80 sm:mb-4">
              <BusBadge idSuffix="loader" className="h-9 w-9 sm:h-10 sm:w-10" />
              <div className="flex flex-col leading-none">
                <span className="font-display text-lg font-medium text-cream sm:text-xl">
                  {SITE_CONFIG.shortName}
                </span>
                <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-gold-400 sm:text-[10px]">
                  Tour &amp; Travel Line
                </span>
              </div>
            </div>

            {/* Neon bus */}
            <div className="relative w-full max-w-md sm:max-w-lg">
              <NeonBusScene />
            </div>

            {/* Progress */}
            <div className="relative -mt-2 w-full max-w-xs">
              <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-royal-400 via-gold-400 to-gold-200 shadow-[0_0_12px_rgba(233,173,69,0.75)] transition-[width] duration-200 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-white/45">
                <span className="uppercase tracking-[0.2em]">Preparing your journey</span>
                <span className="tabular-nums font-medium text-gold-300">{Math.round(progress)}%</span>
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
