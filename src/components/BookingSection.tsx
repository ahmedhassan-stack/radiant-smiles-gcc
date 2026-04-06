import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const BookingSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [services, setServices] = useState<{ id: string; title: string }[]>([]);
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "", service: "", serviceId: "", date: "", time: "", notes: "" });

  const timeSlots = [
    "٩:٠٠ صباحاً", "١٠:٠٠ صباحاً", "١١:٠٠ صباحاً", "١٢:٠٠ ظهراً",
    "١:٠٠ مساءً", "٢:٠٠ مساءً", "٣:٠٠ مساءً", "٤:٠٠ مساءً",
    "٥:٠٠ مساءً", "٦:٠٠ مساءً", "٧:٠٠ مساءً", "٨:٠٠ مساءً",
  ];

  useEffect(() => {
    supabase.from("services").select("id, title").eq("is_available", true).order("sort_order").then(({ data }) => {
      if (data) setServices(data);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const selectedService = services.find(s => s.id === form.serviceId);
    const { error } = await supabase.from("bookings").insert({
      patient_name: `${form.firstName} ${form.lastName}`.trim(),
      patient_phone: `+966${form.phone}`,
      service_id: form.serviceId || null,
      service_name: selectedService?.title || form.service,
      booking_date: form.date || null,
      booking_time: form.time,
      notes: form.notes,
    });
    setSubmitting(false);
    if (error) { toast.error("حدث خطأ، حاول مرة أخرى"); return; }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="booking" className="py-20 bg-primary/5" dir="rtl">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
          <div className="text-6xl">✅</div>
          <h2 className="text-3xl font-extrabold text-foreground font-tajawal">تم استلام طلبك!</h2>
          <p className="text-lg text-muted-foreground font-tajawal">سنتواصل معك قريباً لتأكيد موعدك</p>
          <button onClick={() => { setSubmitted(false); setForm({ firstName: "", lastName: "", phone: "", email: "", service: "", serviceId: "", date: "", time: "", notes: "" }); }}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold font-tajawal hover:opacity-90 transition-opacity">
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
              <input type="text" required maxLength={50} value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })}
                className="w-full border border-input rounded-lg px-4 py-2.5 bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring" placeholder="الاسم الأول" />
            </div>
            <div>
              <label className="block text-sm font-bold text-foreground font-tajawal mb-1">اسم العائلة</label>
              <input type="text" required maxLength={50} value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })}
                className="w-full border border-input rounded-lg px-4 py-2.5 bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring" placeholder="اسم العائلة" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-foreground font-tajawal mb-1">رقم الهاتف</label>
              <div className="flex">
                <span className="bg-muted border border-input rounded-r-lg px-3 py-2.5 text-sm text-muted-foreground font-tajawal border-l-0">966+</span>
                <input type="tel" required maxLength={15} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-input rounded-l-lg px-4 py-2.5 bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring" placeholder="5XXXXXXXX" dir="ltr" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-foreground font-tajawal mb-1">البريد الإلكتروني</label>
              <input type="email" maxLength={100} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full border border-input rounded-lg px-4 py-2.5 bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring" placeholder="email@example.com" dir="ltr" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-foreground font-tajawal mb-1">الخدمة المطلوبة</label>
            <select required value={form.serviceId} onChange={e => setForm({ ...form, serviceId: e.target.value })}
              className="w-full border border-input rounded-lg px-4 py-2.5 bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="">اختر الخدمة</option>
              {services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
            </select>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-foreground font-tajawal mb-1">التاريخ المفضل</label>
              <input type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                className="w-full border border-input rounded-lg px-4 py-2.5 bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-sm font-bold text-foreground font-tajawal mb-1">الوقت المفضل</label>
              <select required value={form.time} onChange={e => setForm({ ...form, time: e.target.value })}
                className="w-full border border-input rounded-lg px-4 py-2.5 bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">اختر الوقت</option>
                {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-foreground font-tajawal mb-1">ملاحظات إضافية (اختياري)</label>
            <textarea rows={3} maxLength={500} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
              className="w-full border border-input rounded-lg px-4 py-2.5 bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="أي ملاحظات تود إضافتها..." />
          </div>
          <button type="submit" disabled={submitting}
            className="w-full bg-primary text-primary-foreground py-4 rounded-xl text-lg font-bold font-tajawal hover:opacity-90 transition-opacity shadow-md disabled:opacity-50">
            📅 {submitting ? "جاري الإرسال..." : "تأكيد الحجز"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookingSection;
