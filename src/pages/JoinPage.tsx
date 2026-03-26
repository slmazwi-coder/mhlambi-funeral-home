import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, CheckCircle, Upload } from "lucide-react";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";

const planOptions = [
	{ value: "isisekelo", label: "Isisekelo Package" },
	{ value: "usizo", label: "Usizo Package" },
	{ value: "uhambo", label: "Uhambo Package" },
	{ value: "burial", label: "Burial Plan" },
];

type DocKey = "idCopy" | "proofOfAddress" | "bankProof";

const docFields: { key: DocKey; label: string; required: boolean }[] = [
	{ key: "idCopy", label: "ID Copy (Main Member)", required: true },
	{ key: "proofOfAddress", label: "Proof of Address", required: true },
	{ key: "bankProof", label: "Bank Proof / Statement (optional)", required: false },
];

const WHATSAPP_NUMBER = "27727458248";

const JoinPage = () => {
	const [params] = useSearchParams();
	const navigate = useNavigate();

	const initialPlan = params.get("plan") || "usizo";

	const [submitted, setSubmitted] = useState(false);
	const [form, setForm] = useState({
		fullName: "",
		idNumber: "",
		phone: "",
		email: "",
		address: "",
		plan: initialPlan,
		dependants: "",
		consent: false,
	});

	const [docs, setDocs] = useState<Record<DocKey, File | null>>({
		idCopy: null,
		proofOfAddress: null,
		bankProof: null,
	});

	const update = (field: string, value: string | boolean) => setForm((p) => ({ ...p, [field]: value }));
	const updateDoc = (key: DocKey, file: File | null) => setDocs((p) => ({ ...p, [key]: file }));

	const planLabel = useMemo(
		() => planOptions.find((p) => p.value === form.plan)?.label || form.plan,
		[form.plan]
	);

	const whatsappHref = useMemo(() => {
		const missingRequired = docFields
			.filter((d) => d.required)
			.filter((d) => !docs[d.key])
			.map((d) => d.label);

		const docNote = missingRequired.length
			? `I still need to send: ${missingRequired.join(", ")}.`
			: "I have uploaded my documents on the website.";

		const txt = [
			`Hi Mhlambi’s Funeral Home, I would like to apply for ${planLabel}.`,
			`Name: ${form.fullName}`,
			`Phone: ${form.phone}`,
			`ID: ${form.idNumber}`,
			docNote,
		].join("\n");

		return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(txt)}`;
	}, [planLabel, form.fullName, form.phone, form.idNumber, docs]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// NOTE: This is a front-end only form (no backend).
		// Files are collected locally for now. If you later add a backend,
		// you can upload these files to a server or email service.
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
							Thank you. Our team will contact you to confirm your details.
							<br />
							If you still need to send documents, please WhatsApp us.
						</p>
						<div className="flex flex-col gap-3">
							<a
								href={whatsappHref}
								target="_blank"
								rel="noopener noreferrer"
								className="px-6 py-3 rounded-lg bg-[hsl(142,70%,41%)] text-white font-semibold text-sm hover:opacity-95 transition-opacity"
							>
								WhatsApp Documents / Follow Up
							</a>
							<button
								onClick={() => navigate("/")}
								className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-navy-light transition-colors"
							>
								Back to Home
							</button>
						</div>
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
					<button
						onClick={() => navigate("/")}
						className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
					>
						<ArrowLeft className="w-4 h-4" /> Back to Home
					</button>

					<div className="max-w-2xl mx-auto">
						<h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-2">Online Application</h1>
						<p className="text-muted-foreground text-sm mb-10">
							Complete the form below to apply for a plan with Mhlambi’s Funeral Home.
						</p>

						<form onSubmit={handleSubmit} className="p-8 rounded-xl bg-card shadow-card space-y-5">
							<div>
								<label className="block text-sm font-medium text-foreground mb-1.5">Selected Plan</label>
								<select
									value={form.plan}
									onChange={(e) => update("plan", e.target.value)}
									className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 ring-gold focus:ring-offset-2"
								>
									{planOptions.map((p) => (
										<option key={p.value} value={p.value}>
											{p.label}
										</option>
									))}
								</select>
							</div>

							<div className="grid sm:grid-cols-2 gap-5">
								<div>
									<label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
									<input
										type="text"
										required
										value={form.fullName}
										onChange={(e) => update("fullName", e.target.value)}
										className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 ring-gold focus:ring-offset-2"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-foreground mb-1.5">SA ID Number</label>
									<input
										type="text"
										required
										value={form.idNumber}
										onChange={(e) => update("idNumber", e.target.value)}
										className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 ring-gold focus:ring-offset-2"
									/>
								</div>
							</div>

							<div className="grid sm:grid-cols-2 gap-5">
								<div>
									<label className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
									<input
										type="tel"
										required
										value={form.phone}
										onChange={(e) => update("phone", e.target.value)}
										className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 ring-gold focus:ring-offset-2"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-foreground mb-1.5">Email (optional)</label>
									<input
										type="email"
										value={form.email}
										onChange={(e) => update("email", e.target.value)}
										className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 ring-gold focus:ring-offset-2"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-foreground mb-1.5">Residential Address</label>
								<textarea
									required
									value={form.address}
									onChange={(e) => update("address", e.target.value)}
									rows={2}
									className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 ring-gold focus:ring-offset-2 resize-none"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-foreground mb-1.5">Number of Dependants</label>
								<input
									type="number"
									required
									min={0}
									value={form.dependants}
									onChange={(e) => update("dependants", e.target.value)}
									className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 ring-gold focus:ring-offset-2"
								/>
							</div>

							<div className="pt-2">
								<h2 className="font-serif text-xl font-medium text-foreground">Document Uploads</h2>
								<p className="text-sm text-muted-foreground mt-1">
									Upload your required documents below (PDF or image). If you cannot upload now, submit and then WhatsApp us
									the documents.
								</p>

								<div className="mt-4 space-y-4">
									{docFields.map((d) => (
										<div key={d.key} className="p-4 rounded-lg border border-border bg-muted">
											<label className="block text-sm font-medium text-foreground mb-2">
												{d.label} {d.required ? <span className="text-red-500">*</span> : null}
											</label>
											<div className="flex flex-col sm:flex-row sm:items-center gap-3">
												<input
													type="file"
													required={d.required}
													accept="application/pdf,image/*"
													onChange={(e) => updateDoc(d.key, e.target.files?.[0] ?? null)}
													className="block w-full text-sm"
												/>
												<div className="flex items-center gap-2 text-xs text-muted-foreground">
													<Upload className="w-4 h-4" />
													{docs[d.key]?.name ? docs[d.key]?.name : "No file selected"}
												</div>
											</div>
										</div>
									))}
								</div>
							</div>

							<label className="flex items-start gap-3 cursor-pointer">
								<input
									type="checkbox"
									required
									checked={form.consent}
									onChange={(e) => update("consent", e.target.checked)}
									className="mt-1 accent-[hsl(43,86%,39%)]"
								/>
								<span className="text-sm text-muted-foreground">
									I consent to Mhlambi’s Funeral Home processing my personal information for application purposes.
								</span>
							</label>

							<button
								type="submit"
								className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-navy-light transition-colors"
							>
								Submit Application
							</button>

							<p className="text-xs text-muted-foreground">
								Note: This online form does not process payments. A team member will contact you to confirm your application.
							</p>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default JoinPage;
