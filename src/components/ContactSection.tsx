import { Mail, MessageCircle, Phone } from "lucide-react";

const WHATSAPP_NUMBER = "27727458248";

export default function ContactSection() {
	return (
		<section id="contact" className="py-20 md:py-28 bg-card">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl mx-auto">
					<p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2 text-center">Contact</p>
					<h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground text-center">Get in touch</h2>
					<p className="mt-3 text-muted-foreground text-center max-w-2xl mx-auto">
						For enquiries about plans, services, or application support, please contact us.
					</p>

					<div className="mt-10 grid md:grid-cols-3 gap-4">
						<a
							href={`{{https://wa.me/${WHATSAPP_NUMBER}}}`}
							target="_blank"
							rel="noopener noreferrer"
							className="p-6 rounded-xl border border-border bg-muted hover:shadow-card transition-shadow"
						>
							<div className="flex items-center gap-3">
								<MessageCircle className="w-5 h-5 text-accent" />
								<p className="font-semibold text-foreground">WhatsApp</p>
							</div>
							<p className="mt-2 text-sm text-muted-foreground">Fastest way to reach us</p>
						</a>

						<a
							href="tel:+27727458248"
							className="p-6 rounded-xl border border-border bg-muted hover:shadow-card transition-shadow"
						>
							<div className="flex items-center gap-3">
								<Phone className="w-5 h-5 text-accent" />
								<p className="font-semibold text-foreground">Call</p>
							</div>
							<p className="mt-2 text-sm text-muted-foreground">072 745 8248</p>
						</a>

						<a
							href="mailto:mhlambifuneral@gmail.com"
							className="p-6 rounded-xl border border-border bg-muted hover:shadow-card transition-shadow"
						>
							<div className="flex items-center gap-3">
								<Mail className="w-5 h-5 text-accent" />
								<p className="font-semibold text-foreground">Email</p>
							</div>
							<p className="mt-2 text-sm text-muted-foreground">mhlambifuneral@gmail.com</p>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
