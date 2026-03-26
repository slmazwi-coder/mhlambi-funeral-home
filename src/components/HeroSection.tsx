import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import heroCar from "@/assets/hero-car.jpg";
import heroTenting from "@/assets/hero-tenting.jpg";
import heroTrailer from "@/assets/hero-trailer.jpg";

const slides = [
  { src: heroCar, alt: "Loyiso fleet Mercedes" },
  { src: heroTenting, alt: "Loyiso branded tenting setup" },
  { src: heroTrailer, alt: "Loyiso premium casket trailer" },
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-primary/20" />

      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-gold-light text-sm font-semibold tracking-widest uppercase mb-3">
            "The Best You Deserve"
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium text-primary-foreground max-w-3xl leading-tight">
            Honouring Legacies with Dignity&nbsp;and&nbsp;Grace
          </h1>
          <p className="mt-4 text-primary-foreground/80 max-w-xl text-base md:text-lg">
            Comprehensive funeral services and policy management for the Matatiele community.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#plans" className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:bg-gold-light transition-colors">
              View Plans
            </a>
            <a href="#pay" className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 font-medium text-sm hover:bg-primary-foreground/20 transition-colors backdrop-blur-sm">
              Pay Your Policy
            </a>
          </div>
        </motion.div>
      </div>

      {/* Slide indicators */}
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
