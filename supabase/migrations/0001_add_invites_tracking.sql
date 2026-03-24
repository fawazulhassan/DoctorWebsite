alter table public.appointments
  add column if not exists invites_last_link text,
  add column if not exists invites_sent_at timestamptz;

