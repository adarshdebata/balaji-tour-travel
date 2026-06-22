"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { Award, Compass, Heart, ShieldCheck, type LucideIcon } from "lucide-react";

type Value = { icon: LucideIcon; title: string; body: string };

const VALUES: Value[] = [
  {
    icon: Heart,
    title: "Family-run since day one",
    body: "Started in 2000 with a single Tempo Traveller, run today by the same family. The phone you call is still answered by someone who knows the business top to bottom.",
  },
  {
    icon: ShieldCheck,
    title: "Safety isn't a slogan",
    body: "Every vehicle clears a daily checklist before it leaves the yard — tyres, brakes, fluids, AC, lights, all logged. Our maintenance budget is roughly twice the industry average, on purpose.",
  },
  {
    icon: Award,
    title: "Drivers we'd send family with",
    body: "Verified, route-trained, and tested on mountain roads before they take on Himalayan trips. Most of our drivers have been with us for over a decade.",
  },
  {
    icon: Compass,
    title: "We know the routes",
    body: "Char Dham detours in landslide season. The right dhaba on the Jaipur highway. The shortcut into Manali that saves an hour. Twenty-five years of road knowledge, baked in.",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

function ValueCard({ icon: Icon, title, body, index }: Value & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  // Cursor position → gentle tilt for a tactile, 3D feel.
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 150, damping: 18 });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function reset() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.article variants={item} className="[perspective:1000px]">
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY }}
        className="group relative h-full overflow-hidden rounded-[1.75rem] bg-white p-8 ring-1 ring-ink-200/60 shadow-sm transition-shadow duration-500 hover:shadow-2xl hover:shadow-saffron-300/30 dark:bg-ink-900 dark:ring-white/10 dark:hover:shadow-saffron-500/10"
      >
        {/* Hover wash */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-saffron-200/50 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 dark:bg-saffron-500/15" />

        <div className="relative">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-saffron-500 to-crimson-600 text-white shadow-lg shadow-saffron-500/30 ring-1 ring-saffron-300/40">
            <Icon className="h-6 w-6" />
          </div>

          <h3 className="mt-6 font-display text-2xl text-ink-900 dark:text-cream">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{body}</p>

          <span className="mt-6 block font-display text-sm tabular-nums tracking-[0.3em] text-saffron-700/70 dark:text-saffron-300/60">
            0{index + 1}
          </span>
        </div>
      </motion.div>
    </motion.article>
  );
}

export function AboutValues() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container-padded">
        <div className="max-w-2xl">
          <div className="eyebrow">What we stand for</div>
          <h2 className="display-text mt-5 text-4xl sm:text-5xl lg:text-6xl">
            Four principles, lived daily.
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {VALUES.map((value, i) => (
            <ValueCard key={value.title} {...value} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
