import { cn } from "@/lib/utils";

/**
 * A bus driving along a road, built entirely from HTML elements + CSS
 * keyframes (no SVG, no images). Motion is implied by spinning wheels, a
 * scrolling road centre-line, a gentle suspension bob and exhaust puffs.
 * Transform/opacity-only animations keep it GPU-friendly, and everything is
 * sized in rem so it scales cleanly on mobile and desktop.
 */
export function BusScene({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative mx-auto h-52 w-full max-w-sm select-none sm:max-w-md", className)}
    >
      {/* Drifting clouds */}
      <div className="motion-safe:animate-float absolute left-6 top-6 h-3 w-12 rounded-full bg-white/70" />
      <div className="motion-safe:animate-float absolute right-10 top-10 h-2.5 w-9 rounded-full bg-white/60" style={{ animationDelay: "1.4s" }} />

      {/* Bus (sits on the road, gentle bob) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="motion-safe:animate-bus-bob relative">
          {/* Exhaust puffs */}
          <span className="motion-safe:animate-exhaust absolute -left-3 bottom-2 h-2.5 w-2.5 rounded-full bg-ink-300/70" />
          <span className="motion-safe:animate-exhaust absolute -left-3 bottom-2 h-2.5 w-2.5 rounded-full bg-ink-300/70" style={{ animationDelay: "0.6s" }} />

          {/* Body */}
          <div className="relative h-20 w-44">
            <div className="absolute inset-0 rounded-2xl rounded-tr-[2.25rem] bg-gradient-to-b from-saffron-400 via-saffron-500 to-saffron-600 shadow-xl ring-1 ring-saffron-700/30" />
            {/* Roof rail */}
            <div className="absolute -top-1.5 left-5 right-10 h-2.5 rounded-full bg-saffron-600" />
            {/* Destination board */}
            <div className="absolute left-1/2 top-2 h-3 w-20 -translate-x-1/2 rounded-sm bg-ink-900/90">
              <div className="absolute left-1.5 right-1.5 top-1/2 h-0.5 -translate-y-1/2 rounded bg-amber-300/80" />
            </div>
            {/* Windows */}
            <div className="absolute left-3 top-6 flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-6 w-7 rounded-md bg-sky-100/90 ring-1 ring-sky-200/80" />
              ))}
            </div>
            {/* Windshield */}
            <span className="absolute right-2.5 top-6 h-6 w-7 rounded-md rounded-tr-xl bg-sky-100/90 ring-1 ring-sky-200/80" />
            {/* Livery stripe */}
            <div className="absolute inset-x-0 bottom-4 h-1.5 bg-crimson-600" />
            {/* Headlight */}
            <span className="absolute bottom-1.5 right-1.5 h-2 w-2 rounded-full bg-amber-200 shadow-[0_0_8px_2px_rgba(253,230,138,0.7)]" />
            {/* Door seam */}
            <span className="absolute bottom-4 left-12 h-9 w-px bg-saffron-700/40" />

            {/* Wheels */}
            {[
              { side: "left-5" },
              { side: "right-5" },
            ].map(({ side }) => (
              <div key={side} className={cn("absolute -bottom-4 grid h-10 w-10 place-items-center rounded-full bg-ink-900 ring-4 ring-ink-700", side)}>
                <div className="motion-safe:animate-wheel-spin relative h-6 w-6 rounded-full border-2 border-ink-500">
                  <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-ink-500" />
                  <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-ink-500" />
                </div>
                <span className="absolute h-2 w-2 rounded-full bg-ink-400" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Road */}
      <div className="absolute inset-x-0 bottom-0 h-12 overflow-hidden rounded-xl bg-ink-800">
        <div className="absolute inset-x-0 top-0 h-1 bg-ink-600" />
        {/* Scrolling centre-line (24px dash, 48px period → loops on -48px) */}
        <div
          className="motion-safe:animate-road-dash absolute left-0 top-1/2 h-1.5 w-[200%] -translate-y-1/2"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #ffd27f 0 24px, transparent 24px 48px)",
          }}
        />
      </div>
    </div>
  );
}
