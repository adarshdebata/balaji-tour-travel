import { DEMO_MODE, DEVELOPER } from "@/constants/site";

/**
 * Marks the site as a preview build: a slim strip above the navbar (scrolls
 * away) plus a corner ribbon that stays on screen, so every screenshot of the
 * demo says so. Renders nothing once DEMO_MODE is off.
 */
export function DemoBanner() {
  if (!DEMO_MODE) return null;

  return (
    <>
      <div className="relative z-[51] bg-ink-950 text-cream">
        <p className="container-padded flex items-center justify-center gap-2 py-2 text-center text-[11px] tracking-wide sm:text-xs">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-saffron-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-saffron-500" />
          </span>
          <span>
            <span className="font-semibold text-gold-300">Demo preview</span>
            <span className="hidden sm:inline"> — not the final site</span>
            <span className="text-cream/50"> · </span>
            <span className="hidden sm:inline">Designed &amp; developed </span>
            by{" "}
            <a
              href={DEVELOPER.url}
              target="_blank"
              rel="noopener"
              className="font-medium text-gold-300 underline decoration-gold-300/40 underline-offset-2 hover:decoration-gold-300"
            >
              {DEVELOPER.name}
            </a>
          </span>
        </p>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-0 left-0 z-[45] h-28 w-28 overflow-hidden"
      >
        <div className="absolute bottom-[22px] left-[-38px] w-40 rotate-45 bg-gradient-to-r from-saffron-500 to-crimson-600 py-1 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-white shadow-lg">
          Demo
        </div>
      </div>
    </>
  );
}
