import { useMemo, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

type Msg = { role: "user" | "bot"; text: string };

type Plan = { id: string; title: string };

const plans: Plan[] = [
	{ id: "isisekelo", title: "Isisekelo Package" },
	{ id: "usizo", title: "Usizo Package" },
	{ id: "uhambo", title: "Uhambo Package" },
	{ id: "burial", title: "Burial Plan" },
];

const WHATSAPP_NUMBER = "27727458248";

const initialMessages: Msg[] = [
	{
		role: "bot",
		text: "Hi! I am Mhlambi’s assistant. How can I help you today? You can ask about plans, documents, or how to apply.",
	},
];

function normalize(s: string) {
	return s.toLowerCase().trim();
}

function replyFor(input: string): string {
	const q = normalize(input);

	if (!q) return "Please type your question.";

	if (q.includes("plan") || q.includes("package") || q.includes("price")) {
		return [
			"We have 4 plan packages:",
			...plans.map((p) => `• ${p.title}`),
			"To apply, open the plan section and click \"Apply for this plan\".",
		].join("\n");
	}

	if (q.includes("apply") || q.includes("join") || q.includes("application")) {
		return [
			"You can apply online using the form on the Join page.",
			"Choose a plan, fill in your details, and upload your documents.",
			"If you cannot upload documents now, submit the form and then WhatsApp us your documents.",
		].join("\n");
	}

	if (q.includes("document") || q.includes("upload") || q.includes("id") || q.includes("proof")) {
		return [
			"Required documents:",
			"• ID Copy (Main Member)",
			"• Proof of Address",
			"Optional:",
			"• Bank Proof / Statement",
			"You can upload PDF or images.",
		].join("\n");
	}

	if (q.includes("contact") || q.includes("whatsapp") || q.includes("phone") || q.includes("call")) {
		return "You can contact us on WhatsApp. Click the WhatsApp button on the website to chat with the team.";
	}

	return "I can help with plans, documents, and how to apply. If you need more help, please WhatsApp the team.";
}

export default function ChatbotWidget() {
	const [open, setOpen] = useState(false);
	const [messages, setMessages] = useState<Msg[]>(initialMessages);
	const [text, setText] = useState("");

	const whatsappFallbackHref = useMemo(() => {
		const lastUserMsg = [...messages].reverse().find((m) => m.role === "user")?.text || "";
		const txt = `Hi Mhlambi’s Funeral Home, I need help with: ${lastUserMsg}`;
		return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(txt)}`;
	}, [messages]);

	const send = () => {
		const trimmed = text.trim();
		if (!trimmed) return;

		setMessages((prev) => [...prev, { role: "user", text: trimmed }, { role: "bot", text: replyFor(trimmed) }]);
		setText("");
	};

	return (
		<div className="fixed bottom-5 right-5 z-50">
			{open ? (
				<div className="w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl shadow-elevated border border-border bg-card overflow-hidden">
					<div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
						<div className="flex items-center gap-2">
							<MessageCircle className="w-5 h-5" />
							<p className="font-semibold text-sm">Chat with us</p>
						</div>
						<button
							onClick={() => setOpen(false)}
							className="p-1 rounded-md hover:bg-white/10 transition-colors"
							aria-label="Close chatbot"
						>
							<X className="w-5 h-5" />
						</button>
					</div>

					<div className="p-4 space-y-3 max-h-[360px] overflow-y-auto">
						{messages.map((m, i) => (
							<div
								key={i}
								className={`text-sm whitespace-pre-line rounded-xl px-3 py-2 border ${
									m.role === "user"
										? "ml-8 bg-muted border-border"
										: "mr-8 bg-card border-border"
								}`}
							>
								{m.text}
							</div>
						))}
					</div>

					<div className="p-4 border-t border-border bg-card">
						<div className="flex gap-2">
							<input
								value={text}
								onChange={(e) => setText(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										send();
									}
								}}
								placeholder="Type a message..."
								className="flex-1 px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 ring-gold"
							/>
							<button
								onClick={send}
								className="px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-navy-light transition-colors"
								aria-label="Send"
							>
								<Send className="w-4 h-4" />
							</button>
						</div>

						<a
							href={whatsappFallbackHref}
							target="_blank"
							rel="noopener noreferrer"
							className="mt-3 block text-center text-sm font-semibold px-3 py-2 rounded-lg bg-[hsl(142,70%,41%)] text-white hover:opacity-95 transition-opacity"
						>
							Continue on WhatsApp
						</a>
					</div>
				</div>
			) : (
				<button
					onClick={() => setOpen(true)}
					className="h-14 w-14 rounded-full shadow-elevated bg-primary text-primary-foreground flex items-center justify-center hover:bg-navy-light transition-colors"
					aria-label="Open chatbot"
				>
					<MessageCircle className="w-6 h-6" />
				</button>
			)}
		</div>
	);
}
