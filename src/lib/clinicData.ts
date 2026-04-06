import { supabase } from "@/integrations/supabase/client";

export interface DoctorData {
  id?: string;
  name: string;
  specialty: string;
  exp: string;
}

export interface ServiceData {
  id?: string;
  icon: string;
  title: string;
  desc: string;
  duration: string;
  price: string;
}

export interface ClinicData {
  phone: string;
  address: string;
  email: string;
  workingHours: string;
  services: ServiceData[];
  doctors: DoctorData[];
}

const defaults: ClinicData = {
  phone: "+966 9200 12345",
  address: "طريق الملك فهد، حي العليا، الرياض",
  email: "info@al-ibtisama.com",
  workingHours: "السبت - الخميس: ٩ صباحاً - ٩ مساءً",
  services: [
    { icon: "🦷", title: "تبييض الأسنان", desc: "جلسة واحدة تمنحك ابتسامة مشرقة", duration: "١ ساعة", price: "٥٠٠ ريال" },
    { icon: "🔧", title: "حشو الأسنان", desc: "علاج التسوس بأحدث المواد", duration: "٤٥ دقيقة", price: "٢٠٠ ريال" },
    { icon: "🦴", title: "زراعة الأسنان", desc: "حل دائم للأسنان المفقودة", duration: "جلستان", price: "٣٠٠٠ ريال" },
    { icon: "😁", title: "تقويم الأسنان", desc: "ابتسامة مستقيمة ومثالية", duration: "متعدد الجلسات", price: "٨٠٠٠ ريال" },
    { icon: "🧼", title: "تنظيف الأسنان", desc: "تنظيف عميق واحترافي", duration: "٣٠ دقيقة", price: "١٥٠ ريال" },
    { icon: "👑", title: "تركيب التاج والجسر", desc: "استعادة وظيفة الأسنان وجماليتها", duration: "جلستان", price: "١٥٠٠ ريال" },
  ],
  doctors: [
    { name: "د. أحمد الشمري", specialty: "طب أسنان عام", exp: "+١٥ سنة خبرة" },
    { name: "د. سارة العتيبي", specialty: "تقويم الأسنان", exp: "+٨ سنوات خبرة" },
    { name: "د. محمد القحطاني", specialty: "زراعة الأسنان", exp: "+٢٠ سنة خبرة" },
  ],
};

// Fetch clinic data from Supabase, fallback to defaults
export async function fetchClinicData(): Promise<ClinicData> {
  try {
    const [infoRes, servicesRes, doctorsRes] = await Promise.all([
      supabase.from("clinic_info").select("*").single(),
      supabase.from("services").select("*").order("sort_order"),
      supabase.from("doctors").select("*").order("sort_order"),
    ]);

    const info = infoRes.data;
    const services = servicesRes.data;
    const doctors = doctorsRes.data;

    if (!info && !services && !doctors) return { ...defaults };

    return {
      phone: info?.phone ?? defaults.phone,
      address: info?.address ?? defaults.address,
      email: info?.email ?? defaults.email,
      workingHours: info?.working_hours ?? defaults.workingHours,
      services: services && services.length > 0
        ? services.map((s: any) => ({
            id: s.id,
            icon: s.icon,
            title: s.title,
            desc: s.description,
            duration: s.duration,
            price: s.price,
          }))
        : defaults.services,
      doctors: doctors && doctors.length > 0
        ? doctors.map((d: any) => ({
            id: d.id,
            name: d.name,
            specialty: d.specialty,
            exp: d.experience,
          }))
        : defaults.doctors,
    };
  } catch {
    return { ...defaults };
  }
}

// Save clinic data to Supabase
export async function saveClinicDataToSupabase(data: ClinicData) {
  // Upsert clinic_info (single row)
  await supabase.from("clinic_info").upsert({
    id: 1,
    phone: data.phone,
    address: data.address,
    email: data.email,
    working_hours: data.workingHours,
  });

  // Delete and re-insert services
  await supabase.from("services").delete().neq("id", 0);
  if (data.services.length > 0) {
    await supabase.from("services").insert(
      data.services.map((s, i) => ({
        icon: s.icon,
        title: s.title,
        description: s.desc,
        duration: s.duration,
        price: s.price,
        sort_order: i,
      }))
    );
  }

  // Delete and re-insert doctors
  await supabase.from("doctors").delete().neq("id", 0);
  if (data.doctors.length > 0) {
    await supabase.from("doctors").insert(
      data.doctors.map((d, i) => ({
        name: d.name,
        specialty: d.specialty,
        experience: d.exp,
        sort_order: i,
      }))
    );
  }

  window.dispatchEvent(new Event("clinic-data-updated"));
}

// Legacy localStorage functions for backward compatibility
const STORAGE_KEY = "clinic_admin_data";

export function getClinicData(): ClinicData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaults, ...JSON.parse(raw) };
  } catch {}
  return { ...defaults };
}

export function saveClinicData(data: ClinicData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event("clinic-data-updated"));
}
