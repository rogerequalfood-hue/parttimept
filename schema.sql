-- parttimept schema
create table if not exists public.jobs (
  id text primary key,
  title text not null,
  company text,
  location text,
  area text not null check (area in ('all','lisboa','margem_sul','montijo','alcochete','samouco') or area is not null),
  employment_type text not null default 'part-time',
  work_model text not null default 'onsite',
  published_at timestamptz not null,
  url text not null,
  source text,
  description text,
  created_at timestamptz not null default now()
);

create index if not exists jobs_published_at_idx on public.jobs (published_at desc);
create index if not exists jobs_employment_type_idx on public.jobs (employment_type);
create index if not exists jobs_area_idx on public.jobs (area);

-- Enable Row Level Security
alter table public.jobs enable row level security;

-- Public read-only policy (safe for a simple directory)
drop policy if exists "Public read access" on public.jobs;
create policy "Public read access"
on public.jobs for select
to anon
using (true);
