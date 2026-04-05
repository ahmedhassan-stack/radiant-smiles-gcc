import { useState } from "react";
import { Star } from "lucide-react";

interface Review {
  name: string;
  text: string;
  stars: number;
  date: string;
}

const initialReviews: Review[] = [
  { name: "أمل خالد", text: "تجربة استثنائية وبحثت طويلاً عن عيادة بهذا المستوى. النتائج فاقت توقعاتي تماماً.", stars: 5, date: "٢٠٢٦/٠١/١٥" },
  { name: "فيصل عبدالله", text: "احترافية عالية وتعامل راقٍ جداً. أصبحت الآن أكثر ثقة بابتسامتي.", stars: 5, date: "٢٠٢٦/٠٢/٠٣" },
  { name: "لينا المنصور", text: "نظافة العيادة والاهتمام بأدق التفاصيل ما يميز عيادة الابتسامة.", stars: 5, date: "٢٠٢٦/٠٢/٢٠" },
  { name: "مشاري العنزي", text: "هدوء المكان واحترافية الفريق الطبي جعلت الأمر سهلاً ومريحاً.", stars: 5, date: "٢٠٢٦/٠٣/١٠" },
];

const Stars = ({ count, onClick }: { count: number; onClick?: (n: number) => void }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        size={18}
        className={`${n <= count ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"} ${onClick ? "cursor-pointer" : ""}`}
        onClick={() => onClick?.(n)}
      />
    ))}
  </div>
);

const PatientReviews = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [stars, setStars] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    const today = new Date();
    const dateStr = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")}`;
    setReviews([{ name: name.trim(), text: text.trim(), stars, date: dateStr }, ...reviews]);
    setName("");
    setText("");
    setStars(5);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="reviews" className="py-20 bg-secondary" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-tajawal">ماذا يقول مرضانا عنا</h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {reviews.map((r, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <Stars count={r.stars} />
              <p className="text-foreground font-tajawal mt-4 mb-4 leading-relaxed text-sm">"{r.text}"</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground font-tajawal text-sm">{r.name}</span>
                <span className="text-xs text-muted-foreground">{r.date}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-xl mx-auto bg-card border border-border rounded-2xl p-8">
          <h3 className="text-xl font-bold text-foreground font-tajawal mb-6 text-center">أضف تقييمك</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-foreground font-tajawal mb-1">الاسم</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-input rounded-lg px-4 py-2.5 text-foreground bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="أدخل اسمك"
                required
                maxLength={100}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-foreground font-tajawal mb-1">عدد النجوم</label>
              <Stars count={stars} onClick={setStars} />
            </div>
            <div>
              <label className="block text-sm font-bold text-foreground font-tajawal mb-1">نص التقييم</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={3}
                className="w-full border border-input rounded-lg px-4 py-2.5 text-foreground bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="شاركنا تجربتك..."
                required
                maxLength={500}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold font-tajawal hover:opacity-90 transition-opacity"
            >
              إرسال التقييم
            </button>
            {submitted && (
              <p className="text-center text-green-600 font-tajawal font-bold">✅ تم إضافة تقييمك بنجاح!</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default PatientReviews;
