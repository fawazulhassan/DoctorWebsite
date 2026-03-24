-- Basic payments table aligned with MASTER.md payment flow (simplified).

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now() not null,
  appointment_id uuid references public.appointments(id) on delete cascade,
  provider text, -- jazzcash / easypaisa / bank_transfer / cash
  amount numeric not null,
  status text not null, -- pending / success / failed / cancelled
  transaction_ref text,
  raw_payload jsonb
);

