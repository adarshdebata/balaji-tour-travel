"use client";

/* eslint-disable @next/next/no-img-element -- Sources are Google Drive / Unsplash
   CDN URLs that are already served at the requested width, and the site is a
   static export, so next/image has no optimizer to run. */

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  src: string;
  alt: string;
  id: string;
  /** Higher-resolution source for the lightbox. Falls back to `src`. */
  full?: string;
  /** Swapped in if `src` fails to load. */
  fallback?: string;
}

interface MasonryGalleryProps {
  images: GalleryItem[];
  className?: string;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 6;

/** Width/height ratios used to give each skeleton its own Pinterest-ish box. */
const SKELETON_RATIOS = [0.75, 1, 0.8, 1.33, 0.67, 1.15, 0.85, 1.5];

/** Deterministic per-image pick, so server and client render the same box. */
function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * A single masonry tile. Holds its box open with a pseudo-random aspect ratio
 * while a shimmer skeleton runs, then snaps to the photo's real aspect ratio and
 * fades it in — that mix of heights is what gives the grid its Pinterest look.
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
  const [src, setSrc] = useState(img.src);
  const [ratio, setRatio] = useState(
    () => SKELETON_RATIOS[hashString(img.id) % SKELETON_RATIOS.length],
  );
  const imgRef = useRef<HTMLImageElement>(null);

  const handleLoad = useCallback(() => {
    const el = imgRef.current;
    if (el?.naturalWidth && el.naturalHeight) {
      setRatio(el.naturalWidth / el.naturalHeight);
    }
    setLoaded(true);
  }, []);

  // Cached images can finish before React attaches onLoad — catch that here.
  useEffect(() => {
    if (imgRef.current?.complete) handleLoad();
  }, [handleLoad]);

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: (index % 8) * 0.05 }}
      onClick={onOpen}
      style={{ aspectRatio: ratio }}
      className="group relative block w-full overflow-hidden rounded-2xl bg-ink-100 transition-shadow hover:shadow-2xl dark:bg-ink-800"
      aria-label={`View ${img.alt}`}
    >
      {/* Skeleton placeholder — visible until the image is fully loaded. */}
      {!loaded && <span aria-hidden="true" className="skeleton absolute inset-0 z-10" />}

      <img
        ref={imgRef}
        src={src}
        alt={img.alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={handleLoad}
        onError={() => {
          if (img.fallback && src !== img.fallback) setSrc(img.fallback);
        }}
        data-loaded={loaded}
        className="img-fade-in absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.button>
  );
}

const CONTROL_CLASS =
  "flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-white/20 disabled:opacity-40 disabled:hover:bg-white/10";

/**
 * Full-screen viewer with real zooming: wheel/trackpad, pinch, double-click and
 * the on-screen controls all drive the same transform, and panning is enabled
 * once you are zoomed past 1x.
 */
