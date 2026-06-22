"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A full-bleed background image that drifts slower than the page as it scrolls
 * through the viewport. Transform/opacity only + a dedicated GPU layer keep it
 * smooth; it freezes flat when the user prefers reduced motion. The image layer
 * is over-sized by `travel` on each edge so the container is always covered.
 */
export function ParallaxBg({
  src,
  alt = "",
  travel = 80,
  blur = false,
  priority = false,
  overlayClassName,
  className,
  sizes = "100vw",
}: {
  src: string;
  alt?: string;
  travel?: number;
  blur?: boolean;
  priority?: boolean;
  overlayClassName?: string;
  className?: string;
  sizes?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [travel, -travel]);

  return (
    <div ref={ref} className={cn("absolute inset-0 -z-10 overflow-hidden", className)} aria-hidden={alt ? undefined : true}>
      {/* The image lives in an over-sized layer transformed on scroll. */}
      <motion.div
        style={{
          ...(reduce ? {} : { y }),
          top: -travel,
          height: `calc(100% + ${travel * 2}px)`,
        }}
        className="gpu absolute inset-x-0"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn("object-cover", blur && "scale-110 blur-2xl")}
        />
      </motion.div>

      {overlayClassName && <div className={cn("absolute inset-0", overlayClassName)} />}
    </div>
  );
}

/**
 * Cinematic full-width parallax banner with overlaid content.
 */
export function ParallaxBanner({
  src,
  alt = "",
  className,
  children,
  travel = 80,
  minHeight = "min-h-[60vh] sm:min-h-[70vh]",
}: {
  src: string;
  alt?: string;
  className?: string;
  children: React.ReactNode;
  /** How far (px) the image drifts against the scroll — higher = stronger parallax. */
  travel?: number;
  minHeight?: string;
}) {
  return (
    <section className={cn("relative isolate flex items-center overflow-hidden", minHeight, className)}>
      <ParallaxBg
        src={src}
        alt={alt}
        travel={travel}
        sizes="100vw"
        overlayClassName="bg-gradient-to-t from-ink-950/85 via-ink-950/55 to-ink-950/35"
      />
      <div className="container-padded relative w-full py-20">{children}</div>
    </section>
  );
}
