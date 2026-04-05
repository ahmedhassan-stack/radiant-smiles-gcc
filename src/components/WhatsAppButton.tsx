import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/966920012345"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-green-500 text-primary-foreground rounded-full flex items-center justify-center shadow-xl hover:bg-green-600 transition-colors hover:scale-110 transform duration-200"
    aria-label="تواصل عبر واتساب"
  >
    <MessageCircle size={28} fill="currentColor" />
  </a>
);

export default WhatsAppButton;
