import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">ن</span>
            </div>
            <div className="text-right">
              <h1 className="text-lg font-bold text-foreground font-tajawal">نور الابتسامة</h1>
              <p className="text-xs text-muted-foreground">Noor Al Ibtisama</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 font-tajawal">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">الرئيسية</a>
            <a href="#services" className="text-foreground hover:text-primary transition-colors">خدماتنا</a>
            <a href="#gallery" className="text-foreground hover:text-primary transition-colors">النتائج</a>
            <a href="#testimonials" className="text-foreground hover:text-primary transition-colors">آراء المرضى</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">تواصل معنا</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+966501234567"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-tajawal hover:opacity-90 transition-opacity"
            >
              <Phone size={16} />
              <span>احجز موعدك</span>
            </a>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-t border-border px-4 py-4 space-y-3 font-tajawal text-right">
          <a href="#home" className="block text-foreground hover:text-primary" onClick={() => setIsOpen(false)}>الرئيسية</a>
          <a href="#services" className="block text-foreground hover:text-primary" onClick={() => setIsOpen(false)}>خدماتنا</a>
          <a href="#gallery" className="block text-foreground hover:text-primary" onClick={() => setIsOpen(false)}>النتائج</a>
          <a href="#testimonials" className="block text-foreground hover:text-primary" onClick={() => setIsOpen(false)}>آراء المرضى</a>
          <a href="#contact" className="block text-foreground hover:text-primary" onClick={() => setIsOpen(false)}>تواصل معنا</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
