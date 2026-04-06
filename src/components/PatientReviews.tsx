import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Review {
  id: string;
  name: string;
  text: string;
  stars: number;
  created_at: string;
}

const Stars = ({ count, onClick }: { count: number; onClick?: (n: number) => void }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((n) => (
      <Star key={n} size={18}
        className={`${n <= count ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"} ${onClick ? "cursor-pointer" : ""}`}
        onClick={() => onClick?.(n)} />
    ))}
  </div>
);

const PatientReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [stars, setStars] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    supabase.from("reviews").select("*").eq("is_approved", true).order("created_at", { ascending: false }).then(({ data }) => {
      if (data) setReviews(data.map(r => ({ ...r, stars: r.stars ?? 5 })));
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    const { error } = await supabase.from("reviews").insert({ name: name.trim(), text: text.trim(), stars });
    if (error) { toast.error("حدث خطأ، حاول مرة أخرى"); return; }
    setName(""); setText(""); setStars(5);
    setSubmitted(true);
    toast.success("شكراً لتقييمك! سيظهر بعد المراجعة");
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
          {reviews.map((r) => (
            <div key={r.id} className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <Stars count={r.stars} />
              <p className="text-foreground font-tajawal mt-4 mb-4 leading-relaxed text-sm">"{r.text}"</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground font-tajawal text-sm">{r.name}</span>
                <span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString("ar-SA")}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-xl mx-auto bg-card border border-border rounded-2xl p-8">
          <h3 className="text-xl font-bold text-foreground font-tajawal mb-6 text-center">أضف تقييمك</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-foreground font-tajawal mb-1">الاسم</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required maxLength={100}
                className="w-full border border-input rounded-lg px-4 py-2.5 text-foreground bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring" placeholder="أدخل اسمك" />
            </div>
            <div>
              <label className="block text-sm font-bold text-foreground font-tajawal mb-1">عدد النجوم</label>
              <Stars count={stars} onClick={setStars} />
            </div>
            <div>
              <label className="block text-sm font-bold text-foreground font-tajawal mb-1">نص التقييم</label>
              <textarea value={text} onChange={e => setText(e.target.value)} rows={3} required maxLength={500}
                className="w-full border border-input rounded-lg px-4 py-2.5 text-foreground bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="شاركنا تجربتك..." />
            </div>
            <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold font-tajawal hover:opacity-90 transition-opacity">
              إرسال التقييم
            </button>
            {submitted && <p className="text-center text-green-600 font-tajawal font-bold">✅ تم إرسال تقييمك، سيظهر بعد المراجعة</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default PatientReviews;
