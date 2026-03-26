import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, CheckCircle } from "lucide-react";

const PaymentSection = () => {
  const [policyId, setPolicyId] = useState("");
  const [amount, setAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production this would redirect to PayFast/Ozow
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="pay" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">Quick Pay</p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground">
              Pay Your Policy Online
            </h2>
            <p className="mt-3 text-muted-foreground text-sm">
              No need to visit the office. Pay your monthly premium securely via EFT, card or instant payment.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-xl bg-muted shadow-card space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Policy Number</label>
              <input
                type="text"
                value={policyId}
                onChange={(e) => setPolicyId(e.target.value)}
                required
                placeholder="e.g. LFS-00123"
                className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 ring-gold focus:ring-offset-2 transition-shadow"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Amount (ZAR)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min={1}
                placeholder="e.g. 250"
                className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 ring-gold focus:ring-offset-2 transition-shadow"
              />
            </div>
            <button
              type="submit"
              disabled={submitted}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-navy-light transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {submitted ? (
                <>
                  <CheckCircle className="w-4 h-4" /> Redirecting to payment…
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" /> Proceed to Pay
                </>
              )}
            </button>
            <p className="text-xs text-muted-foreground text-center">
              Secure payments via PayFast & Ozow. EFT and card accepted.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;
