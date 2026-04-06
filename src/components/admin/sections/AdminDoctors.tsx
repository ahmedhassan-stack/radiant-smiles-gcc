import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Save, Upload } from "lucide-react";
import { toast } from "sonner";

interface Doctor {
  id?: string;
  name: string;
  specialty: string;
  experience: string;
  photo_url: string;
  bio: string;
  sort_order: number;
}

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("doctors").select("*").order("sort_order");
    if (data) setDoctors(data.map(d => ({ ...d, specialty: d.specialty || "", experience: d.experience || "", photo_url: d.photo_url || "", bio: d.bio || "", sort_order: d.sort_order ?? 0 })));
  };

  useEffect(() => { load(); }, []);

  const addDoctor = () => {
    setDoctors([...doctors, { name: "", specialty: "", experience: "", photo_url: "", bio: "", sort_order: doctors.length }]);
  };

  const update = (i: number, field: string, value: string) => {
    const d = [...doctors];
    d[i] = { ...d[i], [field]: value };
    setDoctors(d);
  };

  const uploadPhoto = async (i: number, file: File) => {
    const ext = file.name.split(".").pop();
    const path = `doctors/doc-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("clinic-images").upload(path, file);
    if (error) { toast.error("خطأ في رفع الصورة"); return; }
    const { data: urlData } = supabase.storage.from("clinic-images").getPublicUrl(path);
    update(i, "photo_url", urlData.publicUrl);
    toast.success("تم رفع الصورة");
  };

  const remove = async (i: number) => {
    const d = doctors[i];
    if (d.id) await supabase.from("doctors").delete().eq("id", d.id);
    setDoctors(doctors.filter((_, idx) => idx !== i));
    toast.success("تم حذف الطبيب");
    window.dispatchEvent(new Event("clinic-data-updated"));
  };

  const save = async () => {
    setSaving(true);
    for (let i = 0; i < doctors.length; i++) {
      const d = doctors[i];
      const payload = { name: d.name, specialty: d.specialty, experience: d.experience, photo_url: d.photo_url, bio: d.bio, sort_order: i };
      if (d.id) await supabase.from("doctors").update(payload).eq("id", d.id);
      else {
        const { data } = await supabase.from("doctors").insert(payload).select().single();
        if (data) doctors[i].id = data.id;
      }
    }
    setSaving(false);
    toast.success("تم الحفظ بنجاح");
    window.dispatchEvent(new Event("clinic-data-updated"));
  };

  return (
    <div className="space-y-4">
      {doctors.map((d, i) => (
        <div key={d.id || i} className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {d.photo_url ? <img src={d.photo_url} alt={d.name} className="w-12 h-12 rounded-full object-cover border" /> : <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl">👨‍⚕️</div>}
              <input type="text" value={d.name} onChange={e => update(i, "name", e.target.value)} placeholder="اسم الطبيب"
                className="border border-input rounded-lg px-3 py-2 bg-background font-tajawal text-sm font-bold focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <button onClick={() => remove(i)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
              <Trash2 size={16} />
            </button>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-muted-foreground font-tajawal mb-1">التخصص</label>
              <input type="text" value={d.specialty} onChange={e => update(i, "specialty", e.target.value)}
                className="w-full border border-input rounded-lg px-3 py-2 bg-background font-tajawal text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground font-tajawal mb-1">سنوات الخبرة</label>
              <input type="text" value={d.experience} onChange={e => update(i, "experience", e.target.value)}
                className="w-full border border-input rounded-lg px-3 py-2 bg-background font-tajawal text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground font-tajawal mb-1">الصورة</label>
              <label className="inline-flex items-center gap-1 bg-muted px-3 py-2 rounded-lg cursor-pointer hover:bg-muted/80 transition-colors text-xs font-tajawal">
                <Upload size={14} /> رفع صورة
                <input type="file" accept="image/*" onChange={e => e.target.files?.[0] && uploadPhoto(i, e.target.files[0])} className="hidden" />
              </label>
            </div>
          </div>
          <div>
            <label className="block text-xs text-muted-foreground font-tajawal mb-1">النبذة</label>
            <textarea value={d.bio} onChange={e => update(i, "bio", e.target.value)} rows={2}
              className="w-full border border-input rounded-lg px-3 py-2 bg-background font-tajawal text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
          </div>
        </div>
      ))}
      <div className="flex gap-3">
        <button onClick={addDoctor} className="inline-flex items-center gap-2 bg-muted px-4 py-2.5 rounded-lg font-tajawal text-sm hover:bg-muted/80 transition-colors">
          <Plus size={16} /> إضافة طبيب
        </button>
        <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-bold font-tajawal text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
          <Save size={16} /> {saving ? "جاري الحفظ..." : "حفظ الكل"}
        </button>
      </div>
    </div>
  );
};

export default AdminDoctors;
