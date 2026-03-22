-- =============================================================================
-- Education Analytics — event tracking for AI-akademin
-- =============================================================================

-- Single events table — flexible, one row per action
create table if not exists public.education_events (
  id uuid default gen_random_uuid() primary key,
  anonymous_id text not null,              -- browser-generated ID (localStorage)
  user_name text,                          -- captured from certificate flow
  event_type text not null,                -- lesson_complete, module_quiz_pass, module_quiz_fail, exam_pass, exam_fail, certificate_earned
  level_id text,                           -- niva-1, niva-2, niva-3
  course_id text,
  module_id text,
  lesson_id text,
  score integer,                           -- quiz/exam score percentage
  metadata jsonb default '{}',             -- extra: cert_id, badge_id, etc.
  created_at timestamptz default now()
);

-- Indexes for admin queries
create index if not exists idx_edu_events_type on public.education_events (event_type);
create index if not exists idx_edu_events_level on public.education_events (level_id);
create index if not exists idx_edu_events_created on public.education_events (created_at desc);
create index if not exists idx_edu_events_anon on public.education_events (anonymous_id);

-- RLS
alter table public.education_events enable row level security;

-- Anyone can INSERT (public tracking from front-end)
create policy "Anyone can insert education events"
  on public.education_events for insert
  with check (true);

-- Only admins can SELECT (via admins table check)
create policy "Admins can read education events"
  on public.education_events for select
  using (
    auth.uid() in (select user_id from public.admins)
  );

-- No UPDATE or DELETE from client
