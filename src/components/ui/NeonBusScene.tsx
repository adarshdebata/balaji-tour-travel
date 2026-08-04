import { cn } from "@/lib/utils";
import { BusOutlineGroup } from "@/components/ui/BusOutline";

/**
 * Neon-sign loading animation: the badge's bus reduced to a glowing outline,
 * driving along a neon road and trailing smog.
 *
 * Nothing is filled — the tube *is* the artwork. The outline draws itself on,
 * flickers as it "powers on", then holds while the road, wheels, smog and speed
 * streaks carry the motion. The bus itself stays put and the world moves past
 * it, which reads as driving without ever leaving the frame.
 */

/** Smog puffs off the rear wheel; each is the same drift with its own timing. */
const SMOG_PUFFS = [
  { cx: 96, cy: 150, r: 9, delay: 0, duration: 2.6, opacity: 0.5 },
  { cx: 92, cy: 144, r: 7, delay: 0.45, duration: 3, opacity: 0.4 },
  { cx: 99, cy: 152, r: 11, delay: 0.9, duration: 2.8, opacity: 0.45 },
  { cx: 90, cy: 147, r: 6, delay: 1.35, duration: 3.2, opacity: 0.35 },
  { cx: 97, cy: 149, r: 9.5, delay: 1.8, duration: 2.7, opacity: 0.42 },
  { cx: 93, cy: 145, r: 7.5, delay: 2.2, duration: 3.1, opacity: 0.38 },
];

/**
 * Thin streaks flying past to sell speed. Kept above the roof (y < 58) — the
 * bus has no fill, so anything crossing its body shows straight through it.
 */
const SPEED_STREAKS = [
  { y: 26, width: 46, delay: 0.2, duration: 1.9 },
  { y: 40, width: 32, delay: 1.1, duration: 2.2 },
  { y: 52, width: 54, delay: 0.7, duration: 1.7 },
];

export function NeonBusScene({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("relative w-full select-none", className)}>
      <svg viewBox="0 0 340 190" className="w-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="neon-smog" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id="neon-pool" x="-50%" y="-200%" width="200%" height="500%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
          {/* Road fades out at both ends so it never collides with the frame. */}
          <linearGradient id="neon-road" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
            <stop offset="20%" stopColor="#c084fc" stopOpacity="0.95" />
            <stop offset="80%" stopColor="#c084fc" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="neon-streak" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e3a33c" stopOpacity="0" />
            <stop offset="100%" stopColor="#f7d488" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Smog trail, behind everything */}
        <g filter="url(#neon-smog)">
          {SMOG_PUFFS.map((puff, i) => (
            <circle
              key={i}
              cx={puff.cx}
              cy={puff.cy}
              r={puff.r}
              fill="#c9b3e8"
              opacity="0"
              className="motion-safe:animate-smog-drift"
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                animationDelay: `${puff.delay}s`,
                animationDuration: `${puff.duration}s`,
                ["--smog-peak" as string]: puff.opacity,
              }}
            />
          ))}
        </g>

        {/* Speed streaks */}
        {SPEED_STREAKS.map((streak, i) => (
          <rect
            key={i}
            x={250}
            y={streak.y}
            width={streak.width}
            height={2}
            rx={1}
            fill="url(#neon-streak)"
            opacity="0"
            className="motion-safe:animate-speed-streak"
            style={{
              animationDelay: `${streak.delay}s`,
              animationDuration: `${streak.duration}s`,
            }}
          />
        ))}

        {/* Light pooling on the road under the bus */}
        <ellipse cx="170" cy="153" rx="80" ry="4" fill="#a855f7" opacity="0.32" filter="url(#neon-pool)" />

        {/* Neon road: a solid glow line with a dashed lane marking flowing past */}
        <g className="neon-tube">
          <line x1="0" y1="150" x2="340" y2="150" stroke="url(#neon-road)" strokeWidth="2.5" />
          <line
            x1="0"
            y1="150"
            x2="340"
            y2="150"
            stroke="url(#neon-road)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="34 26"
            className="motion-safe:animate-road-flow"
          />
        </g>

        {/* The bus */}
        <g className="motion-safe:animate-bus-bob">
          <g className="neon-tube neon-draw motion-safe:animate-neon-flicker" color="#ffe6b0">
            <g transform="translate(70 46)">
              <BusOutlineGroup strokeWidth={5} spin />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
