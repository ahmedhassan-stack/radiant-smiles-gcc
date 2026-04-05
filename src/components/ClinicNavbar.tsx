import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#home", label: "الرئيسية" },
  { href: "#services", label: "خدماتنا" },
  { href: "#doctors", label: "أطباؤنا" },
  { href: "#reviews", label: "آراء المرضى" },
  { href: "#contact", label: "تواصل معنا" },
];

const ClinicNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#home" className="flex items-center gap-2">
          <span className="text-2xl">🦷</span>
          <span className="text-xl font-extrabold text-primary font-tajawal">عيادة الابتسامة</span>
        </a>

        <div className="hidden md:flex items-center gap-8 font-tajawal text-sm font-medium">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-foreground hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#booking"
          className="hidden md:inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-bold font-tajawal hover:opacity-90 transition-opacity shadow-md"
        >
          📅 احجز موعد الآن
        </a>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-t border-border px-4 py-4 space-y-3 font-tajawal" dir="rtl">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="block text-foreground hover:text-primary py-1" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#booking" className="block bg-primary text-primary-foreground text-center py-2.5 rounded-lg font-bold" onClick={() => setOpen(false)}>
            📅 احجز موعد الآن
          </a>
        </div>
      )}
    </nav>
  );
};

export default ClinicNavbar;
