import { PageHeader } from "@/components/ui/PageHeader";
import { VehicleCard } from "@/components/ui/VehicleCard";
import { getVehiclesByCategory } from "@/data/vehicles";

export const metadata = {
  title: "Tempo Traveller Fleet",
  description:
    "12, 17, and 20-seater Tempo Travellers including the premium Force Urbania — built for group tours, family trips, and pilgrimages.",
};

export default function TempoTravellerFleetPage() {
  const vehicles = getVehiclesByCategory("tempo-traveller");

  return (
    <>
      <PageHeader
        eyebrow="Our Fleet · Tempo Traveller"
        title="The signature coaches that built our reputation."
        description="The right balance of seats, comfort, and road-readiness — for groups of 12 to 20."
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
