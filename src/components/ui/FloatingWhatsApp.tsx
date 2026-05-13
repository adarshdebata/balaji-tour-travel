"use client";

import { MessageCircle } from "lucide-react";
import { CONTACT } from "@/constants/site";

export function FloatingWhatsApp() {
  const number = CONTACT.whatsapp.replace(/\D/g, "");
  const message = encodeURIComponent(
    "Hi Balaji Travels, I'd like to enquire about a booking.",
  );

  return (
    <a
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 group"
    >
      <span className="absolute inset-0 rounded-full bg-green-500 opacity-50 blur-xl group-hover:opacity-80 transition-opacity" />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl ring-4 ring-white/40 transition-transform hover:scale-110">
        <MessageCircle className="h-6 w-6" />
      </span>
    </a>
  );
}
