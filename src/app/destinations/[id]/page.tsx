import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DestinationDetail } from "@/components/destinations/DestinationDetail";
import { DESTINATIONS, getDestinationById } from "@/data/destinations";

interface Params {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return DESTINATIONS.map((d) => ({ id: d.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const dest = getDestinationById(id);
  if (!dest) return { title: "Destination not found" };

  return {
    title: dest.name,
    description: dest.shortDescription,
    openGraph: {
      title: dest.name,
      description: dest.shortDescription,
      images: [{ url: dest.image }],
    },
  };
}

export default async function DestinationPage({ params }: Params) {
  const { id } = await params;
  const dest = getDestinationById(id);
  if (!dest) notFound();

  return <DestinationDetail destination={dest} />;
}
