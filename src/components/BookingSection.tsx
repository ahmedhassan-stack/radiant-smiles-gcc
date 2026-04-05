import { useState } from "react";

const serviceOptions = [
  "تبييض الأسنان",
  "حشو الأسنان",
  "زراعة الأسنان",
  "تقويم الأسنان",
  "تنظيف الأسنان",
  "تركيب التاج والجسر",
];

const timeSlots = [
  "٩:٠٠ صباحاً", "١٠:٠٠ صباحاً", "١١:٠٠ صباحاً", "١٢:٠٠ ظهراً",
  "١:٠٠ مساءً", "٢:٠٠ مساءً", "٣:٠٠ مساءً", "٤:٠٠ مساءً",
  "٥:٠٠ مساءً", "٦:٠٠ مساءً", "٧:٠٠ مساءً", "٨:٠٠ مساءً",
];

const BookingSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="booking" className="py-20 bg-primary/5" dir="rtl">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
          <div className="text-6xl">✅</div>
          <h2 className="text-3xl font-extrabold text-foreground font-tajawal">تم استلام طلبك!</h2>
          <p className="text-lg text-muted-foreground font-tajawal">سنتواصل معك قريباً لتأكيد موعدك</p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold font-tajawal hover:opacity-90 transition-opacity"
          >
            حجز موعد آخر
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 bg-primary/5" dir="rtl">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-tajawal">احجز موعدك الآن</h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-lg space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-foreground font-tajawal mb-1">الاسم الأول</label>
              <input type="text" required maxLength={50} className="w-full border border-input rounded-lg px-4 py-2.5 bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring" placeholder="الاسم الأول" />
            </div>
            <div>
              <label className="block text-sm font-bold text-foreground font-tajawal mb-1">اسم العائلة</label>
              <input type="text" required maxLength={50} className="w-full border border-input rounded-lg px-4 py-2.5 bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring" placeholder="اسم العائلة" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-foreground font-tajawal mb-1">رقم الهاتف</label>
              <div className="flex">
                <span className="bg-muted border border-input rounded-r-lg px-3 py-2.5 text-sm text-muted-foreground font-tajawal border-l-0">966+</span>
                <input type="tel" required maxLength={15} className="w-full border border-input rounded-l-lg px-4 py-2.5 bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring" placeholder="5XXXXXXXX" dir="ltr" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-foreground font-tajawal mb-1">البريد الإلكتروني</label>
              <input type="email" maxLength={100} className="w-full border border-input rounded-lg px-4 py-2.5 bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring" placeholder="email@example.com" dir="ltr" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground font-tajawal mb-1">الخدمة المطلوبة</label>
            <select required className="w-full border border-input rounded-lg px-4 py-2.5 bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="">اختر الخدمة</option>
              {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-foreground font-tajawal mb-1">التاريخ المفضل</label>
              <input type="date" required className="w-full border border-input rounded-lg px-4 py-2.5 bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-sm font-bold text-foreground font-tajawal mb-1">الوقت المفضل</label>
              <select required className="w-full border border-input rounded-lg px-4 py-2.5 bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">اختر الوقت</option>
                {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground font-tajawal mb-1">ملاحظات إضافية (اختياري)</label>
            <textarea rows={3} maxLength={500} className="w-full border border-input rounded-lg px-4 py-2.5 bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="أي ملاحظات تود إضافتها..." />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-4 rounded-xl text-lg font-bold font-tajawal hover:opacity-90 transition-opacity shadow-md"
          >
            📅 تأكيد الحجز
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookingSection;
