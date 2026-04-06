import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Save, Check } from "lucide-react";
import { toast } from "sonner";

const AdminClinicInfo = () => {
  const [data, setData] = useState({ clinic_name: "", phone: "", whatsapp: "", email: "", address: "", working_hours: "", google_maps_link: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("clinic_info").select("*").single().then(({ data: d }) => {
      if (d) setData({
        clinic_name: d.clinic_name || "",
        phone: d.phone || "",
        whatsapp: d.whatsapp || "",
        email: d.email || "",
        address: d.address || "",
        working_hours: typeof d.working_hours === "string" ? d.working_hours : JSON.stringify(d.working_hours || ""),
        google_maps_link: d.google_maps_link || "",
      });
    });
  }, []);

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("clinic_info").upsert({
      id: 1, clinic_name: data.clinic_name, phone: data.phone, whatsapp: data.whatsapp,
      email: data.email, address: data.address, working_hours: data.working_hours, google_maps_link: data.google_maps_link,
    });
    setSaving(false);
    if (error) toast.error("خطأ في الحفظ");
    else { toast.success("تم الحفظ بنجاح"); window.dispatchEvent(new Event("clinic-data-updated")); }
  };

  const Field = ({ label, field, dir }: { label: string; field: keyof typeof data; dir?: string }) => (
    <div>
      <label className="block text-xs font-bold text-muted-foreground font-tajawal mb-1">{label}</label>
      <input type="text" value={data[field]} onChange={e => setData({ ...data, [field]: e.target.value })} dir={dir}
        className="w-full border border-input rounded-lg px-3 py-2 bg-background font-tajawal text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="اسم العيادة" field="clinic_name" />
        <Field label="رقم الهاتف" field="phone" dir="ltr" />
        <Field label="رقم الواتساب" field="whatsapp" dir="ltr" />
        <Field label="البريد الإلكتروني" field="email" dir="ltr" />
        <Field label="العنوان" field="address" />
        <Field label="رابط خرائط قوقل" field="google_maps_link" dir="ltr" />
      </div>
      <div>
        <label className="block text-xs font-bold text-muted-foreground font-tajawal mb-1">أوقات العمل</label>
        <textarea value={data.working_hours} onChange={e => setData({ ...data, working_hours: e.target.value })} rows={3}
          className="w-full border border-input rounded-lg px-3 py-2 bg-background font-tajawal text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
      </div>
      <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-bold font-tajawal text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
        {saving ? "جاري الحفظ..." : <><Save size={16} /> حفظ التغييرات</>}
      </button>
    </div>
  );
};

export default AdminClinicInfo;