function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const img = images[index];
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);
  const [src, setSrc] = useState(img.full ?? img.src);
  const [panning, setPanning] = useState(false);

  const surfaceRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef(view);
  viewRef.current = view;

  // Active pointers, so one finger pans and two fingers pinch.
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchStart = useRef<{ distance: number; scale: number } | null>(null);
  const dragStart = useRef<{ x: number; y: number; viewX: number; viewY: number } | null>(null);
  const movedDistance = useRef(0);

  const reset = useCallback(() => setView({ scale: 1, x: 0, y: 0 }), []);

  /** Zooms by `factor`, keeping the point under the cursor/pinch centre fixed. */
  const zoomBy = useCallback((factor: number, clientX?: number, clientY?: number) => {
    setView((current) => {
      const scale = clamp(current.scale * factor, MIN_ZOOM, MAX_ZOOM);
      if (scale === current.scale) return current;
      if (scale === MIN_ZOOM) return { scale, x: 0, y: 0 };

      const rect = surfaceRef.current?.getBoundingClientRect();
      let anchorX = 0;
      let anchorY = 0;
      if (rect && clientX !== undefined && clientY !== undefined) {
        anchorX = clientX - rect.left - rect.width / 2;
        anchorY = clientY - rect.top - rect.height / 2;
      }

      const growth = scale / current.scale;
      return {
        scale,
        x: anchorX - (anchorX - current.x) * growth,
        y: anchorY - (anchorY - current.y) * growth,
      };
    });
  }, []);

  // A new photo starts fresh: 1x, centred, skeleton on.
  useEffect(() => {
    reset();
    setLoaded(false);
    setSrc(images[index].full ?? images[index].src);
  }, [index, images, reset]);

  // Keep the page behind the overlay from scrolling.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onPrev();
          break;
        case "ArrowRight":
          onNext();
          break;
        case "+":
        case "=":
          zoomBy(1.4);
          break;
        case "-":
        case "_":
          zoomBy(1 / 1.4);
          break;
        case "0":
          reset();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onPrev, onNext, zoomBy, reset]);

  // Wheel zoom needs a non-passive listener to be able to preventDefault.
  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      zoomBy(event.deltaY < 0 ? 1.15 : 1 / 1.15, event.clientX, event.clientY);
    };

    surface.addEventListener("wheel", onWheel, { passive: false });
    return () => surface.removeEventListener("wheel", onWheel);
  }, [zoomBy]);

  const pointerDistance = () => {
    const [a, b] = Array.from(pointers.current.values());
    return Math.hypot(a.x - b.x, a.y - b.y);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    (event.target as Element).setPointerCapture?.(event.pointerId);
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    movedDistance.current = 0;

    if (pointers.current.size === 2) {
      pinchStart.current = { distance: pointerDistance(), scale: viewRef.current.scale };
      dragStart.current = null;
    } else if (viewRef.current.scale > MIN_ZOOM) {
      dragStart.current = {
        x: event.clientX,
        y: event.clientY,
        viewX: viewRef.current.x,
        viewY: viewRef.current.y,
      };
      setPanning(true);
    }
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointers.current.size === 2 && pinchStart.current) {
      const [a, b] = Array.from(pointers.current.values());
      const factor = pointerDistance() / pinchStart.current.distance;
      const target = clamp(pinchStart.current.scale * factor, MIN_ZOOM, MAX_ZOOM);
      zoomBy(target / viewRef.current.scale, (a.x + b.x) / 2, (a.y + b.y) / 2);
      return;
    }

    if (dragStart.current) {
      const dx = event.clientX - dragStart.current.x;
      const dy = event.clientY - dragStart.current.y;
      movedDistance.current = Math.hypot(dx, dy);
      setView((current) => ({
        ...current,
        x: dragStart.current!.viewX + dx,
        y: dragStart.current!.viewY + dy,
      }));
    }
  };

  const endPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(event.pointerId);
    if (pointers.current.size < 2) pinchStart.current = null;
    if (pointers.current.size === 0) {
      dragStart.current = null;
      setPanning(false);
    }
  };

  const zoomed = view.scale > MIN_ZOOM;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/95 backdrop-blur"
      role="dialog"
      aria-modal="true"
      aria-label={img.alt}
    >
      {/* Zoom/pan surface. A click that did not drag counts as "close". */}
      <div
        ref={surfaceRef}
        className={cn(
          "absolute inset-0 flex touch-none items-center justify-center overflow-hidden p-4",
          zoomed ? (panning ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in",
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        onDoubleClick={(event) =>
          zoomed ? reset() : zoomBy(2.5, event.clientX, event.clientY)
        }
        onClick={(event) => {
          if (event.target === event.currentTarget && movedDistance.current < 6) onClose();
        }}
      >
        {!loaded && (
          <span
            aria-hidden="true"
            className="skeleton absolute left-1/2 top-1/2 h-[60vh] w-[80vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-2xl"
          />
        )}

        <img
          key={images[index].id}
          src={src}
          alt={img.alt}
          draggable={false}
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => {
            const alternate = images[index].fallback ?? images[index].src;
            if (src !== alternate) setSrc(alternate);
          }}
          data-loaded={loaded}
          style={{
            transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})`,
            transition: panning || pinchStart.current ? "none" : "transform 0.2s ease-out",
          }}
          className="img-fade-in max-h-[86vh] max-w-[92vw] select-none rounded-2xl object-contain"
        />
      </div>

      {/* Controls sit above the surface so they never trigger a pan. */}
      <button onClick={onClose} className={cn(CONTROL_CLASS, "absolute right-4 top-4 z-10")} aria-label="Close">
        <X className="h-5 w-5" />
      </button>

      <div className="absolute left-1/2 top-4 z-10 flex -translate-x-1/2 items-center gap-2">
        <button
          onClick={() => zoomBy(1 / 1.4)}
          disabled={view.scale <= MIN_ZOOM}
          className={CONTROL_CLASS}
          aria-label="Zoom out"
        >
          <ZoomOut className="h-5 w-5" />
        </button>
        <button
          onClick={() => zoomBy(1.4)}
          disabled={view.scale >= MAX_ZOOM}
          className={CONTROL_CLASS}
          aria-label="Zoom in"
        >
          <ZoomIn className="h-5 w-5" />
        </button>
        <button onClick={reset} disabled={!zoomed} className={CONTROL_CLASS} aria-label="Reset zoom">
          <RotateCcw className="h-5 w-5" />
        </button>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={onPrev}
            className={cn(CONTROL_CLASS, "absolute left-4 top-1/2 z-10 -translate-y-1/2")}
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={onNext}
            className={cn(CONTROL_CLASS, "absolute right-4 top-1/2 z-10 -translate-y-1/2")}
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <p className="pointer-events-none absolute inset-x-0 bottom-5 z-10 text-center text-sm text-white/70">
        {img.alt} · {index + 1} / {images.length}
        <span className="mt-1 block text-xs text-white/40">
          Scroll or pinch to zoom · double-click to toggle · drag to pan
        </span>
      </p>
    </motion.div>
  );
}

export function MasonryGallery({ images, className }: MasonryGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length],
  );
  const next = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length],
  );

  if (images.length === 0) {
    return (
      <div className="rounded-3xl border-2 border-dashed border-ink-200 p-16 text-center dark:border-white/15">
        <p className="font-display text-2xl text-ink-700 dark:text-ink-200">No images yet.</p>
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
          Add photos to the shared Google Drive folder (or drop them into{" "}
          <code className="rounded bg-ink-100 px-2 py-1 text-xs dark:bg-white/10">/public/gallery</code>
          ) and they&apos;ll appear here on the next deploy.
        </p>
      </div>
    );
  }

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
          <Lightbox
            images={images}
            index={lightboxIndex}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </>
  );
}
