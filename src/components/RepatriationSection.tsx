import { motion } from "framer-motion";
import entourage from "@/assets/entourage.jpg";

const RepatriationSection = () => (
  <section className="py-20 md:py-28 bg-primary text-primary-foreground">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-gold-light text-sm font-semibold tracking-widest uppercase mb-2">Repatriation</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">
            Cross-Border & Provincial Transfers
          </h2>
          <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
            As a border-region service provider, Loyiso specialises in dignified repatriation of remains across all South African provinces and to Lesotho. Our fleet ensures your loved ones are transported with the utmost care and respect.
          </p>
          <a href="#contact" className="inline-flex items-center px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:bg-gold-light transition-colors">
            Enquire About Repatriation
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <img src={entourage} alt="Loyiso fleet for repatriation services" className="rounded-xl shadow-card object-cover w-full aspect-video" />
        </motion.div>
      </div>
    </div>
  </section>
);

export default RepatriationSection;
