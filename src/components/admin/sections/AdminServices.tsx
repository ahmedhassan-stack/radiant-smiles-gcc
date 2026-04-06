import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

interface Service {
  id?: string;
  icon: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  is_available: boolean;
  sort_order: number;
}

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("services").select("*").order("sort_order");
    if (data) setServices(data.map(s => ({ ...s, icon: s.icon || "🦷", description: s.description || "", price: s.price || "", duration: s.duration || "", is_available: s.is_available ?? true, sort_order: s.sort_order ?? 0 })));
  };

  useEffect(() => { load(); }, []);

  const addService = () => {
    setServices([...services, { icon: "🦷", title: "", description: "", price: "", duration: "", is_available: true, sort_order: services.length }]);
  };

  const update = (i: number, field: string, value: any) => {
    const s = [...services];
    s[i] = { ...s[i], [field]: value };
    setServices(s);
  };

  const remove = async (i: number) => {
    const s = services[i];
    if (s.id) await supabase.from("services").delete().eq("id", s.id);
    setServices(services.filter((_, idx) => idx !== i));
    toast.success("تم حذف الخدمة");
    window.dispatchEvent(new Event("clinic-data-updated"));
  };

  const save = async () => {
    setSaving(true);
    for (let i = 0; i < services.length; i++) {
      const s = services[i];
      const payload = { icon: s.icon, title: s.title, description: s.description, price: s.price, duration: s.duration, is_available: s.is_available, sort_order: i };
      if (s.id) await supabase.from("services").update(payload).eq("id", s.id);
      else {
        const { data } = await supabase.from("services").insert(payload).select().single();
        if (data) services[i].id = data.id;
      }
    }
    setSaving(false);
    toast.success("تم الحفظ بنجاح");
    window.dispatchEvent(new Event("clinic-data-updated"));
  };

  return (
    <div className="space-y-4">
      {services.map((s, i) => (
        <div key={s.id || i} className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input type="text" value={s.icon} onChange={e => update(i, "icon", e.target.value)} className="w-12 text-center border border-input rounded-lg p-1 text-xl bg-background" />
              <input type="text" value={s.title} onChange={e => update(i, "title", e.target.value)} placeholder="اسم الخدمة"
                className="border border-input rounded-lg px-3 py-2 bg-background font-tajawal text-sm font-bold focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1 text-xs font-tajawal">
                <input type="checkbox" checked={s.is_available} onChange={e => update(i, "is_available", e.target.checked)} className="rounded" />
                متاح
              </label>
              <button onClick={() => remove(i)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-muted-foreground font-tajawal mb-1">الوصف</label>
              <input type="text" value={s.description} onChange={e => update(i, "description", e.target.value)}
                className="w-full border border-input rounded-lg px-3 py-2 bg-background font-tajawal text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground font-tajawal mb-1">السعر</label>
              <input type="text" value={s.price} onChange={e => update(i, "price", e.target.value)}
                className="w-full border border-input rounded-lg px-3 py-2 bg-background font-tajawal text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground font-tajawal mb-1">المدة</label>
              <input type="text" value={s.duration} onChange={e => update(i, "duration", e.target.value)}
                className="w-full border border-input rounded-lg px-3 py-2 bg-background font-tajawal text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
        </div>
      ))}
      <div className="flex gap-3">
        <button onClick={addService} className="inline-flex items-center gap-2 bg-muted px-4 py-2.5 rounded-lg font-tajawal text-sm hover:bg-muted/80 transition-colors">
          <Plus size={16} /> إضافة خدمة
        </button>
        <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-bold font-tajawal text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
          <Save size={16} /> {saving ? "جاري الحفظ..." : "حفظ الكل"}
        </button>
      </div>
    </div>
  );
};

export default AdminServices;
