import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    id: "basic",
    title: "Basic Plan",
    price: "110",
    members: "1+5",
    features: [
      "Casket included",
      "Funeral service coordination",
      "Tents & chairs",
      "Sound system",
      "3 months waiting period",
    ],
    popular: false,
  },
  {
    id: "family",
    title: "Family Plan",
    price: "180",
    members: "1+7",
    features: [
      "Premium casket selection",
      "Full funeral coordination",
      "Tents, chairs & decoration",
      "Sound system & photography",
      "Repatriation within SA",
      "Cash benefit",
      "3 months waiting period",
    ],
    popular: true,
  },
  {
    id: "executive",
    title: "Executive Plan",
    price: "250",
    members: "1+9",
    features: [
      "Executive casket / coffin",
      "Complete funeral management",
      "Premium décor & tenting",
      "Sound, photography & videography",
      "Repatriation (SA & Lesotho)",
      "Cash benefit & tombstone",
      "Grocery benefit",
      "3 months waiting period",
    ],
    popular: false,
  },
];

const PlansSection = () => {
  const navigate = useNavigate();

  return (
    <section id="plans" className="py-20 md:py-28 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">Our Plans</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground">
            Funeral Cover for Your Family
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Affordable monthly premiums starting from as little as R110/pm. No joining fee.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative p-8 rounded-xl bg-card shadow-card hover:shadow-elevated transition-shadow border ${
                plan.popular ? "border-accent" : "border-border"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="font-serif text-2xl font-medium text-foreground">{plan.title}</h3>
              <p className="text-muted-foreground text-sm mt-1">{plan.members} Members</p>
              <p className="mt-4">
                <span className="text-accent font-bold text-3xl">R{plan.price}</span>
                <span className="text-muted-foreground text-sm">/pm</span>
              </p>
              <ul className="mt-6 space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate(`/join?plan=${plan.id}`)}
                className={`w-full py-3 rounded-lg font-medium text-sm transition-colors ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-navy-light"
                    : "bg-muted text-foreground hover:bg-border"
                }`}
              >
                Select Plan
              </button>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          *Restrictions apply. Prices subject to change. 6 months waiting period for natural death.
        </p>
      </div>
    </section>
  );
};

export default PlansSection;
