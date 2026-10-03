create table if not exists public.consultation_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  project_type text not null,
  project_stage text,
  project_link text,
  challenge text not null,
  diagnosis_score integer,
  diagnosis_focus text,
  status text not null default 'new',
  constraint consultation_requests_score_check
    check (diagnosis_score is null or diagnosis_score between 10 and 50)
);

alter table public.consultation_requests enable row level security;

grant insert on public.consultation_requests to anon, authenticated;

drop policy if exists "Anyone can submit a consultation request" on public.consultation_requests;

create policy "Anyone can submit a consultation request"
on public.consultation_requests
for insert
to anon, authenticated
with check (
  char_length(name) between 1 and 80
  and char_length(email) between 3 and 160
  and char_length(project_type) between 1 and 120
  and (project_stage is null or char_length(project_stage) between 1 and 120)
  and (project_link is null or char_length(project_link) <= 500)
  and char_length(challenge) between 1 and 1500
  and (diagnosis_score is null or diagnosis_score between 10 and 50)
  and status = 'new'
);

-- Review requests are intended to be read from the Supabase dashboard or trusted admin tooling only.
