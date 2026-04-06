import doctor1 from "@/assets/doctor-1.jpg";
import doctor2 from "@/assets/doctor-2.jpg";
import doctor3 from "@/assets/doctor-3.jpg";
import { useClinicData } from "@/hooks/useClinicData";

const images = [doctor1, doctor2, doctor3];

const DoctorsSection = () => {
  const { doctors } = useClinicData();

  return (
    <section id="doctors" className="py-20 bg-secondary" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-tajawal">نخبة من الأطباء المتخصصين</h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((d, i) => (
            <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-border text-center">
              <div className="h-64 overflow-hidden">
                <img src={images[i] || images[0]} alt={d.name} loading="lazy" width={512} height={640} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-bold text-foreground font-tajawal">{d.name}</h3>
                <p className="text-muted-foreground font-tajawal">{d.specialty}</p>
                <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-bold font-tajawal">{d.exp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
