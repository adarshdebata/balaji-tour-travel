import { PageHeader } from "@/components/ui/PageHeader";
import { VehicleCard } from "@/components/ui/VehicleCard";
import { getVehiclesByCategory } from "@/data/vehicles";

export const metadata = {
  title: "Luxury Coaches",
  description:
    "30 to 45-seater premium and Volvo coaches for weddings, corporate offsites, and large pilgrimage groups.",
};

export default function LuxuryCoachesPage() {
  const vehicles = getVehiclesByCategory("luxury-coach");

  return (
    <>
      <PageHeader
        eyebrow="Our Fleet · Luxury Coaches"
        title="First-class travel for large groups."
        description="When the group is big and the standards are high — these are the coaches we send."
      />

      <section className="pb-24">
        <div className="container-padded">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {vehicles.map((v, i) => (
              <VehicleCard key={v.id} vehicle={v} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
