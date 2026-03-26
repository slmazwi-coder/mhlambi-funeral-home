import { MapPin, Phone, Mail } from "lucide-react";

const LOGO_SRC = "/images/hero/Logo.jpg";

const FooterSection = () => (
	<footer id="contact" className="bg-primary text-primary-foreground py-16">
		<div className="container mx-auto px-4">
			<div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
				<div>
					<div className="flex items-center gap-3 mb-4">
						<img src={LOGO_SRC} alt="Mhlambi's Funeral Home" className="h-12 w-12 rounded-full object-cover" />
						<div>
							<span className="font-serif text-lg font-semibold">Mhlambi's</span>
							<span className="block text-xs text-primary-foreground/60 -mt-1">Funeral Home</span>
						</div>
					</div>
					<p className="text-sm text-primary-foreground/60 leading-relaxed">
						"Everything has its time." Supporting families during their times of bereavement.
					</p>
				</div>

				<div>
					<h3 className="font-serif text-lg font-medium mb-4">Quick Links</h3>
					<ul className="space-y-2 text-sm text-primary-foreground/60">
						<li>
							<a href="#plans" className="hover:text-primary-foreground transition-colors">
								Funeral Plans
							</a>
						</li>
						<li>
							<a href="#services" className="hover:text-primary-foreground transition-colors">
								Our Services
							</a>
						</li>
						<li>
							<a href="#pay" className="hover:text-primary-foreground transition-colors">
								Pay Policy Online
							</a>
						</li>
						<li>
							<a href="/join" className="hover:text-primary-foreground transition-colors">
								Join Online
							</a>
						</li>
					</ul>
				</div>

				<div>
					<h3 className="font-serif text-lg font-medium mb-4">Contact</h3>
					<ul className="space-y-3 text-sm text-primary-foreground/60">
						<li className="flex items-start gap-2">
							<MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
							Duduza, South Africa
						</li>
						<li className="flex items-center gap-2">
							<Phone className="w-4 h-4 shrink-0 text-accent" />
							<a href="tel:+27727458248" className="hover:text-primary-foreground transition-colors">
								072 745 8248
							</a>
						</li>
						<li className="flex items-center gap-2">
							<Mail className="w-4 h-4 shrink-0 text-accent" />
							<a href="mailto:mhlambifuneral@gmail.com" className="hover:text-primary-foreground transition-colors">
								mhlambifuneral@gmail.com
							</a>
						</li>
					</ul>
				</div>
			</div>

			<div className="border-t border-primary-foreground/10 mt-12 pt-6 text-center text-xs text-primary-foreground/40">
				© {new Date().getFullYear()} Mhlambi's Funeral Home. All rights reserved.
			</div>
		</div>
	</footer>
);

export default FooterSection;
