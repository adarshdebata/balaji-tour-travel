import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { CONTACT, NAV_ITEMS, SITE_CONFIG } from "@/constants/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden bg-ink-950 text-cream">
      {/* Mountain silhouette */}
      <div className="absolute inset-x-0 top-0 -translate-y-full" aria-hidden="true">
        <svg
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="block h-32 w-full sm:h-40"
        >
          <path
            d="M0,200 L0,140 L120,80 L220,120 L340,40 L480,110 L600,30 L760,100 L900,50 L1080,120 L1220,60 L1360,110 L1440,80 L1440,200 Z"
            fill="rgb(15 16 19)"
          />
          <path
            d="M0,200 L0,170 L160,130 L300,160 L420,110 L560,150 L700,120 L840,160 L980,130 L1120,170 L1260,140 L1440,170 L1440,200 Z"
            fill="rgb(45 47 53)"
            opacity="0.8"
          />
        </svg>
      </div>

      <div className="container-padded relative pt-20 pb-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-5">
            <Logo variant="white" />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/70">
              {SITE_CONFIG.description}
            </p>

            <div className="mt-8 flex gap-3">
              {[
                { icon: Facebook, href: CONTACT.socials.facebook, label: "Facebook" },
                { icon: Instagram, href: CONTACT.socials.instagram, label: "Instagram" },
                { icon: Youtube, href: CONTACT.socials.youtube, label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 transition-all hover:bg-saffron-500 hover:ring-saffron-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore column */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.25em] text-saffron-300">
              Explore
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-cream/75 transition-colors hover:text-saffron-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="lg:col-span-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-saffron-300">
              Get in touch
            </h4>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-saffron-300" />
                <div className="text-cream/85">
                  <a href={`tel:${CONTACT.phonePrimary.replace(/\s/g, "")}`} className="block hover:text-saffron-200">
                    {CONTACT.phonePrimary}
                  </a>
                  <a href={`tel:${CONTACT.phoneSecondary.replace(/\s/g, "")}`} className="block hover:text-saffron-200">
                    {CONTACT.phoneSecondary}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-saffron-300" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-cream/85 hover:text-saffron-200"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-saffron-300" />
                <span className="text-cream/85">
                  {CONTACT.address.line1}, {CONTACT.address.city} — {CONTACT.address.pincode}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-cream/50">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-xs text-cream/50">
            Crafted with care for travellers across India.
          </p>
        </div>
      </div>
    </footer>
  );
}
