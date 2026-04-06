const STORAGE_KEY = "clinic_admin_data";

export interface DoctorData {
  name: string;
  specialty: string;
  exp: string;
}

export interface ServiceData {
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
