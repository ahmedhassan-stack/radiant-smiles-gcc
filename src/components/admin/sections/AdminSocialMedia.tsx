import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Save } from "lucide-react";
import { toast } from "sonner";

const AdminSocialMedia = () => {
  const [data, setData] = useState({ instagram: "", twitter: "", snapchat: "", tiktok: "", youtube: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("social_media").select("*").single().then(({ data: d }) => {
      if (d) setData({ instagram: d.instagram || "", twitter: d.twitter || "", snapchat: d.snapchat || "", tiktok: d.tiktok || "", youtube: d.youtube || "" });
    });
  }, []);

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("social_media").upsert({ id: 1, ...data });
    setSaving(false);
    if (error) toast.error("خطأ في الحفظ");
    else toast.success("تم الحفظ بنجاح");
  };

  const Field = ({ label, field }: { label: string; field: keyof typeof data }) => (
    <div>
      <label className="block text-xs font-bold text-muted-foreground font-tajawal mb-1">{label}</label>
      <input type="url" value={data[field]} onChange={e => setData({ ...data, [field]: e.target.value })} dir="ltr"
        className="w-full border border-input rounded-lg px-3 py-2 bg-background font-tajawal text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="https://..." />
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="انستقرام" field="instagram" />
        <Field label="تويتر / X" field="twitter" />
        <Field label="سناب شات" field="snapchat" />
        <Field label="تيك توك" field="tiktok" />
        <Field label="يوتيوب" field="youtube" />
      </div>
      <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-bold font-tajawal text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
        <Save size={16} /> {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
      </button>
    </div>
  );
};

export default AdminSocialMedia;
