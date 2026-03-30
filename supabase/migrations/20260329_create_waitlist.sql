-- Create waitlist table for email capture
create table public.waitlist (
  id bigint generated always as identity primary key,
  email text not null unique,
  source text default 'website',
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.waitlist enable row level security;

-- Only allow inserts via service role (server-side API route)
create policy "Allow service role insert" on public.waitlist
  for insert to service_role
  with check (true);
