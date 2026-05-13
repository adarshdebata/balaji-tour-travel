"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calculator, MapPin, Navigation, Clock, IndianRupee } from "lucide-react";
import { PRICING_PER_KM, ROUTES, SOURCES } from "@/data/routes";
import { formatNumber, formatPrice } from "@/lib/utils";
import Link from "next/link";

const VEHICLE_OPTIONS = Object.keys(PRICING_PER_KM);

export function EnquiryEstimator() {
  const [source, setSource] = useState<string>(SOURCES[0]);
  const [destination, setDestination] = useState<string>("");
  const [vehicle, setVehicle] = useState<string>(VEHICLE_OPTIONS[3]);

  const destinations = useMemo(
    () =>
      Array.from(new Set(ROUTES.filter((r) => r.source === source).map((r) => r.destination))),
    [source],
  );

  const route = useMemo(
    () => ROUTES.find((r) => r.source === source && r.destination === destination),
    [source, destination],
  );

  const estimate = useMemo(() => {
    if (!route) return null;
    const ratePerKm = PRICING_PER_KM[vehicle] ?? 18;
    // Round-trip estimate, minimum 250km/day
    const roundTripKm = route.distanceKm * 2;
    const baseCost = roundTripKm * ratePerKm;
    const driverAllowance = 500;
    const total = baseCost + driverAllowance;
    return {
      roundTripKm,
      ratePerKm,
      baseCost,
      driverAllowance,
      total,
    };
  }, [route, vehicle]);

  return (
    <section id="enquiry" className="relative py-24 lg:py-32 bg-white/50">
      <div className="container-padded">
        <div className="mx-auto max-w-2xl text-center">
          <div className="eyebrow justify-center">Quick Estimator</div>
          <h2 className="display-text mt-6 text-4xl sm:text-5xl lg:text-6xl">
            Plan your trip in 30 seconds.
          </h2>
          <p className="mt-5 text-base text-ink-600 sm:text-lg">
            Pick a route, choose a vehicle, see what your journey looks like
            before you call.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="rounded-3xl bg-white p-8 ring-1 ring-ink-200/60 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-saffron-100 text-saffron-700">
                  <Calculator className="h-5 w-5" />
                </span>
                <h3 className="font-display text-xl text-ink-900">Trip details</h3>
              </div>

              <div className="mt-8 space-y-5">
                <Field label="From" icon={<MapPin className="h-4 w-4" />}>
                  <select
                    value={source}
                    onChange={(e) => {
                      setSource(e.target.value);
                      setDestination("");
                    }}
                    className="w-full appearance-none bg-transparent text-base font-medium text-ink-900 focus:outline-none"
                  >
                    {SOURCES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="To" icon={<Navigation className="h-4 w-4" />}>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full appearance-none bg-transparent text-base font-medium text-ink-900 focus:outline-none"
                  >
                    <option value="">Select destination</option>
                    {destinations.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Vehicle" icon={<IndianRupee className="h-4 w-4" />}>
                  <select
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    className="w-full appearance-none bg-transparent text-base font-medium text-ink-900 focus:outline-none"
                  >
                    {VEHICLE_OPTIONS.map((v) => (
                      <option key={v} value={v}>
                        {v} — ₹{PRICING_PER_KM[v]}/km
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <p className="mt-6 text-[11px] uppercase tracking-[0.15em] text-ink-400">
                *Indicative pricing. Final quote confirmed by our team.
              </p>
            </div>
          </motion.div>

          {/* Result */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            {!route ? (
              <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-ink-200 p-12 text-center">
                <Navigation className="h-10 w-10 text-ink-300" />
                <p className="mt-4 font-display text-2xl text-ink-700">
                  Select a destination to see your estimate
                </p>
                <p className="mt-2 text-sm text-ink-500">
                  Distance, travel time, and approximate cost will appear here.
                </p>
              </div>
            ) : (
              <div className="rounded-3xl bg-gradient-to-br from-ink-950 via-ink-900 to-ink-950 p-8 text-cream shadow-2xl sm:p-10">
                <p className="text-xs uppercase tracking-[0.2em] text-saffron-300">
                  Your estimate
                </p>
                <h3 className="mt-3 font-display text-3xl text-cream sm:text-4xl">
                  {source} → {destination}
                </h3>

                <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
                  <Stat
                    icon={<Navigation className="h-4 w-4" />}
                    label="One-way"
                    value={`${formatNumber(route.distanceKm)} km`}
                  />
                  <Stat
                    icon={<Clock className="h-4 w-4" />}
                    label="Travel time"
                    value={`~${route.estimatedHours} hrs`}
                  />
                  <Stat
                    icon={<IndianRupee className="h-4 w-4" />}
                    label="Rate"
                    value={`₹${estimate!.ratePerKm}/km`}
                  />
                </div>

                <div className="mt-8 space-y-2.5 border-t border-white/10 pt-6 text-sm">
                  <Row label={`Round trip (${formatNumber(estimate!.roundTripKm)} km × ₹${estimate!.ratePerKm})`} value={formatPrice(estimate!.baseCost)} />
                  <Row label="Driver allowance" value={formatPrice(estimate!.driverAllowance)} />
                  <div className="mt-4 flex items-baseline justify-between border-t border-white/10 pt-4">
                    <span className="text-sm uppercase tracking-[0.2em] text-saffron-300">Estimated total</span>
                    <span className="font-display text-3xl text-cream sm:text-4xl">
                      {formatPrice(estimate!.total)}
                    </span>
                  </div>
                </div>

                {route.popularStops.length > 0 && (
                  <div className="mt-8 border-t border-white/10 pt-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-saffron-300">
                      Popular stops along the way
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {route.popularStops.map((stop) => (
                        <span
                          key={stop}
                          className="rounded-full bg-white/5 px-3 py-1.5 text-xs ring-1 ring-white/10"
                        >
                          {stop}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <Link
                  href="/contact"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-saffron-500 px-7 py-3.5 font-medium text-white shadow-lg transition-all hover:bg-saffron-400"
                >
                  Confirm booking with our team
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-500">
        {label}
      </span>
      <div className="mt-2 flex items-center gap-3 rounded-2xl bg-cream px-4 py-3.5 ring-1 ring-ink-200 transition-all focus-within:ring-2 focus-within:ring-saffron-400">
        <span className="text-saffron-700">{icon}</span>
        {children}
      </div>
    </label>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-saffron-300">
        {icon}
        <span className="text-[11px] uppercase tracking-[0.18em]">{label}</span>
      </div>
      <p className="mt-2 font-display text-2xl text-cream">{value}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-cream/80">
      <span>{label}</span>
      <span className="font-medium text-cream">{value}</span>
    </div>
  );
}
