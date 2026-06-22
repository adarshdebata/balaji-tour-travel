"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

/** Dramatic Himalayan valley — the destination half of the brand promise. */
const MOUNTAIN =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2400&auto=format&fit=crop";

// Two silhouette ranges. The far one sits behind the title, the near one in
// front — so the headline reads as if it rises from between the peaks.
const FAR_RANGE =
  "M0,320 L0,168 L120,150 L260,192 L380,120 L520,176 L660,108 L820,182 L980,120 L1140,186 L1280,140 L1440,180 L1440,320 Z";
const NEAR_RANGE =
  "M0,320 L0,232 L90,178 L180,238 L300,150 L430,242 L560,168 L700,252 L840,158 L1000,250 L1160,176 L1300,252 L1440,188 L1440,320 Z";

export function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Spring-smoothed progress → buttery, glide-y parallax instead of a 1:1 jump.
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  // Differential motion builds depth: the background lags downward while the
  // foreground rushes up, and the title drifts up + fades as you scroll "in".
  const photoY = useTransform(p, [0, 1], reduce ? [0, 0] : [0, 140]);
  const photoScale = useTransform(p, [0, 1], reduce ? [1, 1] : [1.18, 1.32]);
  const farY = useTransform(p, [0, 1], reduce ? [0, 0] : [0, 70]);
  const titleY = useTransform(p, [0, 1], reduce ? [0, 0] : [0, -70]);
  const titleOpacity = useTransform(p, [0, 0.6], reduce ? [1, 1] : [1, 0]);
  const nearY = useTransform(p, [0, 1], reduce ? [0, 0] : [0, -90]);
  const cueOpacity = useTransform(p, [0, 0.15], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#060b22]"
    >
      {/* Sky */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 bg-gradient-to-b from-[#060b22] via-[#0a1238] to-[#1c1340]"
      />
      {/* Saffron horizon glow + soft sun behind the title */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-20 h-2/3 bg-gradient-to-t from-saffron-600/30 via-saffron-700/8 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/3 -z-20 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-saffron-500/20 blur-3xl"
      />

      {/* Background mountain photograph */}
      <motion.div style={{ y: photoY, scale: photoScale }} className="gpu absolute inset-0 -z-20">
        <Image
          src={MOUNTAIN}
          alt="A Himalayan valley framed by snow peaks and pine forest"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-55"
        />
        <div className="absolute inset-0 bg-[#060b22]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060b22] via-transparent to-[#060b22]/70" />
      </motion.div>

      {/* Far silhouette range (behind the title) */}
      <motion.svg
        aria-hidden="true"
        style={{ y: farY }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="gpu absolute inset-x-0 bottom-0 -z-10 h-[54vh] w-full"
      >
        <path d={FAR_RANGE} fill="#0e1a47" fillOpacity="0.92" />
      </motion.svg>

      {/* Title — wedged between the two ranges */}
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 mx-auto max-w-3xl px-6 pb-[14vh] text-center"
      >
        <p className="eyebrow justify-center !text-saffron-300">
          Balaji Tour &amp; Travel Line
        </p>
        <h1 className="display-text mt-5 text-7xl leading-[0.9] text-white drop-shadow-[0_2px_30px_rgba(0,0,0,0.5)] sm:text-8xl lg:text-[10rem]">
          About Us
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
          From a one-van garage in Noida to the high passes of the Himalayas —
          twenty-five years of careful, quietly excellent journeys.
        </p>
      </motion.div>

      {/* Near silhouette range (in front of the title) */}
      <motion.svg
        aria-hidden="true"
        style={{ y: nearY }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="gpu pointer-events-none absolute inset-x-0 -bottom-px z-20 h-[42vh] w-full"
      >
        <path d={NEAR_RANGE} fill="#060b22" />
      </motion.svg>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: cueOpacity }}
        className="absolute bottom-7 left-1/2 z-30 -translate-x-1/2 text-cream/70"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
