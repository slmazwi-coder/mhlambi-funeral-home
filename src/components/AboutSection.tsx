import { motion } from "framer-motion";

const AboutSection = () => (
	<section id="about" className="py-20 md:py-28 bg-muted">
		<div className="container mx-auto px-4">
			<div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
				>
					<img
						src="/images/hero/setup.jpg"
						alt="Mhlambi's Funeral HOME"
						className="rounded-xl shadow-card object-cover w-full aspect-[3/4]"
						loading="lazy"
					/>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.1 }}
				>
					<p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">About</p>
					<h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Mhlambi's Funeral HOME</h2>
					<p className="text-muted-foreground text-sm leading-relaxed">
						Supporting Families During Their Times of Bereavement.
					</p>

					<div className="mt-6 grid sm:grid-cols-2 gap-4">
						<div className="p-4 rounded-lg bg-card border border-border">
							<p className="text-xs text-muted-foreground">Location</p>
							<p className="font-medium text-foreground">Duduza, South Africa</p>
						</div>
						<div className="p-4 rounded-lg bg-card border border-border">
							<p className="text-xs text-muted-foreground">Phone</p>
							<a className="font-medium text-foreground hover:underline" href="tel:+27727458248">
								+27 72 745 8248
							</a>
						</div>
						<div className="p-4 rounded-lg bg-card border border-border">
							<p className="text-xs text-muted-foreground">Email</p>
							<a className="font-medium text-foreground hover:underline" href="mailto:mhlambifuneral@gmail.com">
								mhlambifuneral@gmail.com
							</a>
						</div>
						<div className="p-4 rounded-lg bg-card border border-border">
							<p className="text-xs text-muted-foreground">Instagram</p>
							<a
								className="font-medium text-foreground hover:underline"
								href="https://www.instagram.com/mhlambifunerals"
								target="_blank"
								rel="noopener noreferrer"
							>
								@mhlambifunerals
							</a>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	</section>
);

export default AboutSection;
