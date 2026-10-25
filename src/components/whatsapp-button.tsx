import { MessageCircle } from "lucide-react";

const PHONE = "917204751900";
const TEXT = encodeURIComponent("Hi SAS Travels! I'd like help planning a trip.");

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${PHONE}?text=${TEXT}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with SAS Travels on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-2 ring-gold/60 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}
