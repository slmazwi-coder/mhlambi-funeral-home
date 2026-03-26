import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo.jpg";

const navLinks = [
	{ label: "Home", href: "#home" },
	{ label: "Plans", href: "#plans" },
	{ label: "Services", href: "#services" },
	{ label: "About", href: "#about" },
	{ label: "Pay Policy", href: "#pay" },
	{ label: "Applications", href: "/join" },
	{ label: "Contact", href: "#contact" },
];

const Navbar = () => {
	const [open, setOpen] = useState(false);

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
			<div className="container mx-auto flex items-center justify-between h-16 px-4">
				<a href="#home" className="flex items-center gap-3">
					<img src={logo} alt="Mhlambi's Funeral Home" className="h-12 w-12 rounded-full object-cover" />
					<div className="hidden sm:block">
						<span className="font-serif text-lg font-semibold text-foreground">Mhlambi's</span>
						<span className="block text-xs text-muted-foreground -mt-1">Funeral Home</span>
					</div>
				</a>

				<div className="hidden md:flex items-center gap-6">
					{navLinks.map((l) => (
						<a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
							{l.label}
						</a>
					))}
				</div>

				<div className="hidden md:flex items-center gap-3">
					<a href="tel:+27727458248" className="flex items-center gap-2 text-sm font-medium text-accent">
						<Phone className="w-4 h-4" />
						072 745 8248
					</a>
				</div>

				<button onClick={() => setOpen(!open)} className="md:hidden p-2 text-foreground">
					{open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
				</button>
			</div>

			{open && (
				<div className="md:hidden bg-card border-b border-border px-4 pb-4">
					{navLinks.map((l) => (
						<a
							key={l.href}
							href={l.href}
							onClick={() => setOpen(false)}
							className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
						>
							{l.label}
						</a>
					))}
					<a href="tel:+27727458248" className="flex items-center gap-2 pt-2 text-sm font-medium text-accent">
						<Phone className="w-4 h-4" /> 072 745 8248
					</a>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
