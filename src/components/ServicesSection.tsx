import { motion } from "framer-motion";
import { Flower2, Truck, Music, Camera, Tent, GalleryVerticalEnd, MapPin, Package } from "lucide-react";

const services = [
  { icon: GalleryVerticalEnd, label: "Coffins & Caskets", desc: "Wide range of premium and standard caskets" },
  { icon: Truck, label: "Repatriation", desc: "Cross-province & Lesotho border transfers" },
  { icon: Tent, label: "Tents & Chairs", desc: "Full marquee setup with seating" },
  { icon: Music, label: "Sound Systems", desc: "Professional PA and sound equipment" },
  { icon: Camera, label: "Photography", desc: "Dignified funeral photography service" },
  { icon: Flower2, label: "Décor & Flowers", desc: "Elegant floral arrangements & draping" },
  { icon: Package, label: "Tombstones", desc: "Custom tombstone design & installation" },
  { icon: MapPin, label: "Grocery Benefit", desc: "Groceries provided for bereaved families" },
];

const ServicesSection = () => (
  <section id="services" className="py-20 md:py-28">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">What We Offer</p>
        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground">
          Comprehensive Funeral Services
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
        {services.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="p-6 rounded-xl border border-border hover:shadow-card transition-shadow group"
          >
            <s.icon className="w-8 h-8 text-accent mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-serif text-lg font-medium text-foreground">{s.label}</h3>
            <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
