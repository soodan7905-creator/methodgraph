create table if not exists public.consultation_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  project_type text not null,
  challenge text not null,
  diagnosis_score integer,
  diagnosis_focus text,
  status text not null default 'new'
);

alter table public.consultation_requests enable row level security;

create policy "Anyone can submit a consultation request"
on public.consultation_requests
for insert
to anon, authenticated
with check (
  char_length(name) between 1 and 80
  and char_length(email) between 3 and 160
  and char_length(challenge) between 1 and 1500
);

-- 상담 신청 목록은 Supabase 대시보드 또는 service role을 사용하는 관리자 화면에서만 조회합니다.
