import { PageHeader } from "@/components/ui/PageHeader";
import { MasonryGallery } from "@/components/ui/MasonryGallery";
import { getGalleryImages } from "@/lib/gallery";

// Force this page to be statically generated with the latest folder contents at build time.
export const dynamic = "force-static";

export const metadata = {
  title: "Gallery",
  description:
    "Snapshots from journeys we've planned — fleets, destinations, and travellers across North India.",
};

// Fallback placeholder set for an empty /public/gallery folder.
const PLACEHOLDER_IMAGES = [
  { src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&q=80", alt: "Travelers walking", id: "p1" },
  { src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=80", alt: "Mountain road", id: "p2" },
  { src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&q=80", alt: "Paris arch", id: "p3" },
  { src: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=900&q=80", alt: "Highway journey", id: "p4" },
  { src: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=900&q=80", alt: "Misty road", id: "p5" },
  { src: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=900&q=80", alt: "Mountain horizon", id: "p6" },
  { src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&q=80", alt: "Desert dunes", id: "p7" },
  { src: "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?w=900&q=80", alt: "Forest road", id: "p8" },
  { src: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=900&q=80", alt: "Taj Mahal", id: "p9" },
  { src: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=900&q=80", alt: "Rajasthan fort", id: "p10" },
  { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&q=80", alt: "Kashmir valley", id: "p11" },
  { src: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=900&q=80", alt: "Himachal mountains", id: "p12" },
  { src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=80", alt: "Travel coach", id: "p13" },
  { src: "https://images.unsplash.com/photo-1556122071-e404eaedb77f?w=900&q=80", alt: "Premium coach", id: "p14" },
  { src: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=900&q=80", alt: "SUV vehicle", id: "p15" },
  { src: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=900&q=80", alt: "Tempo traveller", id: "p16" },
];

export default function GalleryPage() {
  const detected = getGalleryImages("gallery");
  const images = detected.length > 0 ? detected : PLACEHOLDER_IMAGES;

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Roads, regions, and the people who travelled them."
        description="Real moments from real trips. Drop new photos into /public/gallery and they'll appear here automatically."
      />

      <section className="pb-24">
        <div className="container-padded">
          <MasonryGallery images={images} />
        </div>
      </section>
    </>
  );
}
