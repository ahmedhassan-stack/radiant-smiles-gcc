import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";

interface Booking {
  id: string;
  patient_name: string;
  patient_phone: string;
  service_name: string;
  booking_date: string | null;
  booking_time: string;
  status: string;
  notes: string;
  created_at: string;
}

const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: "بانتظار التأكيد", color: "bg-yellow-100 text-yellow-700" },
  confirmed: { label: "مؤكد", color: "bg-green-100 text-green-700" },
  cancelled: { label: "ملغي", color: "bg-red-100 text-red-700" },
  completed: { label: "مكتمل", color: "bg-blue-100 text-blue-700" },
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const load = async () => {
    const { data } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
    if (data) setBookings(data.map(b => ({ ...b, service_name: b.service_name || "", booking_time: b.booking_time || "", notes: b.notes || "", status: b.status || "pending" })));
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("bookings").update({ status }).eq("id", id);
    setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
    toast.success("تم تحديث الحالة");
  };

  const sendWhatsApp = (phone: string, name: string) => {
    const msg = encodeURIComponent(`مرحباً ${name}، نود تأكيد موعدكم في عيادة الابتسامة.`);
    window.open(`https://wa.me/${phone.replace(/\D/g, "")}?text=${msg}`, "_blank");
  };

  const filtered = bookings.filter(b => {
    if (filter && b.status !== filter) return false;
    if (dateFilter && b.booking_date !== dateFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <select value={filter} onChange={e => setFilter(e.target.value)} className="border border-input rounded-lg px-3 py-2 bg-background font-tajawal text-sm">
          <option value="">كل الحالات</option>
          <option value="pending">بانتظار التأكيد</option>
          <option value="confirmed">مؤكد</option>
          <option value="cancelled">ملغي</option>
          <option value="completed">مكتمل</option>
        </select>
        <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="border border-input rounded-lg px-3 py-2 bg-background font-tajawal text-sm" />
      </div>

      {filtered.length === 0 && <p className="text-center text-muted-foreground font-tajawal py-8">لا توجد حجوزات</p>}

      <div className="overflow-x-auto">
        <table className="w-full text-sm font-tajawal">
          <thead>
            <tr className="border-b border-border">
              <th className="text-right py-3 px-2 font-bold">المريض</th>
              <th className="text-right py-3 px-2 font-bold">الهاتف</th>
              <th className="text-right py-3 px-2 font-bold">الخدمة</th>
              <th className="text-right py-3 px-2 font-bold">التاريخ</th>
              <th className="text-right py-3 px-2 font-bold">الحالة</th>
              <th className="text-right py-3 px-2 font-bold">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.id} className="border-b border-border/50 hover:bg-muted/30">
                <td className="py-3 px-2">{b.patient_name}</td>
                <td className="py-3 px-2" dir="ltr">{b.patient_phone}</td>
                <td className="py-3 px-2">{b.service_name}</td>
                <td className="py-3 px-2">{b.booking_date || "-"} {b.booking_time}</td>
                <td className="py-3 px-2">
                  <select value={b.status} onChange={e => updateStatus(b.id, e.target.value)}
                    className={`px-2 py-1 rounded-full text-xs font-bold ${statusMap[b.status]?.color || ""} border-0 cursor-pointer`}>
                    <option value="pending">بانتظار التأكيد</option>
                    <option value="confirmed">مؤكد</option>
                    <option value="cancelled">ملغي</option>
                    <option value="completed">مكتمل</option>
                  </select>
                </td>
                <td className="py-3 px-2">
                  <button onClick={() => sendWhatsApp(b.patient_phone, b.patient_name)} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="إرسال واتساب">
                    <MessageCircle size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookings;
