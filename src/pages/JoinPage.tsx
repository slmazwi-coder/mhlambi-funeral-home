import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";

const planNames: Record<string, string> = {
  basic: "Basic Plan – R110/pm (1+5 Members)",
  family: "Family Plan – R180/pm (1+7 Members)",
  executive: "Executive Plan – R250/pm (1+9 Members)",
};

const JoinPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const selectedPlan = params.get("plan") || "family";
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    idNumber: "",
    phone: "",
    email: "",
    address: "",
    plan: selectedPlan,
    dependants: "",
    consent: false,
  });

  const update = (field: string, value: string | boolean) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-16 flex items-center justify-center bg-muted">
          <div className="text-center p-12 max-w-md">
            <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-medium text-foreground mb-2">Application Submitted</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Thank you! Our team will contact you within 24 hours to confirm your membership. You can also reach us on WhatsApp.
            </p>
            <button onClick={() => navigate("/")} className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-navy-light transition-colors">
              Back to Home
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <WhatsAppButton />
      <div className="min-h-screen pt-16 bg-muted">
        <div className="container mx-auto px-4 py-12">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>

          <div className="max-w-2xl mx-auto">
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-2">
              Membership Application
            </h1>
            <p className="text-muted-foreground text-sm mb-10">
              Complete the form below to join Loyiso Funeral Services. No joining fee.
            </p>

            <form onSubmit={handleSubmit} className="p-8 rounded-xl bg-card shadow-card space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Selected Plan</label>
                <select
                  value={form.plan}
                  onChange={(e) => update("plan", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 ring-gold focus:ring-offset-2"
                >
                  <option value="basic">{planNames.basic}</option>
                  <option value="family">{planNames.family}</option>
                  <option value="executive">{planNames.executive}</option>
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                  <input type="text" required value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 ring-gold focus:ring-offset-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">SA ID Number</label>
                  <input type="text" required value={form.idNumber} onChange={(e) => update("idNumber", e.target.value)} className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 ring-gold focus:ring-offset-2" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
                  <input type="tel" required value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 ring-gold focus:ring-offset-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email (optional)</label>
                  <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 ring-gold focus:ring-offset-2" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Residential Address</label>
                <textarea required value={form.address} onChange={(e) => update("address", e.target.value)} rows={2} className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 ring-gold focus:ring-offset-2 resize-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Number of Dependants</label>
                <input type="number" required min={0} value={form.dependants} onChange={(e) => update("dependants", e.target.value)} className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 ring-gold focus:ring-offset-2" />
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" required checked={form.consent} onChange={(e) => update("consent", e.target.checked)} className="mt-1 accent-[hsl(43,86%,39%)]" />
                <span className="text-sm text-muted-foreground">
                  I consent to Loyiso Funeral Services processing my personal information for membership purposes. I understand a 3-month waiting period applies.
                </span>
              </label>

              <button type="submit" className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-navy-light transition-colors">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinPage;
