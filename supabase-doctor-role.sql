-- ============================================================
-- Doctor role and doctor dashboard access
-- Run after supabase-auth-profiles.sql and supabase-appointments.sql
-- ============================================================

-- 1. Add 'doctor' to app_role enum
DO $$ BEGIN
  ALTER TYPE app_role ADD VALUE 'doctor';
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- 2. Add doctor_slug to profiles (links auth user to doctor: rizwan-shafiq | faiza-malik)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS doctor_slug text;

COMMENT ON COLUMN public.profiles.doctor_slug IS 'For users with doctor role: rizwan-shafiq or faiza-malik';

-- 3. Doctors can read their own profile (already covered by "Users can read own profile")
-- Doctors need to read their doctor_slug; existing policy allows it.

-- 4. Doctors can read appointments where doctor_slug matches their profile
CREATE POLICY "Doctors can read own appointments"
  ON public.appointments FOR SELECT
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'doctor')
    AND doctor_slug = (
      SELECT doctor_slug FROM public.profiles WHERE id = auth.uid()
    )
  );

-- 5. Doctors can update their own appointments (e.g. meeting_link, status)
CREATE POLICY "Doctors can update own appointments"
  ON public.appointments FOR UPDATE
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'doctor')
    AND doctor_slug = (
      SELECT doctor_slug FROM public.profiles WHERE id = auth.uid()
    )
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'doctor')
    AND doctor_slug = (
      SELECT doctor_slug FROM public.profiles WHERE id = auth.uid()
    )
  );

-- ============================================================
-- To assign a user as doctor (run after user exists):
-- 1. Add doctor role:
--    INSERT INTO public.user_roles (user_id, role)
--    VALUES ('<user-uuid>', 'doctor');
-- 2. Set doctor_slug on their profile:
--    UPDATE public.profiles
--    SET doctor_slug = 'rizwan-shafiq'
--    WHERE id = '<user-uuid>';
--    (Use 'faiza-malik' for Dr. Faiza.)
-- ============================================================
