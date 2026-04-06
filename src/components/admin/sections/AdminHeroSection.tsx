import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Save, Upload } from "lucide-react";
import { toast } from "sonner";

const AdminHeroSection = () => {
  const [data, setData] = useState({ main_title: "", subtitle: "", hero_image: "", cta_text: "" });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    supabase.from("hero_section").select("*").single().then(({ data: d }) => {
      if (d) setData({ main_title: d.main_title || "", subtitle: d.subtitle || "", hero_image: d.hero_image || "", cta_text: d.cta_text || "" });
    });
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `hero/hero-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("clinic-images").upload(path, file);
    if (error) { toast.error("خطأ في رفع الصورة"); setUploading(false); return; }
    const { data: urlData } = supabase.storage.from("clinic-images").getPublicUrl(path);
    setData({ ...data, hero_image: urlData.publicUrl });
    setUploading(false);
    toast.success("تم رفع الصورة");
  };

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("hero_section").upsert({ id: 1, ...data });
    setSaving(false);
    if (error) toast.error("خطأ في الحفظ");
    else { toast.success("تم الحفظ بنجاح"); window.dispatchEvent(new Event("clinic-data-updated")); }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-muted-foreground font-tajawal mb-1">العنوان الرئيسي</label>
          <input type="text" value={data.main_title} onChange={e => setData({ ...data, main_title: e.target.value })}
            className="w-full border border-input rounded-lg px-3 py-2 bg-background font-tajawal text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-xs font-bold text-muted-foreground font-tajawal mb-1">نص الزر</label>
          <input type="text" value={data.cta_text} onChange={e => setData({ ...data, cta_text: e.target.value })}
            className="w-full border border-input rounded-lg px-3 py-2 bg-background font-tajawal text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-muted-foreground font-tajawal mb-1">العنوان الفرعي</label>
        <textarea value={data.subtitle} onChange={e => setData({ ...data, subtitle: e.target.value })} rows={2}
          className="w-full border border-input rounded-lg px-3 py-2 bg-background font-tajawal text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
      </div>
      <div>
        <label className="block text-xs font-bold text-muted-foreground font-tajawal mb-1">صورة الخلفية</label>
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-lg cursor-pointer hover:bg-muted/80 transition-colors text-sm font-tajawal">
            <Upload size={16} /> {uploading ? "جاري الرفع..." : "رفع صورة"}
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
          {data.hero_image && <img src={data.hero_image} alt="hero" className="w-20 h-14 object-cover rounded-lg border" />}
        </div>
      </div>
      <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-bold font-tajawal text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
        <Save size={16} /> {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
      </button>
    </div>
  );
};

export default AdminHeroSection;
