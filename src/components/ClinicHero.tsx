import clinicHero from "@/assets/clinic-hero.jpg";

const ClinicHero = () => (
  <section id="home" className="relative min-h-[90vh] flex items-center pt-16" dir="rtl">
    <div className="absolute inset-0">
      <img src={clinicHero} alt="عيادة الابتسامة" width={1920} height={1080} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-l from-foreground/80 via-foreground/60 to-foreground/40" />
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-2xl animate-fade-up">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary-foreground font-tajawal leading-tight mb-6">
          ابتسامة صحية تبدأ هنا
        </h1>
        <p className="text-lg sm:text-xl text-primary-foreground/90 font-tajawal leading-relaxed mb-8 max-w-xl">
          نقدم رعاية أسنان متطورة في قلب الرياض، نجمع بين الخبرة الطبية والتقنيات الحديثة
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#booking"
            className="bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-bold font-tajawal hover:opacity-90 transition-opacity shadow-lg"
          >
            احجز موعد الآن
          </a>
          <a
            href="#services"
            className="border-2 border-primary-foreground text-primary-foreground px-8 py-4 rounded-xl text-lg font-bold font-tajawal hover:bg-primary-foreground/10 transition-colors"
          >
            اكتشف خدماتنا
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default ClinicHero;
