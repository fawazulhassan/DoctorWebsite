-- ============================================================
-- Doctor Slots — Weekly recurring schedule
-- Run in Supabase Dashboard → SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS public.doctor_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_slug TEXT NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  slot_duration_minutes INTEGER NOT NULL DEFAULT 30,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE (doctor_slug, day_of_week)
);

ALTER TABLE public.doctor_slots ENABLE ROW LEVEL SECURITY;

-- Anyone (anon + authenticated) can read active slots (needed for booking form)
CREATE POLICY "Anyone can read active doctor slots"
  ON public.doctor_slots FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Admins can do everything (insert, update, delete)
CREATE POLICY "Admins can manage doctor slots"
  ON public.doctor_slots FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
