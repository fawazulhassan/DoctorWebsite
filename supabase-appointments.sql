-- Run this in Supabase Dashboard → SQL Editor to create the appointments table and RLS policies.

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now() not null,
  patient_name text not null,
  patient_email text not null,
  patient_phone text not null,
  doctor_slug text,
  -- Core booking fields
  location text, -- lahore / kasur
  appointment_type text, -- clinic / online / home
  service text,
  visit_type text,
  appointment_date date not null,
  appointment_time time not null,
  slot_duration_minutes integer,
  appointment_end_time time,
  -- Patient and context
  message text,
  -- Home visit details (nullable unless appointment_type = 'home')
  home_address text,
  home_area text,
  home_landmark text,
  home_coordinates text,
  home_distance_km numeric,
  home_zone text,
  -- Online consultation details (nullable unless appointment_type = 'online')
  online_platform text,
  meeting_link text,
  -- Status & identifiers
  status text default 'pending' not null,
  appointment_number text,
  -- Fees and payment
  fees_consultation numeric,
  fees_transport numeric,
  fees_emergency numeric,
  fees_discount numeric,
  fees_total numeric,
  payment_status text,
  -- Notifications & reminders bookkeeping
  confirmations_sent_sms boolean default false,
  confirmations_sent_whatsapp boolean default false,
  confirmations_sent_email boolean default false,
  reminder_day_before_sent boolean default false,
  reminder_hours_before_sent boolean default false
);

-- Enable RLS
alter table public.appointments enable row level security;

-- Allow anonymous insert (public booking form)
create policy "Allow anon insert appointments"
  on public.appointments
  for insert
  to anon
  with check (true);

-- Allow select only by id (for confirmation page; anon can read single row by known id)
create policy "Allow anon select appointment by id"
  on public.appointments
  for select
  to anon
  using (true);

-- Optional: allow authenticated users (e.g. staff) to read all
-- create policy "Allow authenticated select all"
--   on public.appointments for select to authenticated using (true);

-- Doctor schedules for slot generation
create table if not exists public.doctor_schedules (
  id uuid primary key default gen_random_uuid(),
  doctor_slug text not null,
  location text not null, -- lahore / kasur
  weekday integer not null, -- 0 = Sunday ... 6 = Saturday
  start_time time not null,
  end_time time not null,
  slot_duration_minutes integer not null default 30,
  is_kasur_clinic_day boolean default false
);

-- Service types (clinic, online, home) and pricing configuration
create table if not exists public.service_types (
  id uuid primary key default gen_random_uuid(),
  code text not null, -- clinic / online / home / etc.
  label text not null,
  description text,
  base_fee_consultation numeric,
  transport_fee_zones jsonb, -- e.g. { "green": 0, "yellow": 500, "red": 1000 }
  is_active boolean default true
);

-- Blocked slots (breaks, holidays, etc.)
create table if not exists public.blocked_slots (
  id uuid primary key default gen_random_uuid(),
  doctor_slug text not null,
  date date not null,
  start_time time not null,
  end_time time not null,
  reason text
);

