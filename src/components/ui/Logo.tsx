import Link from "next/link";
import { cn } from "@/lib/utils";
import { BusBadge } from "@/components/ui/BusBadge";

interface LogoProps {
  className?: string;
  variant?: "default" | "white";
}

export function Logo({ className, variant = "default" }: LogoProps) {
  const isWhite = variant === "white";

  return (
    <Link href="/" className={cn("group inline-flex items-center gap-3", className)}>
      <div className="relative shrink-0">
        <BusBadge
          idSuffix={isWhite ? "logo-white" : "logo"}
          className={cn(
            "h-11 w-11 rounded-full shadow-lg ring-1 ring-gold-400/40",
            "transition-transform duration-500 group-hover:rotate-[8deg]",
          )}
        />
      </div>
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-xl font-medium tracking-tight",
            isWhite ? "text-white" : "text-ink-900 dark:text-cream",
          )}
        >
          Balaji
        </span>
        <span
          className={cn(
            "text-[10px] font-medium uppercase tracking-[0.22em]",
            isWhite ? "text-gold-200" : "text-royal-700 dark:text-gold-400",
          )}
        >
          Tour &amp; Travel Line
        </span>
      </div>
    </Link>
  );
}
