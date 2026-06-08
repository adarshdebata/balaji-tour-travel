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
  { src: "https://images.unsplash.com/photo-1628699543232-dc241b48a4b3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Travelers walking", id: "p1" },
  { src: "https://images.unsplash.com/photo-1580734690417-e9387612657f?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Mountain road", id: "p2" },
  { src: "https://images.unsplash.com/photo-1604935385675-92bdee60deb2?q=80&w=1130&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Paris arch", id: "p3" },
  { src: "https://images.unsplash.com/photo-1676001155384-ac86cf1e462a?q=80&w=436&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Highway journey", id: "p4" },
  { src: "https://images.unsplash.com/photo-1684574409329-d8e82157ee85?q=80&w=389&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Misty road", id: "p5" },
  { src: "https://images.unsplash.com/photo-1607836046730-3317bd58a31b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Mountain horizon", id: "p6" },
  { src: "https://images.unsplash.com/photo-1583756886694-583226ccdfd2?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Desert dunes", id: "p7" },
  { src: "https://images.unsplash.com/photo-1663918455395-49146be36cbb?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D80", alt: "Taj Mahal", id: "p8" },
  { src: "https://images.unsplash.com/photo-1708884831332-56f4e081fabe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwcm9hZHxlbnwwfHwwfHx8MA%3D%3D", alt: "Forest road", id: "p9" },
  { src: "https://images.unsplash.com/photo-1735050080783-7b3a661fb7cf?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Rajasthan fort", id: "p10" },
  { src: "https://images.unsplash.com/photo-1683598475570-b1536e473438?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Kashmir valley", id: "p11" },
  { src: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Himachal mountains", id: "p12" },
  { src: "https://images.unsplash.com/photo-1517330357046-3ab5a5dd42a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGluZGlhbiUyMGhpZ2h3YXl8ZW58MHx8MHx8fDA%3D", alt: "Travel coach", id: "p13" },
  { src: "https://images.unsplash.com/photo-1521182289461-22be748bc522?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGluZGlhJTIwdG91cmlzdHxlbnwwfHwwfHx8MA%3D%3D", alt: "Premium coach", id: "p14" },
  { src: "https://images.unsplash.com/photo-1627895139551-1329f16953cf?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "SUV vehicle", id: "p15" },
  { src: "https://images.unsplash.com/photo-1598190896090-9dc5c70361d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGluZGlhJTIwdG91cmlzdHxlbnwwfHwwfHx8MA%3D%3D", alt: "Tempo traveller", id: "p16" },
];

export default function GalleryPage() {
  const detected = getGalleryImages("gallery");
  const images = detected.length > 0 ? detected : PLACEHOLDER_IMAGES;

  return (
    <>
      {/* <PageHeader
        eyebrow="Gallery"
        title="Roads, regions, and the people who travelled them."
        description="Real moments from real trips. Drop new photos into /public/gallery and they'll appear here automatically."
      /> */}

      <section className="pb-24">
        <div className="container-padded">
          <MasonryGallery images={images} />
        </div>
      </section>
    </>
  );
}
