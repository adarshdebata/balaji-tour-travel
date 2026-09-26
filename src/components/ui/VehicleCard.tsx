"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Briefcase, Wind, Check } from "lucide-react";
import type { Vehicle } from "@/types";
import { formatPrice } from "@/lib/utils";
import { BusOutlineGroup } from "@/components/ui/BusOutline";

interface VehicleCardProps {
  vehicle: Vehicle;
  index?: number;
}

const CATEGORY_LABELS: Record<Vehicle["category"], string> = {
  suv: "SUV",
  luxury: "Luxury",
  "tempo-traveller": "Tempo Traveller",
  "Mini-Bus": "Mini Bus",
  "luxury-coach": "Luxury Coach",
};

/** Hourly rate if the vehicle has one, else the day rate. */
function headlineRate(vehicle: Vehicle) {
  if (vehicle.pricePerHrs) return { amount: vehicle.pricePerHrs, unit: "/hr" };
  if (vehicle.pricePerDay) return { amount: vehicle.pricePerDay, unit: "/day" };
  return { amount: vehicle.pricePerKm, unit: "/km" };
}

export function VehicleCard({ vehicle, index = 0 }: VehicleCardProps) {
  // Hot-linked photos disappear without warning (four did); show the brand
  // mark instead of the browser's broken-image alt text.
  const [imageFailed, setImageFailed] = useState(!vehicle.image);
  const rate = headlineRate(vehicle);
  const showKmRate = rate.unit !== "/km";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-ink-200/60 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 dark:bg-ink-900 dark:ring-white/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-100 dark:bg-ink-800">
        {imageFailed ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-saffron-50 via-cream to-royal-50 text-gold-600 dark:from-royal-950 dark:via-ink-900 dark:to-ink-950 dark:text-gold-400">
            <svg viewBox="0 0 200 120" className="h-20 w-32" aria-hidden="true">
              <BusOutlineGroup strokeWidth={5} />
            </svg>
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-ink-500 dark:text-ink-400">
              Photo coming soon
            </span>
          </div>
        ) : (
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        )}
        <div className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-saffron-700 shadow-sm backdrop-blur">
          {CATEGORY_LABELS[vehicle.category]}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl leading-tight text-ink-900 dark:text-cream">{vehicle.name}</h3>
          <div className="shrink-0 text-right">
            <p className="text-[10px] uppercase tracking-[0.18em] text-ink-400 dark:text-ink-500">From</p>
            <p className="font-display text-xl text-saffron-700 dark:text-saffron-300">
              {formatPrice(rate.amount)}
              <span className="text-xs text-ink-500 dark:text-ink-400">{rate.unit}</span>
            </p>
            {showKmRate && (
              <p className="mt-0.5 text-[11px] text-ink-500 dark:text-ink-400">
                {formatPrice(vehicle.pricePerKm)}/km outstation
              </p>
            )}
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          {vehicle.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-y border-ink-100 py-4 text-xs text-ink-700 dark:border-white/10 dark:text-ink-200">
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-saffron-700" />
            {vehicle.seating} seats
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5 text-saffron-700" />
            {vehicle.luggage}
          </span>
          {vehicle.ac && (
            <span className="inline-flex items-center gap-1.5">
              <Wind className="h-3.5 w-3.5 text-saffron-700" />
              AC
            </span>
          )}
        </div>

        <ul className="mt-5 space-y-2">
          {vehicle.features.slice(0, 8).map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-ink-700 dark:text-ink-300">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-saffron-600 dark:text-saffron-400" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* mt-auto pins the buttons to the bottom so they line up across a row. */}
        <div className="mt-auto flex gap-2 pt-7">
          <Link href="/contact" className="btn-primary flex-1 !py-2.5 text-sm">
            Book Now
          </Link>
          <Link
            href="/contact"
            className="flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium text-ink-700 ring-1 ring-ink-200 transition-colors hover:bg-ink-50 dark:text-ink-200 dark:ring-white/15 dark:hover:bg-white/5"
          >
            Enquire
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
