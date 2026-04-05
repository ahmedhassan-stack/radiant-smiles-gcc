import { Sparkles, Shield, Smile, Stethoscope, Crown, Zap } from "lucide-react";

const services = [
  { icon: Sparkles, title: "تبييض الأسنان", titleEn: "Teeth Whitening", desc: "تبييض احترافي بأحدث التقنيات للحصول على ابتسامة مشرقة" },
  { icon: Crown, title: "ابتسامة هوليوود", titleEn: "Hollywood Smile", desc: "قشور خزفية عالية الجودة لابتسامة متناسقة وطبيعية" },
  { icon: Shield, title: "زراعة الأسنان", titleEn: "Dental Implants", desc: "حلول زراعة متقدمة لاستعادة أسنانك بشكل دائم" },
  { icon: Smile, title: "تقويم الأسنان", titleEn: "Orthodontics", desc: "تقويم شفاف ومعدني لأسنان مستقيمة ومتناسقة" },
  { icon: Stethoscope, title: "علاج اللثة", titleEn: "Gum Treatment", desc: "علاج شامل لأمراض اللثة والحفاظ على صحة الفم" },
  { icon: Zap, title: "علاج العصب", titleEn: "Root Canal", desc: "علاج جذور الأسنان بدقة عالية وبدون ألم" },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-secondary/30" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-extrabold text-foreground font-tajawal">خدماتنا المتميزة</h2>
          <p className="text-muted-foreground font-tajawal text-lg">Our Premium Services</p>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow border border-border group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-bold text-foreground font-tajawal mb-2">{service.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">{service.titleEn}</p>
              <p className="text-muted-foreground font-tajawal leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
