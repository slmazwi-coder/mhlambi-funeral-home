import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
	<a
		href="https://wa.me/27727458248?text=Hi%20Mhlambi%E2%80%99s%20Funeral%20Home%2C%20I%20need%20assistance."
		target="_blank"
		rel="noopener noreferrer"
		className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[hsl(142,70%,41%)] text-[hsl(0,0%,100%)] px-5 py-3 rounded-full shadow-elevated hover:scale-105 transition-transform"
		aria-label="Chat on WhatsApp"
	>
		<MessageCircle className="w-5 h-5" />
		<span className="hidden sm:inline text-sm font-semibold">WhatsApp Us</span>
	</a>
);

export default WhatsAppButton;
