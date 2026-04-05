import heroImage from "@/assets/hero-smile.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16" dir="rtl">
      <div className="absolute inset-0 bg-gradient-to-l from-primary/5 via-background to-background" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-right">
            <div className="inline-block bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-tajawal border border-accent">
              ✨ عيادة أسنان متميزة في الرياض
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground font-tajawal leading-tight">
              ابتسامتك المثالية
              <br />
              <span className="text-primary">تبدأ من هنا</span>
            </h1>
            <p className="text-lg text-muted-foreground font-tajawal max-w-lg leading-relaxed">
              نقدم أحدث تقنيات طب الأسنان التجميلي والعلاجي بأيدي نخبة من الأطباء المتخصصين لنمنحك ابتسامة طبيعية وجذابة
            </p>
            <p className="text-sm text-muted-foreground font-tajawal">
              Your perfect smile starts here – Premium dental care in Riyadh
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/966501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-tajawal font-bold hover:opacity-90 transition-opacity shadow-lg"
              >
                احجز موعدك الآن
              </a>
              <a
                href="#gallery"
                className="border-2 border-primary text-primary px-8 py-4 rounded-xl text-lg font-tajawal font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                شاهد النتائج
              </a>
            </div>
            <div className="flex gap-12 pt-4">
              <div className="text-center">
                <p className="text-3xl font-extrabold text-primary font-tajawal">+١٥٠٠٠</p>
                <p className="text-sm text-muted-foreground font-tajawal">مريض سعيد</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-extrabold text-primary font-tajawal">+٢٠</p>
                <p className="text-sm text-muted-foreground font-tajawal">سنة خبرة</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-extrabold text-primary font-tajawal">+١٠</p>
                <p className="text-sm text-muted-foreground font-tajawal">أطباء متخصصين</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-accent/30">
              <img
                src={heroImage}
                alt="ابتسامة مثالية - عيادة نور الابتسامة"
                width={1280}
                height={768}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
