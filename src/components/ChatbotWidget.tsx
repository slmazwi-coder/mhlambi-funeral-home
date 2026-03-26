import { useMemo, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

type Msg = { role: "user" | "bot"; text: string };

type Plan = {
	id: string;
	title: string;
	features: string[];
};

const plans: Plan[] = [
	{
		id: "isisekelo",
		title: "Isisekelo Package",
		features: [
			"Affordable monthly cover",
			"Dignified funeral service",
			"Family support and guidance",
			"Available 24/7",
		],
	},
	{
		id: "usizo",
		title: "Usizo Package",
		features: [
			"Enhanced cover option",
			"Funeral arrangements support",
			"Tents & chairs (where applicable)",
			"Professional service",
		],
	},
	{
		id: "uhambo",
		title: "Uhambo Package",
		features: [
			"Premium cover option",
			"Burial support and coordination",
			"Transport support (where applicable)",
			"Compassionate care",
		],
	},
	{
		id: "burial",
		title: "Burial Plan",
		features: [
			"Burial plan option",
			"Support with funeral logistics",
			"Guidance and coordination",
			"Available in Duduza and surrounding areas",
		],
	},
];

const REQUIRED_DOCS = ["ID Copy (Main Member)", "Proof of Address"];
const OPTIONAL_DOCS = ["Bank Proof / Statement (optional)"];

const WHATSAPP_NUMBER = "27727458248";

const quickReplies = ["Plans", "How to apply", "Required documents", "Contact", "Payments", "Services"];

const initialMessages: Msg[] = [
	{
		role: "bot",
		text: "Hi! I am Mhlambi’s assistant. I can help with plans, documents, applying, contact details, and general questions about the site. What would you like to know?",
	},
];

function normalize(s: string) {
	return s.toLowerCase().trim();
}

function includesAny(q: string, words: string[]) {
	return words.some((w) => q.includes(w));
}

function answerFromSiteInfo(input: string): string | null {
	const q = normalize(input);
	if (!q) return null;

	if (includesAny(q, ["plan", "plans", "package", "packages", "price", "pricing"])) {
		return [
			"We have 4 plan packages:",
			...plans.map((p) => `• ${p.title}`),
			"To apply, open the Plans section and click \"Apply for this plan\".",
		].join("\n");
	}

	const matchedPlan = plans.find((p) => q.includes(p.id) || q.includes(normalize(p.title)));
	if (matchedPlan) {
		return [
			`${matchedPlan.title} includes:`,
			...matchedPlan.features.map((f) => `• ${f}`),
			"To apply for this plan, click \"Apply for this plan\" in the Plans section.",
		].join("\n");
	}

	if (includesAny(q, ["apply", "join", "application", "register", "sign up"])) {
		return [
			"You can apply online using the form on the Join page.",
			"Steps:",
			"1) Choose a plan",
			"2) Fill in your details",
			"3) Upload your documents (PDF or images)",
			"If you cannot upload documents now, submit the form and then WhatsApp the documents.",
		].join("\n");
	}

	if (includesAny(q, ["document", "documents", "upload", "id", "proof", "address"])) {
		return [
			"Required documents:",
			...REQUIRED_DOCS.map((d) => `• ${d}`),
			"Optional:",
			...OPTIONAL_DOCS.map((d) => `• ${d}`),
			"You can upload PDF or images.",
		].join("\n");
	}

	if (includesAny(q, ["contact", "whatsapp", "phone", "call", "number"])) {
		return "To contact Mhlambi’s Funeral Home, use the WhatsApp button on the website to chat with the team.";
	}

	if (includesAny(q, ["pay", "payment", "payments", "deposit", "eft", "bank"])) {
		return "For payment details, please check the Payments section on the website. If you need help, you can WhatsApp the team for the latest banking details.";
	}

	if (includesAny(q, ["service", "services", "funeral service", "burial", "tents", "chairs", "transport"])) {
		return "We offer funeral services and support. For full service details, please see the Services section on the website, or WhatsApp the team for assistance.";
	}

	return null;
}

function buildWhatsAppUrl(text: string) {
	return `{{https://wa.me/${WHATSAPP_NUMBER}}}?text=${encodeURIComponent(text)}`;
}

export default function ChatbotWidget() {
	const [open, setOpen] = useState(false);
	const [messages, setMessages] = useState<Msg[]>(initialMessages);
	const [text, setText] = useState("");
	const containerRef = useRef<HTMLDivElement | null>(null);

	const whatsappRelayHref = useMemo(() => {
		const transcript = messages
			.filter((m) => m.role !== "bot" || m.text !== initialMessages[0]?.text)
			.map((m) => (m.role === "user" ? `Customer: ${m.text}` : `Bot: ${m.text}`))
			.join("\n\n");

		const txt = transcript
			? `Hi Mhlambi’s Funeral Home, I need help. Here is what I asked on the website chat:\n\n${transcript}`
			: "Hi Mhlambi’s Funeral Home, I need help.";

		return buildWhatsAppUrl(txt);
	}, [messages]);

	const append = (newMsgs: Msg[]) => {
		setMessages((prev) => [...prev, ...newMsgs]);
		setTimeout(() => {
			if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}, 0);
	};

	const send = (override?: string) => {
		const raw = override ?? text;
		const trimmed = raw.trim();
		if (!trimmed) return;

		const direct = answerFromSiteInfo(trimmed);
		const botText = direct ?? "I am not 100% sure. Please click \"Continue on WhatsApp\" so the team can assist you.";

		append([{ role: "user", text: trimmed }, { role: "bot", text: botText }]);
		setText("");
	};

	// Positioned above the WhatsApp button to avoid overlap.
	return (
		<div className="fixed bottom-24 right-6 z-50">
			{open ? (
				<div className="w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl shadow-elevated border border-border bg-card overflow-hidden">
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

					<div className="p-3 border-b border-border bg-card">
						<div className="flex flex-wrap gap-2">
							{quickReplies.map((q) => (
								<button
									key={q}
									onClick={() => send(q)}
									className="text-xs px-3 py-1.5 rounded-full border border-border bg-muted hover:bg-border transition-colors"
								>
									{q}
								</button>
							))}
						</div>
					</div>

					<div ref={containerRef} className="p-4 space-y-3 max-h-[360px] overflow-y-auto">
						{messages.map((m, i) => (
							<div
								key={i}
								className={`text-sm whitespace-pre-line rounded-xl px-3 py-2 border ${
									m.role === "user" ? "ml-8 bg-muted border-border" : "mr-8 bg-card border-border"
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
								onClick={() => send()}
								className="px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-navy-light transition-colors"
								aria-label="Send"
							>
								<Send className="w-4 h-4" />
							</button>
						</div>

						<a
							href={whatsappRelayHref}
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
