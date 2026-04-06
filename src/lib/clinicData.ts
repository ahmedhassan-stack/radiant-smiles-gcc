import { supabase } from "@/integrations/supabase/client";

export interface ServiceData {
  id?: string;
  icon: string;
  title: string;
  desc: string;
  duration: string;
  price: string;
  image_url?: string;
  is_available?: boolean;
}

export interface DoctorData {
  id?: string;
  name: string;
  specialty: string;
  exp: string;
  photo_url?: string;
  bio?: string;
}

export interface ClinicData {
  clinic_name: string;
  phone: string;
  whatsapp: string;
  address: string;
  email: string;
  workingHours: string;
  google_maps_link: string;
  services: ServiceData[];
  doctors: DoctorData[];
}

const defaults: ClinicData = {
  clinic_name: "عيادة الابتسامة",
  phone: "+966 9200 12345",
  whatsapp: "+966 9200 12345",
  address: "طريق الملك فهد، حي العليا، الرياض",
  email: "info@al-ibtisama.com",
  workingHours: "السبت - الخميس: ٩ صباحاً - ٩ مساءً",
  google_maps_link: "",
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

export function getClinicData(): ClinicData {
  return { ...defaults };
}

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

    const wh = info?.working_hours;
    let workingHoursStr = defaults.workingHours;
    if (typeof wh === "string") workingHoursStr = wh;
    else if (wh && typeof wh === "object") workingHoursStr = JSON.stringify(wh);

    return {
      clinic_name: info?.clinic_name ?? defaults.clinic_name,
      phone: info?.phone ?? defaults.phone,
      whatsapp: info?.whatsapp ?? defaults.whatsapp,
      address: info?.address ?? defaults.address,
      email: info?.email ?? defaults.email,
      workingHours: workingHoursStr,
      google_maps_link: info?.google_maps_link ?? "",
      services: services && services.length > 0
        ? services.map((s: any) => ({
            id: s.id,
            icon: s.icon ?? "🦷",
            title: s.title,
            desc: s.description ?? "",
            duration: s.duration ?? "",
            price: s.price ?? "",
            image_url: s.image_url ?? "",
            is_available: s.is_available ?? true,
          }))
        : defaults.services,
      doctors: doctors && doctors.length > 0
        ? doctors.map((d: any) => ({
            id: d.id,
            name: d.name,
            specialty: d.specialty ?? "",
            exp: d.experience ?? "",
            photo_url: d.photo_url ?? "",
            bio: d.bio ?? "",
          }))
        : defaults.doctors,
    };
  } catch {
    return { ...defaults };
  }
}
