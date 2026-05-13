import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "white";
}

export function Logo({ className, variant = "default" }: LogoProps) {
  const isWhite = variant === "white";

  return (
    <Link href="/" className={cn("group inline-flex items-center gap-3", className)}>
      <div className="relative">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full",
            "bg-gradient-to-br from-saffron-500 to-crimson-600 text-white shadow-lg",
            "ring-1 ring-saffron-300/40 transition-transform duration-500 group-hover:rotate-12",
          )}
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            <path
              d="M12 2L13.5 8.5L20 7L15.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 12L4 7L10.5 8.5L12 2Z"
              fill="currentColor"
              fillOpacity="0.95"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-xl font-medium tracking-tight",
            isWhite ? "text-white" : "text-ink-900",
          )}
        >
          Balaji
        </span>
        <span
          className={cn(
            "text-[10px] font-medium uppercase tracking-[0.22em]",
            isWhite ? "text-saffron-200" : "text-saffron-700",
          )}
        >
          Tour &amp; Travel Line
        </span>
      </div>
    </Link>
  );
}
