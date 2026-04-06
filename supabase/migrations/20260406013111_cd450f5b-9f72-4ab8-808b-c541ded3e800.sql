
-- Timestamp update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

-- 1. Clinic Info
CREATE TABLE public.clinic_info (
  id INTEGER PRIMARY KEY DEFAULT 1,
  clinic_name TEXT DEFAULT 'عيادة الابتسامة',
  phone TEXT DEFAULT '+966 9200 12345',
  whatsapp TEXT DEFAULT '+966 9200 12345',
  email TEXT DEFAULT 'info@al-ibtisama.com',
  address TEXT DEFAULT 'طريق الملك فهد، حي العليا، الرياض',
  working_hours JSONB DEFAULT '{}',
  google_maps_link TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);
ALTER TABLE public.clinic_info ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read clinic_info" ON public.clinic_info FOR SELECT USING (true);
CREATE POLICY "Authenticated users can update clinic_info" ON public.clinic_info FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can insert clinic_info" ON public.clinic_info FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE TRIGGER update_clinic_info_updated_at BEFORE UPDATE ON public.clinic_info FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 2. Social Media
CREATE TABLE public.social_media (
  id INTEGER PRIMARY KEY DEFAULT 1,
  instagram TEXT DEFAULT '',
  twitter TEXT DEFAULT '',
  snapchat TEXT DEFAULT '',
  tiktok TEXT DEFAULT '',
  youtube TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT single_row_social CHECK (id = 1)
);
ALTER TABLE public.social_media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read social_media" ON public.social_media FOR SELECT USING (true);
CREATE POLICY "Authenticated users can update social_media" ON public.social_media FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can insert social_media" ON public.social_media FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE TRIGGER update_social_media_updated_at BEFORE UPDATE ON public.social_media FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3. Hero Section
CREATE TABLE public.hero_section (
  id INTEGER PRIMARY KEY DEFAULT 1,
  main_title TEXT DEFAULT 'ابتسامتك تبدأ من هنا',
  subtitle TEXT DEFAULT 'رعاية أسنان متكاملة بأحدث التقنيات',
  hero_image TEXT DEFAULT '',
  cta_text TEXT DEFAULT 'احجز موعد الآن',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT single_row_hero CHECK (id = 1)
);
ALTER TABLE public.hero_section ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read hero_section" ON public.hero_section FOR SELECT USING (true);
CREATE POLICY "Authenticated users can update hero_section" ON public.hero_section FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can insert hero_section" ON public.hero_section FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE TRIGGER update_hero_section_updated_at BEFORE UPDATE ON public.hero_section FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4. Services
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  icon TEXT DEFAULT '🦷',
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  price TEXT DEFAULT '',
  duration TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  is_available BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert services" ON public.services FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can update services" ON public.services FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can delete services" ON public.services FOR DELETE USING (auth.uid() IS NOT NULL);
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 5. Doctors
CREATE TABLE public.doctors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  specialty TEXT DEFAULT '',
  experience TEXT DEFAULT '',
  photo_url TEXT DEFAULT '',
  bio TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read doctors" ON public.doctors FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert doctors" ON public.doctors FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can update doctors" ON public.doctors FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can delete doctors" ON public.doctors FOR DELETE USING (auth.uid() IS NOT NULL);
CREATE TRIGGER update_doctors_updated_at BEFORE UPDATE ON public.doctors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 6. Reviews
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  stars INTEGER DEFAULT 5 CHECK (stars >= 1 AND stars <= 5),
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read approved reviews" ON public.reviews FOR SELECT USING (is_approved = true OR auth.uid() IS NOT NULL);
CREATE POLICY "Anyone can insert reviews" ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated can update reviews" ON public.reviews FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can delete reviews" ON public.reviews FOR DELETE USING (auth.uid() IS NOT NULL);

-- 7. Bookings
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_name TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  service_name TEXT DEFAULT '',
  booking_date DATE,
  booking_time TEXT DEFAULT '',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','confirmed','cancelled','completed')),
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read bookings" ON public.bookings FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Anyone can insert bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated can update bookings" ON public.bookings FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can delete bookings" ON public.bookings FOR DELETE USING (auth.uid() IS NOT NULL);
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 8. Gallery
CREATE TABLE public.gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  caption TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert gallery" ON public.gallery FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can update gallery" ON public.gallery FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can delete gallery" ON public.gallery FOR DELETE USING (auth.uid() IS NOT NULL);

-- 9. Stats Bar
CREATE TABLE public.stats_bar (
  id INTEGER PRIMARY KEY DEFAULT 1,
  clients_count TEXT DEFAULT '+5000',
  years_experience TEXT DEFAULT '+15',
  satisfaction_rate TEXT DEFAULT '98%',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT single_row_stats CHECK (id = 1)
);
ALTER TABLE public.stats_bar ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read stats_bar" ON public.stats_bar FOR SELECT USING (true);
CREATE POLICY "Authenticated can update stats_bar" ON public.stats_bar FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can insert stats_bar" ON public.stats_bar FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE TRIGGER update_stats_bar_updated_at BEFORE UPDATE ON public.stats_bar FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 10. Storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('clinic-images', 'clinic-images', true);
CREATE POLICY "Anyone can view clinic images" ON storage.objects FOR SELECT USING (bucket_id = 'clinic-images');
CREATE POLICY "Authenticated can upload clinic images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'clinic-images' AND auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can update clinic images" ON storage.objects FOR UPDATE USING (bucket_id = 'clinic-images' AND auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can delete clinic images" ON storage.objects FOR DELETE USING (bucket_id = 'clinic-images' AND auth.uid() IS NOT NULL);

-- Insert default rows for single-row tables
INSERT INTO public.clinic_info (id) VALUES (1) ON CONFLICT DO NOTHING;
INSERT INTO public.social_media (id) VALUES (1) ON CONFLICT DO NOTHING;
INSERT INTO public.hero_section (id) VALUES (1) ON CONFLICT DO NOTHING;
INSERT INTO public.stats_bar (id) VALUES (1) ON CONFLICT DO NOTHING;
