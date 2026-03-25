-- Full-text search function for AI-hubben SearchModal
-- Combines Swedish full-text search (stemming, relevance) with prefix/ilike fallback
-- so partial words like "utbildn" still return results while typing.
-- One RPC call replaces 6 parallel ilike queries.

create or replace function search_all(search_query text, max_per_type int default 5)
returns table (
  id text,
  title text,
  description text,
  href text,
  type text,
  rank real
)
language plpgsql
security definer
as $$
declare
  tsq tsquery;
  prefix text;
begin
  prefix := trim(search_query);
  if prefix = '' then
    return;
  end if;

  -- Build tsquery: each word joined with &, last word gets :* for prefix matching
  -- "AI utbildn" → 'ai' & 'utbildn':*
  tsq := to_tsquery('swedish',
    array_to_string(
      array(
        select
          case
            when rn = cnt then word || ':*'
            else word
          end
        from (
          select word, row_number() over () as rn, count(*) over () as cnt
          from unnest(string_to_array(regexp_replace(prefix, '\s+', ' ', 'g'), ' ')) as word
        ) sub
      ),
      ' & '
    )
  );

  return query

  -- Assistants (community)
  (select
    a.id::text,
    a.name,
    coalesce(left(a.description, 100), ''),
    '/assistenter/' || a.id,
    'assistent'::text,
    ts_rank(
      setweight(to_tsvector('swedish', coalesce(a.name, '')), 'A') ||
      setweight(to_tsvector('swedish', coalesce(a.description, '')), 'B'),
      tsq
    )
  from assistants a
  where
    (to_tsvector('swedish', coalesce(a.name, '') || ' ' || coalesce(a.description, '')) @@ tsq)
    or (a.name ilike '%' || prefix || '%')
    or (a.description ilike '%' || prefix || '%')
  order by
    (to_tsvector('swedish', coalesce(a.name, '') || ' ' || coalesce(a.description, '')) @@ tsq) desc,
    ts_rank(
      setweight(to_tsvector('swedish', coalesce(a.name, '')), 'A') ||
      setweight(to_tsvector('swedish', coalesce(a.description, '')), 'B'),
      tsq
    ) desc
  limit max_per_type)

  union all

  -- Posts (published only)
  (select
    p.id::text,
    p.title,
    coalesce(left(p.excerpt, 100), ''),
    '/nyheter/' || p.slug,
    'nyhet'::text,
    ts_rank(
      setweight(to_tsvector('swedish', coalesce(p.title, '')), 'A') ||
      setweight(to_tsvector('swedish', coalesce(p.excerpt, '')), 'B') ||
      setweight(to_tsvector('swedish', coalesce(p.content, '')), 'C'),
      tsq
    )
  from posts p
  where
    p.published = true
    and (
      (to_tsvector('swedish', coalesce(p.title, '') || ' ' || coalesce(p.excerpt, '') || ' ' || coalesce(p.content, '')) @@ tsq)
      or (p.title ilike '%' || prefix || '%')
      or (p.excerpt ilike '%' || prefix || '%')
    )
  order by
    (to_tsvector('swedish', coalesce(p.title, '') || ' ' || coalesce(p.excerpt, '') || ' ' || coalesce(p.content, '')) @@ tsq) desc,
    ts_rank(
      setweight(to_tsvector('swedish', coalesce(p.title, '')), 'A') ||
      setweight(to_tsvector('swedish', coalesce(p.excerpt, '')), 'B') ||
      setweight(to_tsvector('swedish', coalesce(p.content, '')), 'C'),
      tsq
    ) desc
  limit max_per_type)

  union all

  -- FAQs
  (select
    f.id::text,
    f.question,
    coalesce(left(f.answer, 100), ''),
    '/faq'::text,
    'faq'::text,
    ts_rank(
      setweight(to_tsvector('swedish', coalesce(f.question, '')), 'A') ||
      setweight(to_tsvector('swedish', coalesce(f.answer, '')), 'B'),
      tsq
    )
  from faqs f
  where
    (to_tsvector('swedish', coalesce(f.question, '') || ' ' || coalesce(f.answer, '')) @@ tsq)
    or (f.question ilike '%' || prefix || '%')
    or (f.answer ilike '%' || prefix || '%')
  order by
    (to_tsvector('swedish', coalesce(f.question, '') || ' ' || coalesce(f.answer, '')) @@ tsq) desc,
    ts_rank(
      setweight(to_tsvector('swedish', coalesce(f.question, '')), 'A') ||
      setweight(to_tsvector('swedish', coalesce(f.answer, '')), 'B'),
      tsq
    ) desc
  limit max_per_type)

  union all

  -- Documents
  (select
    d.id::text,
    d.title,
    coalesce(left(d.description, 100), ''),
    '/dokumentation'::text,
    'dokument'::text,
    ts_rank(
      setweight(to_tsvector('swedish', coalesce(d.title, '')), 'A') ||
      setweight(to_tsvector('swedish', coalesce(d.description, '')), 'B'),
      tsq
    )
  from documents d
  where
    (to_tsvector('swedish', coalesce(d.title, '') || ' ' || coalesce(d.description, '')) @@ tsq)
    or (d.title ilike '%' || prefix || '%')
    or (d.description ilike '%' || prefix || '%')
  order by
    (to_tsvector('swedish', coalesce(d.title, '') || ' ' || coalesce(d.description, '')) @@ tsq) desc,
    ts_rank(
      setweight(to_tsvector('swedish', coalesce(d.title, '')), 'A') ||
      setweight(to_tsvector('swedish', coalesce(d.description, '')), 'B'),
      tsq
    ) desc
  limit max_per_type)

  union all

  -- Team members
  (select
    t.id::text,
    t.name,
    t.role || coalesce(' — ' || t.email, ''),
    '/om'::text,
    'team'::text,
    ts_rank(
      setweight(to_tsvector('swedish', coalesce(t.name, '')), 'A') ||
      setweight(to_tsvector('swedish', coalesce(t.role, '')), 'B'),
      tsq
    )
  from team_members t
  where
    (to_tsvector('swedish', coalesce(t.name, '') || ' ' || coalesce(t.role, '') || ' ' || coalesce(t.email, '')) @@ tsq)
    or (t.name ilike '%' || prefix || '%')
    or (t.role ilike '%' || prefix || '%')
  order by
    (to_tsvector('swedish', coalesce(t.name, '') || ' ' || coalesce(t.role, '') || ' ' || coalesce(t.email, '')) @@ tsq) desc,
    ts_rank(
      setweight(to_tsvector('swedish', coalesce(t.name, '')), 'A') ||
      setweight(to_tsvector('swedish', coalesce(t.role, '')), 'B'),
      tsq
    ) desc
  limit max_per_type)

  union all

  -- Contact entries
  (select
    c.id::text,
    coalesce(c.label, '') || ': ' || coalesce(c.title, ''),
    array_to_string(array_remove(array[c.email, c.phone, left(c.description, 60)], null), ' — '),
    '/kontakt'::text,
    'kontakt'::text,
    ts_rank(
      setweight(to_tsvector('swedish', coalesce(c.title, '')), 'A') ||
      setweight(to_tsvector('swedish', coalesce(c.label, '')), 'A') ||
      setweight(to_tsvector('swedish', coalesce(c.description, '')), 'B'),
      tsq
    )
  from contact_entries c
  where
    (to_tsvector('swedish', coalesce(c.title, '') || ' ' || coalesce(c.label, '') || ' ' || coalesce(c.description, '') || ' ' || coalesce(c.email, '')) @@ tsq)
    or (c.title ilike '%' || prefix || '%')
    or (c.label ilike '%' || prefix || '%')
    or (c.description ilike '%' || prefix || '%')
  order by
    (to_tsvector('swedish', coalesce(c.title, '') || ' ' || coalesce(c.label, '') || ' ' || coalesce(c.description, '') || ' ' || coalesce(c.email, '')) @@ tsq) desc,
    ts_rank(
      setweight(to_tsvector('swedish', coalesce(c.title, '')), 'A') ||
      setweight(to_tsvector('swedish', coalesce(c.label, '')), 'A') ||
      setweight(to_tsvector('swedish', coalesce(c.description, '')), 'B'),
      tsq
    ) desc
  limit max_per_type);

end;
$$;

-- Grant access to anon and authenticated roles
grant execute on function search_all(text, int) to anon, authenticated;
