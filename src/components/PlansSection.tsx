import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Plan = {
  id: string;
  title: string;
  image: string;
  features: string[];
  popular?: boolean;
};

const plans: Plan[] = [
  {
    id: "isisekelo",
    title: "Isisekelo Package",
    image: "/images/plans/Isisekelo%20package.jpg",
    features: [
      "Affordable monthly cover",
      "Dignified funeral service",
      "Family support and guidance",
      "Available 24/7",
    ],
  },
  {
    id: "usizo",
    title: "Usizo Package",
    image: "/images/plans/Usizo%20package.jpg",
    features: [
      "Enhanced cover option",
      "Funeral arrangements support",
      "Tents & chairs (where applicable)",
      "Professional service",
    ],
    popular: true,
  },
  {
    id: "uhambo",
    title: "Uhambo Package",
    image: "/images/plans/Uhambo%20package.jpg",
    features: [
      "Premium cover option",
      "Burial support and coordination",
      "Transport support (where applicable)",
      "Compassionate care",
    ],
  },
  {
    id: "burial",
    title: "Burial Plan",
    image: "/images/plans/burial%20plan.jpg",
    features: [
      "Burial plan option",
      "Support with funeral logistics",
      "Guidance and coordination",
      "Available in Duduza and surrounding areas",
    ],
  },
];

const PlansSection = () => {
  const navigate = useNavigate();

  return (
    <section id="plans" className="py-20 md:py-28 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">Our Plans</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground">Choose a Package</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Select a package that suits your family. You can apply online and our team will contact you to confirm details.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`relative rounded-xl bg-card shadow-card hover:shadow-elevated transition-shadow border overflow-hidden ${
                plan.popular ? "border-accent" : "border-border"
              }`}
            >
              {plan.popular && (
                <span className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full shadow">
                  Popular
                </span>
              )}

              <div className="aspect-[4/3] bg-muted overflow-hidden">
                <img src={plan.image} alt={plan.title} className="w-full h-full object-cover" loading="lazy" />
              </div>

              <div className="p-6">
                <h3 className="font-serif text-xl font-medium text-foreground">{plan.title}</h3>

                <ul className="mt-4 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => navigate(`/join?plan=${plan.id}`)}
                  className={`mt-6 w-full py-3 rounded-lg font-medium text-sm transition-colors ${
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:bg-navy-light"
                      : "bg-muted text-foreground hover:bg-border"
                  }`}
                >
                  Apply for this plan
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          *Package contents can vary. Final confirmation will be done with our team.
        </p>
      </div>
    </section>
  );
};

export default PlansSection;
