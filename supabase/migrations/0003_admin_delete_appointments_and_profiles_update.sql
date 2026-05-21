-- Admin: update any profile (e.g. doctor email on profiles table)
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
CREATE POLICY "Admins can update all profiles"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admin: permanently delete any appointment
DROP POLICY IF EXISTS "Admins can delete all appointments" ON public.appointments;
CREATE POLICY "Admins can delete all appointments"
  ON public.appointments FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
