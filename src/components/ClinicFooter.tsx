import { Instagram, MessageCircle } from "lucide-react";
import { useClinicData } from "@/hooks/useClinicData";

const ClinicFooter = () => {
  const { phone, email, address } = useClinicData();

  return (
    <footer className="bg-navy text-navy-foreground py-16" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🦷</span>
              <span className="text-xl font-extrabold font-tajawal">عيادة الابتسامة</span>
            </div>
            <p className="text-navy-foreground/70 font-tajawal text-sm leading-relaxed">ابتسامة صحية تبدأ هنا</p>
          </div>

          <div>
            <h4 className="font-bold font-tajawal mb-4">روابط سريعة</h4>
            <div className="space-y-2 text-sm font-tajawal">
              <a href="#home" className="block text-navy-foreground/70 hover:text-navy-foreground transition-colors">الرئيسية</a>
              <a href="#services" className="block text-navy-foreground/70 hover:text-navy-foreground transition-colors">الخدمات</a>
              <a href="#doctors" className="block text-navy-foreground/70 hover:text-navy-foreground transition-colors">الأطباء</a>
              <a href="#contact" className="block text-navy-foreground/70 hover:text-navy-foreground transition-colors">تواصل معنا</a>
            </div>
          </div>

          <div>
            <h4 className="font-bold font-tajawal mb-4">تواصل معنا</h4>
            <div className="space-y-2 text-sm font-tajawal text-navy-foreground/70">
              <p>📍 {address}</p>
              <p dir="ltr" className="text-right">📞 {phone}</p>
              <p>📧 {email}</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold font-tajawal mb-4">تابعنا</h4>
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: MessageCircle, label: "WhatsApp" },
              ].map((s) => (
                <a key={s.label} href="#" className="w-10 h-10 rounded-lg bg-navy-foreground/10 flex items-center justify-center hover:bg-navy-foreground/20 transition-colors" aria-label={s.label}>
                  <s.icon size={18} />
                </a>
              ))}
              <a href="#" className="w-10 h-10 rounded-lg bg-navy-foreground/10 flex items-center justify-center hover:bg-navy-foreground/20 transition-colors text-sm font-bold" aria-label="TikTok">T</a>
              <a href="#" className="w-10 h-10 rounded-lg bg-navy-foreground/10 flex items-center justify-center hover:bg-navy-foreground/20 transition-colors text-sm font-bold" aria-label="X">X</a>
            </div>
          </div>
        </div>

        <div className="border-t border-navy-foreground/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-navy-foreground/50 font-tajawal">
          <p>© ٢٠٢٦ عيادة الابتسامة. جميع الحقوق محفوظة</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-navy-foreground transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-navy-foreground transition-colors">الشروط والأحكام</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ClinicFooter;
