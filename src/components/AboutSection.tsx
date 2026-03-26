import { motion } from "framer-motion";
import ownerImg from "@/assets/owner.jpg";

const AboutSection = () => (
	<section id="about" className="py-20 md:py-28 bg-muted">
		<div className="container mx-auto px-4">
			<div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
				<motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
					<img
						src={ownerImg}
						alt="Mhlambi’s Funeral Home"
						className="rounded-xl shadow-card object-cover w-full aspect-[3/4]"
					/>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.1 }}
				>
					<p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">About Us</p>
					<h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6">Serving Duduza with Honour</h2>

					<div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
						<div>
							<h3 className="font-serif text-lg font-medium text-foreground mb-1">Our Vision</h3>
							<p>To serve families with dignity, care, and respect.</p>
						</div>
						<div>
							<h3 className="font-serif text-lg font-medium text-foreground mb-1">Our Mission</h3>
							<p>
								To guide and support families through the funeral process with compassion, professionalism, and affordable
								options.
							</p>
						</div>
					</div>

					<div className="mt-8 p-4 rounded-lg bg-card border border-border">
						<p className="font-serif text-foreground font-medium">Duduza, South Africa</p>
						<p className="text-sm text-muted-foreground">Serving Duduza and surrounding areas</p>
					</div>
				</motion.div>
			</div>
		</div>
	</section>
);

export default AboutSection;
