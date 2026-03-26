import { motion } from "framer-motion";

const images = [
	{ src: "/images/hero/fleet.jpg", alt: "Mhlambi's Funeral HOME fleet" },
	{ src: "/images/hero/fleet 2.jpg", alt: "Mhlambi's Funeral HOME fleet" },
	{ src: "/images/hero/setup.jpg", alt: "Funeral setup" },
	{ src: "/images/hero/setup 2.jpg", alt: "Funeral setup" },
];

const GallerySection = () => (
	<section className="py-20 md:py-28 bg-muted">
		<div className="container mx-auto px-4">
			<motion.div initial= opacity: 0, y: 10  whileInView= opacity: 1, y: 0  viewport= once: true  className="text-center mb-14">
				<p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">Gallery</p>
				<h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground">Our Fleet & Facilities</h2>
			</motion.div>

			<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
				{images.map((img, i) => (
					<motion.div
						key={i}
						initial= opacity: 0, y: 10 
						whileInView= opacity: 1, y: 0 
						viewport= once: true 
						transition= delay: i * 0.08 
						className="rounded-xl overflow-hidden shadow-card aspect-[4/3]"
					>
						<img
							src={img.src}
							alt={img.alt}
							className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
							loading="lazy"
						/>
					</motion.div>
				))}
			</div>
		</div>
	</section>
);

export default GallerySection;
