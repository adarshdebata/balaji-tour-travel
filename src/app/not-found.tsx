import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6 py-24">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-saffron-100 text-saffron-700">
          <Compass className="h-7 w-7" />
        </div>
        <p className="mt-6 eyebrow justify-center">Wrong turn</p>
        <h1 className="display-text mt-4 text-5xl sm:text-7xl">
          404
        </h1>
        <p className="mt-4 max-w-md text-base text-ink-600">
          This route doesn&apos;t exist on our map. Let&apos;s get you back to a
          familiar road.
        </p>
        <Link href="/" className="btn-primary mt-8">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
