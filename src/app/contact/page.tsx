import { Phone, Mail, MapPin, MessageCircle, Clock, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { CONTACT } from "@/constants/site";

export const metadata = {
  title: "Contact Us",
  description:
    "Reach Balaji Tour & Travel Line for bookings, quotes, and travel enquiries. Call, WhatsApp, or email — we respond within an hour.",
};

const QUICK_ACTIONS = [
  {
    icon: Phone,
    label: "Call us",
    value: CONTACT.phonePrimary,
    href: `tel:${CONTACT.phonePrimary.replace(/\s/g, "")}`,
    cta: "Tap to call",
    accent: "from-saffron-500 to-crimson-600",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: CONTACT.whatsapp,
    href: `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`,
    cta: "Open chat",
    accent: "from-green-500 to-emerald-600",
  },
  {
    icon: Mail,
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    cta: "Send email",
    accent: "from-indigo-500 to-violet-600",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Talk to a human. Same one who'll handle your trip."
        description="No call centres, no scripts. Reach the owner-operated team directly — by phone, WhatsApp, or email."
      />

      <section className="pb-16">
        <div className="container-padded">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {QUICK_ACTIONS.map(({ icon: Icon, label, value, href, cta, accent }) => (
              <a
                key={label}
                href={href}
                target={label === "WhatsApp" ? "_blank" : undefined}
                rel={label === "WhatsApp" ? "noopener noreferrer" : undefined}
                className="group relative overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-ink-200/60 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-lg`}>
                  <Icon className="h-6 w-6" />
                </div>
                <p className="mt-6 text-xs uppercase tracking-[0.2em] text-ink-500">
                  {label}
                </p>
                <p className="mt-2 font-display text-2xl text-ink-900 break-all">{value}</p>
                <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-saffron-700">
                  {cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-padded">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white p-8 ring-1 ring-ink-200/60 shadow-sm">
                <h2 className="font-display text-3xl text-ink-900">Visit us</h2>

                <div className="mt-8 space-y-6 text-base">
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-saffron-100 text-saffron-700">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-ink-500">Office</p>
                      <p className="mt-1 text-ink-900">
                        {CONTACT.address.line1}
                        <br />
                        {CONTACT.address.line2}
                        <br />
                        {CONTACT.address.city}, {CONTACT.address.state} {CONTACT.address.pincode}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-saffron-100 text-saffron-700">
                      <Clock className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-ink-500">Hours</p>
                      <p className="mt-1 text-ink-900">{CONTACT.hours}</p>
                      <p className="text-sm text-ink-500">For urgent bookings &amp; on-trip support</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-saffron-100 text-saffron-700">
                      <Phone className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-ink-500">Phones</p>
                      <a href={`tel:${CONTACT.phonePrimary.replace(/\s/g, "")}`} className="mt-1 block text-ink-900 hover:text-saffron-700">
                        {CONTACT.phonePrimary}
                      </a>
                      <a href={`tel:${CONTACT.phoneSecondary.replace(/\s/g, "")}`} className="text-ink-900 hover:text-saffron-700">
                        {CONTACT.phoneSecondary}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-ink-100 ring-1 ring-ink-200/60">
                {/* Embedded map placeholder */}
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=77.30%2C28.55%2C77.40%2C28.62&amp;layer=mapnik"
                  className="h-full w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Office location map"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
