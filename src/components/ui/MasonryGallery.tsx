"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryItem {
  src: string;
  alt: string;
  id: string;
}

interface MasonryGalleryProps {
  images: GalleryItem[];
  className?: string;
}

/**
 * A single masonry tile. Reserves its box via the image aspect ratio (so there
 * is no layout shift), shows a shimmer skeleton until the image has decoded,
 * then fades the image in to avoid an abrupt pop-in.
 */
function GalleryTile({
  img,
  index,
  onOpen,
}: {
  img: GalleryItem;
  index: number;
  onOpen: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Cached images can finish before React attaches onLoad — catch that here.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: (index % 8) * 0.05 }}
      onClick={onOpen}
      className="group relative block w-full overflow-hidden rounded-2xl bg-ink-100 transition-shadow hover:shadow-2xl dark:bg-ink-800"
      aria-label={`View ${img.alt}`}
    >
      {/* Skeleton placeholder — visible until the image is fully loaded. */}
      {!loaded && <span aria-hidden="true" className="skeleton absolute inset-0 z-10" />}

      <Image
        ref={imgRef}
        src={img.src}
        alt={img.alt}
        width={800}
        height={1000}
        sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        data-loaded={loaded}
        className="img-fade-in w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.button>
  );
}

export function MasonryGallery({ images, className }: MasonryGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="rounded-3xl border-2 border-dashed border-ink-200 p-16 text-center dark:border-white/15">
        <p className="font-display text-2xl text-ink-700 dark:text-ink-200">No images yet.</p>
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
          Drop images into{" "}
          <code className="rounded bg-ink-100 px-2 py-1 text-xs dark:bg-white/10">/public/gallery</code>{" "}
          and they&apos;ll appear here automatically.
        </p>
      </div>
    );
  }

  const close = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  const next = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));

  return (
    <>
      <div
        className={cn(
          "columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 [&>*]:mb-4",
          className,
        )}
      >
        {images.map((img, i) => (
          <GalleryTile key={img.id} img={img} index={i} onOpen={() => setLightboxIndex(i)} />
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/95 p-4 backdrop-blur"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[88vh] max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                width={1600}
                height={1200}
                className="h-auto max-h-[88vh] w-auto rounded-2xl object-contain"
              />
              <p className="mt-3 text-center text-sm text-white/70">
                {images[lightboxIndex].alt} · {lightboxIndex + 1} / {images.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
