-- ============================================================
-- Doctor slot management: doctors can edit their own availability
-- Run after supabase-doctor-slots.sql and supabase-doctor-role.sql
-- ============================================================

-- Doctors can delete only their own rows in doctor_slots
CREATE POLICY "Doctors can delete own doctor slots"
  ON public.doctor_slots FOR DELETE
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'doctor')
    AND doctor_slug = (
      SELECT doctor_slug FROM public.profiles WHERE id = auth.uid()
    )
  );

-- Doctors can insert only rows for their own doctor_slug
CREATE POLICY "Doctors can insert own doctor slots"
  ON public.doctor_slots FOR INSERT
  TO authenticated
  WITH CHECK (
    public.has_role(auth.uid(), 'doctor')
    AND doctor_slug = (
      SELECT doctor_slug FROM public.profiles WHERE id = auth.uid()
    )
  );
