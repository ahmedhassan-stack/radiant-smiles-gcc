import { useState } from "react";
import { LogOut, Building2, Share2, Layout, Briefcase, Users, Star, CalendarCheck, Image, BarChart3 } from "lucide-react";
import AdminClinicInfo from "./sections/AdminClinicInfo";
import AdminSocialMedia from "./sections/AdminSocialMedia";
import AdminHeroSection from "./sections/AdminHeroSection";
import AdminServices from "./sections/AdminServices";
import AdminDoctors from "./sections/AdminDoctors";
import AdminReviews from "./sections/AdminReviews";
import AdminBookings from "./sections/AdminBookings";
import AdminGallery from "./sections/AdminGallery";
import AdminStats from "./sections/AdminStats";

const tabs = [
  { id: "clinic", label: "معلومات العيادة", icon: Building2 },
  { id: "social", label: "السوشيال ميديا", icon: Share2 },
  { id: "hero", label: "الصفحة الرئيسية", icon: Layout },
  { id: "services", label: "الخدمات", icon: Briefcase },
  { id: "doctors", label: "الأطباء", icon: Users },
  { id: "reviews", label: "التقييمات", icon: Star },
  { id: "bookings", label: "الحجوزات", icon: CalendarCheck },
  { id: "gallery", label: "معرض الصور", icon: Image },
  { id: "stats", label: "الإحصائيات", icon: BarChart3 },
];

interface Props { onLogout: () => void; }

const AdminDashboard = ({ onLogout }: Props) => {
  const [active, setActive] = useState("clinic");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderSection = () => {
    switch (active) {
      case "clinic": return <AdminClinicInfo />;
      case "social": return <AdminSocialMedia />;
      case "hero": return <AdminHeroSection />;
      case "services": return <AdminServices />;
      case "doctors": return <AdminDoctors />;
      case "reviews": return <AdminReviews />;
      case "bookings": return <AdminBookings />;
      case "gallery": return <AdminGallery />;
      case "stats": return <AdminStats />;
      default: return <AdminClinicInfo />;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex" dir="rtl">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-16"} bg-card border-l border-border shadow-sm transition-all duration-300 flex flex-col fixed top-0 bottom-0 right-0 z-40`}>
        <div className="p-4 border-b border-border flex items-center gap-2">
          <span className="text-2xl">🦷</span>
          {sidebarOpen && <span className="text-lg font-extrabold text-primary font-tajawal">لوحة التحكم</span>}
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-tajawal transition-colors ${active === t.id ? "bg-primary/10 text-primary font-bold border-r-4 border-primary" : "text-foreground hover:bg-muted"}`}>
              <t.icon size={20} />
              {sidebarOpen && <span>{t.label}</span>}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <button onClick={onLogout} className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-tajawal text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
            <LogOut size={18} />
            {sidebarOpen && <span>تسجيل الخروج</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "mr-64" : "mr-16"}`}>
        <header className="bg-card border-b border-border sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-muted rounded-lg transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
            </button>
            <h1 className="text-xl font-extrabold text-foreground font-tajawal">
              {tabs.find(t => t.id === active)?.label}
            </h1>
          </div>
        </header>
        <div className="p-6">
          {renderSection()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
