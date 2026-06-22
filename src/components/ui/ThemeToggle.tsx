"use client";

import { useCallback } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Dark/light theme toggle. The visible icon is driven purely by the `dark`
 * class on <html> (Sun shown in dark, Moon in light) so there is no theme
 * state in React and therefore no hydration mismatch. The choice is persisted
 * to localStorage and read back by the inline init script in the layout.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const toggle = useCallback(() => {
    const el = document.documentElement;
    const isDark = el.classList.toggle("dark");
    el.style.colorScheme = isDark ? "dark" : "light";
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      /* storage unavailable — toggle still works for the session */
    }
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle theme"
      className={cn(
        "relative flex h-11 w-11 items-center justify-center rounded-full",
        "bg-white/70 text-ink-700 ring-1 ring-ink-200 backdrop-blur",
        "transition-all duration-300 hover:text-saffron-700 hover:ring-saffron-300",
        "dark:bg-white/10 dark:text-cream dark:ring-white/15 dark:hover:text-saffron-300",
        className,
      )}
    >
      <Sun className="hidden h-5 w-5 transition-transform duration-300 dark:block" />
      <Moon className="block h-5 w-5 transition-transform duration-300 dark:hidden" />
    </button>
  );
}
