import { PageHeader } from "@/components/ui/PageHeader";
import { VehicleCard } from "@/components/ui/VehicleCard";
import { getVehiclesByCategory } from "@/data/vehicles";

export const metadata = {
  title: "Luxury Fleet",
  description:
    "Chauffeur-driven luxury cars for weddings, VIP pickups, and executive travel.",
};

export default function LuxuryFleetPage() {
  const vehicles = getVehiclesByCategory("luxury");

  return (
    <>
      <PageHeader
        eyebrow="Our Fleet · Luxury"
        title="Arrive the way the occasion deserves."
        description="Chauffeur-driven luxury cars for weddings, VIP guests, and executive travel."
      />

      <section className="pb-24">
        <div className="container-padded">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((v, i) => (
              <VehicleCard key={v.id} vehicle={v} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
