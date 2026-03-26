import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const slides = [
	{ src: "/images/hero/fleet.jpg", alt: "Mhlambi's Funeral HOME - Fleet" },
	{ src: "/images/hero/setup.jpg", alt: "Mhlambi's Funeral HOME - Setup" },
	{ src: "/images/hero/Funeral proceeding.jpg", alt: "Mhlambi's Funeral HOME - Funeral proceeding" },
];

const HeroSection = () => {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 8000);
		return () => clearInterval(timer);
	}, []);

	return (
		<section id="home" className="relative h-[85vh] min-h-[600px] overflow-hidden pt-16">
			<AnimatePresence mode="wait">
				<motion.img
					key={index}
					src={slides[index].src}
					alt={slides[index].alt}
					initial= opacity: 0 
					animate= opacity: 1 
					exit= opacity: 0 
					transition= duration: 0.9 
					className="absolute inset-0 w-full h-full object-cover"
				/>
			</AnimatePresence>

			<div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/55 to-primary/25" />

			<div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-16 md:pb-24">
				<motion.div initial= y: 24, opacity: 0  animate= y: 0, opacity: 1  transition= duration: 0.9 >
					<p className="text-gold-light text-sm font-semibold tracking-widest uppercase mb-3">"Everything has its time"</p>
					<h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium text-primary-foreground max-w-3xl leading-tight">
						Supporting Families with Dignity&nbsp;and&nbsp;Respect
					</h1>
					<p className="mt-4 text-primary-foreground/80 max-w-xl text-base md:text-lg">
						Supporting Families During Their Times of Bereavement
					</p>
					<div className="mt-8 flex flex-wrap gap-4">
						<a
							href="#plans"
							className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:bg-gold-light transition-colors"
						>
							View Plans
						</a>
						<a
							href="#contact"
							className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 font-medium text-sm hover:bg-primary-foreground/20 transition-colors backdrop-blur-sm"
						>
							Contact Us
						</a>
					</div>
				</motion.div>
			</div>

			<div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
				{slides.map((_, i) => (
					<button
						key={i}
						onClick={() => setIndex(i)}
						className={`w-2 h-2 rounded-full transition-all ${i === index ? "bg-accent w-6" : "bg-primary-foreground/40"}`}
					/>
				))}
			</div>
		</section>
	);
};

export default HeroSection;
