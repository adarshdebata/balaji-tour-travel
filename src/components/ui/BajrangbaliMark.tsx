import { cn } from "@/lib/utils";

interface BajrangbaliMarkProps {
  className?: string;
  /** Unique-ish suffix to avoid gradient id collisions when several render. */
  idSuffix?: string;
  title?: string;
}

/**
 * Bajrangbali (Hanuman) emblem — a saffron→crimson devotional medallion with
 * a sun-burst halo, a left-facing deity profile crowned with a mukut, a
 * forehead tilak, and a gada (mace). Hand-authored SVG so it stays crisp at
 * any size and doubles as the site favicon.
 */
export function BajrangbaliMark({
  className,
  idSuffix = "bm",
  title = "Balaji — Bajrangbali emblem",
}: BajrangbaliMarkProps) {
  const disc = `disc-${idSuffix}`;
  const face = `face-${idSuffix}`;
  const ray = `ray-${idSuffix}`;

  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={cn("block", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={disc} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff9d3a" />
          <stop offset="55%" stopColor="#ff7e15" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id={face} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#f6c453" />
        </linearGradient>
        <radialGradient id={ray} cx="50%" cy="42%" r="55%">
          <stop offset="60%" stopColor="#fff7ed" stopOpacity="0" />
          <stop offset="100%" stopColor="#fff7ed" stopOpacity="0.35" />
        </radialGradient>
      </defs>

      {/* Medallion */}
      <circle cx="32" cy="32" r="30" fill={`url(#${disc})`} />
      <circle
        cx="32"
        cy="32"
        r="29.2"
        fill="none"
        stroke="#fff7ed"
        strokeOpacity="0.55"
        strokeWidth="1.2"
      />

      {/* Sun-burst halo behind the figure. Coordinates are rounded to a fixed
          precision so the server- and client-rendered strings match exactly
          (raw floats serialize differently across runtimes → hydration error). */}
      <g stroke="#fff7ed" strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const r = (n: number) => (Math.round(n * 1000) / 1000).toString();
          return (
            <line
              key={i}
              x1={r(32 + Math.cos(a) * 17)}
              y1={r(32 + Math.sin(a) * 17)}
              x2={r(32 + Math.cos(a) * 22.5)}
              y2={r(32 + Math.sin(a) * 22.5)}
            />
          );
        })}
      </g>
      <circle cx="32" cy="32" r="22" fill={`url(#${ray})`} />

      {/* Gada (mace) — devotional attribute, set behind the shoulder */}
      <g transform="rotate(20 46 36)">
        <rect x="44.6" y="33" width="2.8" height="17" rx="1.4" fill="#7f3012" />
        <ellipse cx="46" cy="30.5" rx="5.2" ry="5.6" fill="#fde68a" stroke="#9e3811" strokeWidth="1" />
        <circle cx="46" cy="51" r="2.1" fill="#9e3811" />
      </g>

      {/* Mukut (crown) */}
      <g fill="#f59e0b" stroke="#9e3811" strokeWidth="0.6" strokeLinejoin="round">
        <path d="M24 20 L27 12 L30.5 17.5 L34 9 L37.5 17.5 L41 12 L44 20 Z" />
        <rect x="24" y="19" width="20" height="3" rx="1.2" />
      </g>
      <circle cx="34" cy="8" r="1.7" fill="#fde68a" stroke="#9e3811" strokeWidth="0.5" />

      {/* Hanuman profile (facing left), crowned head */}
      <path
        d="M38 47
           C 30 47, 25 44.5, 23.5 39
           C 22.8 37.5, 20 37, 17 35
           C 14 33.4, 14 30.6, 17.2 29.6
           L 22 28.8
           C 22.6 26.6, 23 24.6, 26 23.4
           C 27 20, 30 18.4, 34 18.4
           C 40 18.4, 44 23, 44 30.5
           C 44 39, 42.4 45, 38 47 Z"
        fill={`url(#${face})`}
        stroke="#9e3811"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />

      {/* Tilak on the forehead */}
      <path
        d="M28.4 23.8 q1.4 4 0 8 q-1.4 -4 0 -8 Z"
        fill="#b91c1c"
      />
      {/* Eye */}
      <circle cx="29.6" cy="29.4" r="1.05" fill="#3a3e46" />
    </svg>
  );
}
