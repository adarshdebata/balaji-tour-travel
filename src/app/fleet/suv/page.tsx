import { PageHeader } from "@/components/ui/PageHeader";
import { VehicleCard } from "@/components/ui/VehicleCard";
import { getVehiclesByCategory } from "@/data/vehicles";

export const metadata = {
  title: "SUV Fleet",
  description:
    "Toyota Fortuner, Innova Crysta, and Maruti Ertiga — premium SUVs for executive travel and small group journeys.",
};

export default function SuvFleetPage() {
  const vehicles = getVehiclesByCategory("suv");

  return (
    <>
      <PageHeader
        eyebrow="Our Fleet · SUV"
        title="SUVs that handle the highway and the hill."
        description="Three workhorses for executive travel, family weekends, and adventures off the beaten path."
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
