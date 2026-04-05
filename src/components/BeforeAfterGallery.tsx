import before1 from "@/assets/before-1.jpg";
import after1 from "@/assets/after-1.jpg";
import before2 from "@/assets/before-2.jpg";
import after2 from "@/assets/after-2.jpg";
import before3 from "@/assets/before-3.jpg";
import after3 from "@/assets/after-3.jpg";
import before4 from "@/assets/before-4.jpg";
import after4 from "@/assets/after-4.jpg";
import before5 from "@/assets/before-5.jpg";
import after5 from "@/assets/after-5.jpg";
import before6 from "@/assets/before-6.jpg";
import after6 from "@/assets/after-6.jpg";
import before7 from "@/assets/before-7.jpg";
import after7 from "@/assets/after-7.jpg";
import before8 from "@/assets/before-8.jpg";
import after8 from "@/assets/after-8.jpg";

const cases = [
  { before: before1, after: after1, treatment: "تبييض وتنظيف", treatmentEn: "Whitening & Cleaning" },
  { before: before2, after: after2, treatment: "تقويم وتجميل", treatmentEn: "Orthodontics & Cosmetics" },
  { before: before3, after: after3, treatment: "قشور خزفية", treatmentEn: "Porcelain Veneers" },
  { before: before4, after: after4, treatment: "علاج شامل", treatmentEn: "Full Treatment" },
  { before: before5, after: after5, treatment: "تبييض احترافي", treatmentEn: "Professional Whitening" },
  { before: before6, after: after6, treatment: "تقويم الأسنان", treatmentEn: "Orthodontics" },
  { before: before7, after: after7, treatment: "ابتسامة هوليوود", treatmentEn: "Hollywood Smile" },
  { before: before8, after: after8, treatment: "ترميم كامل", treatmentEn: "Full Restoration" },
];

const BeforeAfterGallery = () => {
  return (
    <section id="gallery" className="py-24 bg-background" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-extrabold text-foreground font-tajawal">نتائج قبل وبعد</h2>
          <p className="text-muted-foreground font-tajawal text-lg">Before & After Results</p>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          <p className="text-muted-foreground font-tajawal max-w-2xl mx-auto">
            شاهد التحولات المذهلة التي حققناها لمرضانا بأحدث تقنيات طب الأسنان التجميلي
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {cases.map((item, i) => (
            <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-shadow">
              <div className="grid grid-cols-2">
                <div className="relative">
                  <img
                    src={item.before}
                    alt={`قبل العلاج - حالة ${i + 1}`}
                    loading="lazy"
                    width={640}
                    height={512}
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-foreground/80 text-background px-4 py-1 rounded-full text-sm font-tajawal font-bold">
                    قبل
                  </span>
                </div>
                <div className="relative">
                  <img
                    src={item.after}
                    alt={`بعد العلاج - حالة ${i + 1}`}
                    loading="lazy"
                    width={640}
                    height={512}
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-tajawal font-bold">
                    بعد
                  </span>
                </div>
              </div>
              <div className="p-4 text-center border-t border-border">
                <p className="font-bold text-foreground font-tajawal">{item.treatment}</p>
                <p className="text-xs text-muted-foreground">{item.treatmentEn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;
