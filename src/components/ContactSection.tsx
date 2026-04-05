import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="py-20 bg-background" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-tajawal">تواصل معنا</h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4 shadow-md">
            <div>
              <label className="block text-sm font-bold text-foreground font-tajawal mb-1">الاسم</label>
              <input type="text" required maxLength={100} className="w-full border border-input rounded-lg px-4 py-2.5 bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring" placeholder="اسمك الكامل" />
            </div>
            <div>
              <label className="block text-sm font-bold text-foreground font-tajawal mb-1">رقم الهاتف</label>
              <input type="tel" required maxLength={15} className="w-full border border-input rounded-lg px-4 py-2.5 bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring" placeholder="+966 XXXXXXXXX" dir="ltr" />
            </div>
            <div>
              <label className="block text-sm font-bold text-foreground font-tajawal mb-1">البريد الإلكتروني</label>
              <input type="email" maxLength={100} className="w-full border border-input rounded-lg px-4 py-2.5 bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring" placeholder="email@example.com" dir="ltr" />
            </div>
            <div>
              <label className="block text-sm font-bold text-foreground font-tajawal mb-1">الرسالة</label>
              <textarea rows={4} required maxLength={1000} className="w-full border border-input rounded-lg px-4 py-2.5 bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="اكتب رسالتك هنا..." />
            </div>
            <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold font-tajawal hover:opacity-90 transition-opacity">
              إرسال
            </button>
            {sent && <p className="text-center text-green-600 font-tajawal font-bold">✅ تم إرسال رسالتك بنجاح!</p>}
          </form>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="text-primary" size={22} />
              </div>
              <div>
                <h4 className="font-bold text-foreground font-tajawal">العنوان</h4>
                <p className="text-muted-foreground font-tajawal text-sm">طريق الملك فهد، حي العليا، الرياض</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="text-primary" size={22} />
              </div>
              <div>
                <h4 className="font-bold text-foreground font-tajawal">الهاتف</h4>
                <p className="text-muted-foreground font-tajawal text-sm" dir="ltr">+966 9200 12345</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="text-primary" size={22} />
              </div>
              <div>
                <h4 className="font-bold text-foreground font-tajawal">البريد الإلكتروني</h4>
                <p className="text-muted-foreground font-tajawal text-sm" dir="ltr">info@al-ibtisama.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="text-primary" size={22} />
              </div>
              <div>
                <h4 className="font-bold text-foreground font-tajawal">أوقات العمل</h4>
                <p className="text-muted-foreground font-tajawal text-sm">السبت - الخميس: ٩ صباحاً - ٩ مساءً</p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-border h-56 bg-muted flex items-center justify-center mt-6">
              <iframe
                title="موقع العيادة"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.6!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsijMCcxMy4xIkU!5e0!3m2!1sar!2ssa!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
