/**
 * The line-art bus from the Balaji badge, as reusable SVG geometry.
 *
 * Drawn in a 200×120 space with strokes only and no fills, because that is what
 * both consumers need: the gold mark inside the logo disc, and the loader's
 * neon tube — a neon sign is an outline with a glow stacked behind it.
 *
 * Detail is kept deliberately sparse. The mark renders at 32–44px in the header
 * and favicon, where extra slats and trim lines collapse into noise, so the
 * silhouette carries the shape and only two dots survive as detail.
 *
 * Every shape carries `pathLength={1}`, which normalises its length regardless
 * of geometry, so one `stroke-dashoffset: 1 → 0` keyframe draws the whole bus.
 */

/** Wheel centres. Wheels hang below the body (bottom edge y=84) onto y=104. */
const WHEEL_X = [62, 146];
const WHEEL_Y = 90;
const SPOKE_ANGLES = [0, 60, 120];

export function BusOutlineGroup({
  strokeWidth = 6,
  spin = false,
}: {
  strokeWidth?: number;
  /** Rotates the wheel spokes — used by the loader, not the static mark. */
  spin?: boolean;
}) {
  return (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Roof hump — open at the bottom so it reads as merging into the body. */}
      <path d="M44 36 v-6 a16 16 0 0 1 16 -16 h80 a16 16 0 0 1 16 16 v6" pathLength={1} />

      {/* Body */}
      <rect x="14" y="34" width="172" height="50" rx="16" pathLength={1} />

      {/* Passenger window band, split into panes */}
      <rect x="54" y="48" width="86" height="26" rx="6" pathLength={1} />
      <line x1="82" y1="48" x2="82" y2="74" pathLength={1} />
      <line x1="110" y1="48" x2="110" y2="74" pathLength={1} />

      {/* Driver's window */}
      <rect x="150" y="48" width="26" height="26" rx="6" pathLength={1} />

      {/* Door handle and headlight */}
      <circle cx="120" cy="79" r="2" pathLength={1} />
      <circle cx="170" cy="79" r="2.5" pathLength={1} />

      {/* Wheels. Spokes are integer coordinates rotated by whole degrees so the
          server and client serialise identical strings (floats would not). */}
      {WHEEL_X.map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={WHEEL_Y} r="14" pathLength={1} />
          <g
            className={spin ? "motion-safe:animate-wheel-spin" : undefined}
            style={spin ? { transformBox: "fill-box", transformOrigin: "center" } : undefined}
          >
            <circle cx={cx} cy={WHEEL_Y} r="5" pathLength={1} />
            {SPOKE_ANGLES.map((angle) => (
              <g key={angle} transform={`rotate(${angle} ${cx} ${WHEEL_Y})`}>
                <line x1={cx} y1={WHEEL_Y - 6} x2={cx} y2={WHEEL_Y - 12} pathLength={1} />
                <line x1={cx} y1={WHEEL_Y + 6} x2={cx} y2={WHEEL_Y + 12} pathLength={1} />
              </g>
            ))}
          </g>
        </g>
      ))}
    </g>
  );
}
