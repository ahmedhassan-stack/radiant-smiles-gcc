import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Save } from "lucide-react";
import { toast } from "sonner";

const AdminStats = () => {
  const [data, setData] = useState({ clients_count: "", years_experience: "", satisfaction_rate: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("stats_bar").select("*").single().then(({ data: d }) => {
      if (d) setData({ clients_count: d.clients_count || "", years_experience: d.years_experience || "", satisfaction_rate: d.satisfaction_rate || "" });
    });
  }, []);

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("stats_bar").upsert({ id: 1, ...data });
    setSaving(false);
    if (error) toast.error("خطأ في الحفظ");
    else { toast.success("تم الحفظ بنجاح"); window.dispatchEvent(new Event("clinic-data-updated")); }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-muted-foreground font-tajawal mb-1">عدد العملاء</label>
          <input type="text" value={data.clients_count} onChange={e => setData({ ...data, clients_count: e.target.value })}
            className="w-full border border-input rounded-lg px-3 py-2 bg-background font-tajawal text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="+5000" />
        </div>
        <div>
          <label className="block text-xs font-bold text-muted-foreground font-tajawal mb-1">سنوات الخبرة</label>
          <input type="text" value={data.years_experience} onChange={e => setData({ ...data, years_experience: e.target.value })}
            className="w-full border border-input rounded-lg px-3 py-2 bg-background font-tajawal text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="+15" />
        </div>
        <div>
          <label className="block text-xs font-bold text-muted-foreground font-tajawal mb-1">نسبة الرضا</label>
          <input type="text" value={data.satisfaction_rate} onChange={e => setData({ ...data, satisfaction_rate: e.target.value })}
            className="w-full border border-input rounded-lg px-3 py-2 bg-background font-tajawal text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="98%" />
        </div>
      </div>
      <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-bold font-tajawal text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
        <Save size={16} /> {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
      </button>
    </div>
  );
};

export default AdminStats;
