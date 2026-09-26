import { cn } from "@/lib/utils";
import { BusOutlineGroup } from "@/components/ui/BusOutline";

interface BusBadgeProps {
  className?: string;
  /** Unique-ish suffix so clip-path ids don't collide when several render. */
  idSuffix?: string;
  title?: string;
}

/**
 * Balaji brand mark — a deep-purple disc holding a gold line-art bus on a road,
 * under a sun and two clouds. Hand-authored SVG so it stays crisp at any size
 * and doubles as the favicon.
 */
export function BusBadge({
  className,
  idSuffix = "bb",
  title = "Balaji Tour & Travel Line",
}: BusBadgeProps) {
  const clip = `badge-clip-${idSuffix}`;

  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={cn("block", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={clip}>
          <circle cx="32" cy="32" r="32" />
        </clipPath>
      </defs>

      {/* Disc + inner keyline */}
      <circle cx="32" cy="32" r="32" fill="#5a1e72" />
      <circle cx="32" cy="32" r="28.4" fill="none" stroke="#ffffff" strokeWidth="1.1" />

      {/* Sky: sun and two clouds */}
      <g fill="#ffffff">
        <circle cx="32" cy="14.6" r="3.3" />

        <g>
          <circle cx="17.6" cy="21.6" r="2.2" />
          <circle cx="20.4" cy="20.3" r="2.9" />
          <circle cx="23.2" cy="21.6" r="2.2" />
          <rect x="17" y="21.2" width="6.9" height="2.6" rx="1.3" />
        </g>
        <g>
          <circle cx="40.8" cy="21.6" r="2.2" />
          <circle cx="43.6" cy="20.3" r="2.9" />
          <circle cx="46.4" cy="21.6" r="2.2" />
          <rect x="40.2" y="21.2" width="6.9" height="2.6" rx="1.3" />
        </g>
      </g>

      {/* Road — clipped to the disc so it stops at the rim */}
      <g clipPath={`url(#${clip})`}>
        <line x1="0" y1="46.4" x2="64" y2="46.4" stroke="#ffffff" strokeWidth="1.4" />
      </g>

      {/* Bus, scaled from its native 200×120 space so the wheels land on the
          road line and the body centres on the disc. */}
      <g transform="translate(12 25.6) scale(0.2)" color="#e3a33c">
        <BusOutlineGroup strokeWidth={6} />
      </g>
    </svg>
  );
}
