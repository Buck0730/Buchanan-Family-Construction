-- ============================================================
-- Buchanan Family Construction — database schema
-- Run this in the Supabase SQL editor (or `supabase db push`).
-- ============================================================

create extension if not exists pgcrypto;

-- ---- Agent settings: a single row (id = 1) holding the toggle state -------
create table if not exists agent_settings (
  id integer primary key default 1,
  is_active boolean not null default false,        -- true = AI answers, false = forward to owner
  callback_timeframe text not null default '24 hours',
  forward_number text not null,                    -- owner's cell, E.164 e.g. +12155550100
  updated_at timestamptz default now(),
  constraint agent_settings_singleton check (id = 1)
);

-- Seed the single settings row. Replace the forward number with the owner's cell.
insert into agent_settings (id, forward_number)
values (1, '+1XXXXXXXXXX')
on conflict (id) do nothing;

-- ---- Call log: one row per AI-handled (or forwarded) call -----------------
create table if not exists calls (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  caller_number text,
  handled_by text,            -- 'agent' | 'forwarded'
  transcript text,
  summary text,
  recording_url text,
  retell_call_id text unique, -- dedupe repeated webhook deliveries
  notified boolean default false
);

create index if not exists calls_created_at_idx on calls (created_at desc);

-- ---- Leads (optional): website contact-form submissions -------------------
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text,
  email text,
  phone text,
  project_type text,
  message text,
  notified boolean default false
);

create index if not exists leads_created_at_idx on leads (created_at desc);

-- ---- Row Level Security ---------------------------------------------------
-- The app talks to these tables ONLY from server routes using the service-role
-- key, which bypasses RLS. We enable RLS and add no anon policies, so the
-- public anon key cannot read or write any of this data.
alter table agent_settings enable row level security;
alter table calls enable row level security;
alter table leads enable row level security;
