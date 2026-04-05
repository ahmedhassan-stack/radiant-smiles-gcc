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
  { before: before1, after: after1, treatment: "تبييض وتنظيف" },
  { before: before2, after: after2, treatment: "تقويم وتجميل" },
  { before: before3, after: after3, treatment: "قشور خزفية" },
  { before: before4, after: after4, treatment: "علاج شامل" },
  { before: before5, after: after5, treatment: "تبييض احترافي" },
  { before: before6, after: after6, treatment: "تقويم الأسنان" },
  { before: before7, after: after7, treatment: "ابتسامة هوليوود" },
  { before: before8, after: after8, treatment: "ترميم كامل" },
];

const BeforeAfterGallery = () => (
  <section id="gallery" className="py-20 bg-background" dir="rtl">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-tajawal">نتائج قبل وبعد</h2>
        <p className="text-muted-foreground font-tajawal mt-2">Before & After Results</p>
        <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        {cases.map((c, i) => (
          <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-md border border-border hover:shadow-xl transition-shadow">
            <div className="grid grid-cols-2">
              <div className="relative">
                <img src={c.before} alt={`قبل - ${c.treatment}`} loading="lazy" width={640} height={512} className="w-full h-44 sm:h-52 object-cover" />
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-foreground/80 text-background text-xs px-3 py-1 rounded-full font-tajawal font-bold">قبل</span>
              </div>
              <div className="relative">
                <img src={c.after} alt={`بعد - ${c.treatment}`} loading="lazy" width={640} height={512} className="w-full h-44 sm:h-52 object-cover" />
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-tajawal font-bold">بعد</span>
              </div>
            </div>
            <div className="p-3 text-center border-t border-border">
              <p className="font-bold text-foreground font-tajawal text-sm">{c.treatment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BeforeAfterGallery;
