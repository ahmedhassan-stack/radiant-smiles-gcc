const services = [
  { icon: "🦷", title: "تبييض الأسنان", desc: "جلسة واحدة تمنحك ابتسامة مشرقة", duration: "١ ساعة", price: "٥٠٠ ريال" },
  { icon: "🔧", title: "حشو الأسنان", desc: "علاج التسوس بأحدث المواد", duration: "٤٥ دقيقة", price: "٢٠٠ ريال" },
  { icon: "🦴", title: "زراعة الأسنان", desc: "حل دائم للأسنان المفقودة", duration: "جلستان", price: "٣٠٠٠ ريال" },
  { icon: "😁", title: "تقويم الأسنان", desc: "ابتسامة مستقيمة ومثالية", duration: "متعدد الجلسات", price: "٨٠٠٠ ريال" },
  { icon: "🧼", title: "تنظيف الأسنان", desc: "تنظيف عميق واحترافي", duration: "٣٠ دقيقة", price: "١٥٠ ريال" },
  { icon: "👑", title: "تركيب التاج والجسر", desc: "استعادة وظيفة الأسنان وجماليتها", duration: "جلستان", price: "١٥٠٠ ريال" },
];

const ClinicServices = () => (
  <section id="services" className="py-20 bg-background" dir="rtl">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-tajawal">خدماتنا الطبية المتميزة</h2>
        <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <span className="text-4xl block mb-4">{s.icon}</span>
            <h3 className="text-xl font-bold text-foreground font-tajawal mb-2">{s.title}</h3>
            <p className="text-muted-foreground font-tajawal mb-4 leading-relaxed">{s.desc}</p>
            <div className="flex items-center justify-between text-sm text-muted-foreground font-tajawal mb-4">
              <span>⏱ {s.duration}</span>
              <span className="font-bold text-primary">{s.price}</span>
            </div>
            <a
              href="#booking"
              className="block text-center bg-primary/10 text-primary py-2 rounded-lg font-bold font-tajawal hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              احجز الآن
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ClinicServices;
