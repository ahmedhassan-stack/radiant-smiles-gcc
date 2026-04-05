import ClinicNavbar from "@/components/ClinicNavbar";
import ClinicHero from "@/components/ClinicHero";
import StatsBar from "@/components/StatsBar";
import ClinicServices from "@/components/ClinicServices";
import DoctorsSection from "@/components/DoctorsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import PatientReviews from "@/components/PatientReviews";
import BookingSection from "@/components/BookingSection";
import ContactSection from "@/components/ContactSection";
import ClinicFooter from "@/components/ClinicFooter";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => (
  <div className="min-h-screen">
    <ClinicNavbar />
    <ClinicHero />
    <StatsBar />
    <ClinicServices />
    <BeforeAfterGallery />
    <DoctorsSection />
    <WhyChooseUs />
    <PatientReviews />
    <BookingSection />
    <ContactSection />
    <ClinicFooter />
    <WhatsAppButton />
  </div>
);

export default Index;
