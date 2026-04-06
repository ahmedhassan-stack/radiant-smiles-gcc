import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface GalleryItem {
  id: string;
  image_url: string;
  caption: string;
  sort_order: number;
}

const AdminGallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("gallery").select("*").order("sort_order");
    if (data) setItems(data.map(g => ({ ...g, caption: g.caption || "", sort_order: g.sort_order ?? 0 })));
  };

  useEffect(() => { load(); }, []);

  const uploadImage = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `gallery/img-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("clinic-images").upload(path, file);
    if (error) { toast.error("خطأ في رفع الصورة"); setUploading(false); return; }
    const { data: urlData } = supabase.storage.from("clinic-images").getPublicUrl(path);
    const { data: inserted } = await supabase.from("gallery").insert({ image_url: urlData.publicUrl, sort_order: items.length }).select().single();
    if (inserted) setItems([...items, { ...inserted, caption: inserted.caption || "", sort_order: inserted.sort_order ?? 0 }]);
    setUploading(false);
    toast.success("تم رفع الصورة");
  };

  const remove = async (id: string) => {
    await supabase.from("gallery").delete().eq("id", id);
    setItems(items.filter(g => g.id !== id));
    toast.success("تم حذف الصورة");
  };

  const updateCaption = async (id: string, caption: string) => {
    await supabase.from("gallery").update({ caption }).eq("id", id);
    setItems(items.map(g => g.id === id ? { ...g, caption } : g));
  };

  return (
    <div className="space-y-4">
      <label className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-bold font-tajawal text-sm cursor-pointer hover:opacity-90 transition-opacity">
        <Upload size={16} /> {uploading ? "جاري الرفع..." : "رفع صورة جديدة"}
        <input type="file" accept="image/*" onChange={e => e.target.files?.[0] && uploadImage(e.target.files[0])} className="hidden" />
      </label>

      {items.length === 0 && <p className="text-center text-muted-foreground font-tajawal py-8">لا توجد صور في المعرض</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(g => (
          <div key={g.id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm group">
            <div className="aspect-square overflow-hidden">
              <img src={g.image_url} alt={g.caption} className="w-full h-full object-cover" />
            </div>
            <div className="p-3 space-y-2">
              <input type="text" value={g.caption} onChange={e => updateCaption(g.id, e.target.value)} placeholder="تعليق..."
                className="w-full border border-input rounded-lg px-2 py-1 bg-background font-tajawal text-xs focus:outline-none focus:ring-1 focus:ring-ring" />
              <button onClick={() => remove(g.id)} className="w-full flex items-center justify-center gap-1 text-xs text-destructive hover:bg-destructive/10 py-1 rounded-lg transition-colors font-tajawal">
                <Trash2 size={12} /> حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGallery;
