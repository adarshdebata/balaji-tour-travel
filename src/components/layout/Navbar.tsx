"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { CONTACT, NAV_ITEMS } from "@/constants/site";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-cream/85 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.04)]"
          : "bg-transparent",
      )}
    >
      <div className="container-padded">
        <nav className="flex h-20 items-center justify-between">
          <Logo />

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              if (item.children) {
                return (
                  <li
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.href)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className={cn(
                        "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium",
                        "transition-colors hover:text-saffron-700",
                        isActive ? "text-saffron-700" : "text-ink-700",
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-300",
                          openDropdown === item.href && "rotate-180",
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {openDropdown === item.href && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
                        >
                          <div className="min-w-[220px] rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-ink-200/60">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                                  "hover:bg-saffron-50 hover:text-saffron-700",
                                  pathname === child.href && "bg-saffron-50 text-saffron-700",
                                )}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      "hover:text-saffron-700",
                      isActive ? "text-saffron-700" : "text-ink-700",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${CONTACT.phonePrimary.replace(/\s/g, "")}`}
              className="btn-primary !py-2.5 !px-5 text-sm"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full bg-white/70 ring-1 ring-ink-200 backdrop-blur"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5 text-ink-900" />
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-50 bg-ink-950/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="lg:hidden fixed inset-y-0 right-0 z-50 w-[88%] max-w-sm bg-cream shadow-2xl"
            >
              <div className="flex h-20 items-center justify-between px-6">
                <Logo />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-ink-200"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="px-6 pt-4">
                <ul className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => (
                    <MobileNavItem
                      key={item.href}
                      item={item}
                      pathname={pathname}
                    />
                  ))}
                </ul>

                <div className="mt-8 border-t border-ink-200 pt-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-saffron-700">
                    Reach us
                  </p>
                  <a
                    href={`tel:${CONTACT.phonePrimary.replace(/\s/g, "")}`}
                    className="mt-3 block font-display text-2xl text-ink-900"
                  >
                    {CONTACT.phonePrimary}
                  </a>
                  <a
                    href={`tel:${CONTACT.phonePrimary.replace(/\s/g, "")}`}
                    className="btn-primary mt-5 w-full"
                  >
                    <Phone className="h-4 w-4" />
                    Call Now
                  </a>
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileNavItem({
  item,
  pathname,
}: {
  item: (typeof NAV_ITEMS)[number];
  pathname: string;
}) {
  const [open, setOpen] = useState(false);

  if (item.children) {
    return (
      <li>
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-ink-900 hover:bg-saffron-50"
        >
          {item.label}
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              open && "rotate-180",
            )}
          />
        </button>
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden pl-3"
            >
              {item.children.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    className={cn(
                      "block rounded-xl px-4 py-2.5 text-sm",
                      pathname === child.href
                        ? "bg-saffron-50 text-saffron-700"
                        : "text-ink-700",
                    )}
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={item.href}
        className={cn(
          "block rounded-xl px-4 py-3 text-base font-medium",
          pathname === item.href
            ? "bg-saffron-50 text-saffron-700"
            : "text-ink-900 hover:bg-saffron-50",
        )}
      >
        {item.label}
      </Link>
    </li>
  );
}
