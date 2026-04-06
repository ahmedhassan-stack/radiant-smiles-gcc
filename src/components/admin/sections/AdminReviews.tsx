import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, Check, X, Star } from "lucide-react";
import { toast } from "sonner";

interface Review {
  id: string;
  name: string;
  text: string;
  stars: number;
  is_approved: boolean;
  created_at: string;
}

const AdminReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const load = async () => {
    const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
    if (data) setReviews(data.map(r => ({ ...r, stars: r.stars ?? 5, is_approved: r.is_approved ?? false })));
  };

  useEffect(() => { load(); }, []);

  const toggleApprove = async (id: string, approved: boolean) => {
    await supabase.from("reviews").update({ is_approved: approved }).eq("id", id);
    setReviews(reviews.map(r => r.id === id ? { ...r, is_approved: approved } : r));
    toast.success(approved ? "تم اعتماد التقييم" : "تم إخفاء التقييم");
  };

  const remove = async (id: string) => {
    await supabase.from("reviews").delete().eq("id", id);
    setReviews(reviews.filter(r => r.id !== id));
    toast.success("تم حذف التقييم");
  };

  return (
    <div className="space-y-4">
      {reviews.length === 0 && <p className="text-center text-muted-foreground font-tajawal py-8">لا توجد تقييمات بعد</p>}
      {reviews.map(r => (
        <div key={r.id} className={`bg-card border rounded-2xl p-5 shadow-sm ${r.is_approved ? "border-green-200" : "border-border"}`}>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold font-tajawal text-foreground">{r.name}</span>
                <div className="flex gap-0.5">{[1,2,3,4,5].map(n => <Star key={n} size={14} className={n <= r.stars ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"} />)}</div>
                {r.is_approved ? <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-tajawal">معتمد</span> : <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-tajawal">بانتظار المراجعة</span>}
              </div>
              <p className="text-sm text-muted-foreground font-tajawal">{r.text}</p>
              <p className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString("ar-SA")}</p>
            </div>
            <div className="flex items-center gap-1">
              {!r.is_approved && (
                <button onClick={() => toggleApprove(r.id, true)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="اعتماد">
                  <Check size={16} />
                </button>
              )}
              {r.is_approved && (
                <button onClick={() => toggleApprove(r.id, false)} className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors" title="إخفاء">
                  <X size={16} />
                </button>
              )}
              <button onClick={() => remove(r.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors" title="حذف">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminReviews;
