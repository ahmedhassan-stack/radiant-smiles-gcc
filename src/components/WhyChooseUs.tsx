import { Trophy, Syringe, SmilePlus, BadgeDollarSign } from "lucide-react";

const features = [
  { icon: Trophy, title: "خبرة طبية عالية", desc: "فريق من أمهر الأطباء بخبرة تزيد عن ١٥ عاماً في مختلف تخصصات طب الأسنان" },
  { icon: Syringe, title: "أحدث التقنيات", desc: "نستخدم أحدث الأجهزة والتقنيات العالمية لضمان أفضل النتائج" },
  { icon: SmilePlus, title: "بيئة مريحة وآمنة", desc: "عيادة مصممة لتوفير أعلى معايير الراحة والتعقيم" },
  { icon: BadgeDollarSign, title: "أسعار تنافسية وشفافة", desc: "أسعار واضحة بدون رسوم خفية مع خيارات تقسيط مرنة" },
];

const WhyChooseUs = () => (
  <section className="py-20 bg-background" dir="rtl">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-tajawal">لماذا تختار عيادة الابتسامة؟</h2>
        <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <f.icon className="text-primary" size={28} />
            </div>
            <h3 className="text-lg font-bold text-foreground font-tajawal mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground font-tajawal leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
