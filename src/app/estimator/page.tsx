import { PageHeader } from "@/components/ui/PageHeader";
import { EnquiryEstimator } from "@/components/sections/EnquiryEstimator";

export const metadata = {
  title: "Fare Estimator",
  description:
    "Estimate your trip fare in seconds. Pick a route and vehicle to see distance, travel time, and an indicative round-trip cost across North India.",
};

export default function EstimatorPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fare Estimator"
        title="Plan your trip in 30 seconds."
        description="Pick a route, choose a vehicle, and see distance, travel time, and an indicative cost before you call."
      />
      <EnquiryEstimator showHeading={false} />
    </>
  );
}
