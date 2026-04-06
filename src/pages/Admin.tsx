import { useState, useEffect } from "react";
import { LogOut, Save, Check } from "lucide-react";
import { getClinicData, saveClinicData, type ClinicData } from "@/lib/clinicData";

const ADMIN_USER = "admin";
const ADMIN_PASS = "clinic2026";

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState<ClinicData>(getClinicData());
  const [saved, setSaved] = useState(false);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setAuthed(true);
      setError("");
    } else {
      setError("اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  };

  const handleSave = () => {
    saveClinicData(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateService = (i: number, field: string, value: string) => {
    const services = [...data.services];
    services[i] = { ...services[i], [field]: value };
    setData({ ...data, services });
  };

  const updateDoctor = (i: number, field: string, value: string) => {
    const doctors = [...data.doctors];
    doctors[i] = { ...doctors[i], [field]: value };
    setData({ ...data, doctors });
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5 flex items-center justify-center p-4" dir="rtl">
        <form onSubmit={login} className="bg-card border border-border rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <span className="text-5xl block">🦷</span>
            <h1 className="text-2xl font-extrabold text-foreground font-tajawal">لوحة التحكم</h1>
            <p className="text-muted-foreground font-tajawal text-sm">عيادة الابتسامة</p>
          </div>
          {error && <p className="text-red-500 text-center font-tajawal text-sm bg-red-50 rounded-lg py-2">{error}</p>}
          <div>
            <label className="block text-sm font-bold text-foreground font-tajawal mb-1">اسم المستخدم</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required className="w-full border border-input rounded-lg px-4 py-2.5 bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-bold text-foreground font-tajawal mb-1">كلمة المرور</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full border border-input rounded-lg px-4 py-2.5 bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold font-tajawal hover:opacity-90 transition-opacity">
            تسجيل الدخول
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/50" dir="rtl">
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🦷</span>
            <h1 className="text-xl font-extrabold text-foreground font-tajawal">لوحة التحكم</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleSave} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-bold font-tajawal text-sm hover:opacity-90 transition-opacity">
              {saved ? <><Check size={16} /> تم الحفظ</> : <><Save size={16} /> حفظ التغييرات</>}
            </button>
            <button onClick={() => setAuthed(false)} className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground px-4 py-2.5 rounded-lg font-bold font-tajawal text-sm hover:opacity-90 transition-opacity">
              <LogOut size={16} /> خروج
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* General Info */}
        <section className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-extrabold text-foreground font-tajawal border-b border-border pb-3">المعلومات العامة</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="رقم الهاتف" value={data.phone} onChange={v => setData({...data, phone: v})} dir="ltr" />
            <Field label="البريد الإلكتروني" value={data.email} onChange={v => setData({...data, email: v})} dir="ltr" />
            <Field label="العنوان" value={data.address} onChange={v => setData({...data, address: v})} />
            <Field label="أوقات العمل" value={data.workingHours} onChange={v => setData({...data, workingHours: v})} />
          </div>
        </section>

        {/* Services */}
        <section className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-extrabold text-foreground font-tajawal border-b border-border pb-3">أسعار الخدمات</h2>
          <div className="space-y-4">
            {data.services.map((s, i) => (
              <div key={i} className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-muted/50 rounded-xl border border-border">
                <Field label="الخدمة" value={s.title} onChange={v => updateService(i, "title", v)} />
                <Field label="الوصف" value={s.desc} onChange={v => updateService(i, "desc", v)} />
                <Field label="المدة" value={s.duration} onChange={v => updateService(i, "duration", v)} />
                <Field label="السعر" value={s.price} onChange={v => updateService(i, "price", v)} />
              </div>
            ))}
          </div>
        </section>

        {/* Doctors */}
        <section className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-extrabold text-foreground font-tajawal border-b border-border pb-3">معلومات الأطباء</h2>
          <div className="space-y-4">
            {data.doctors.map((d, i) => (
              <div key={i} className="grid sm:grid-cols-3 gap-3 p-4 bg-muted/50 rounded-xl border border-border">
                <Field label="الاسم" value={d.name} onChange={v => updateDoctor(i, "name", v)} />
                <Field label="التخصص" value={d.specialty} onChange={v => updateDoctor(i, "specialty", v)} />
                <Field label="سنوات الخبرة" value={d.exp} onChange={v => updateDoctor(i, "exp", v)} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

const Field = ({ label, value, onChange, dir }: { label: string; value: string; onChange: (v: string) => void; dir?: string }) => (
  <div>
    <label className="block text-xs font-bold text-muted-foreground font-tajawal mb-1">{label}</label>
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      dir={dir}
      className="w-full border border-input rounded-lg px-3 py-2 bg-background font-tajawal text-sm focus:outline-none focus:ring-2 focus:ring-ring"
    />
  </div>
);

export default Admin;
