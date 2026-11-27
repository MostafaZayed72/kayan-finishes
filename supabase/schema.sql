-- Kayan Construction & Finishes - Supabase Schema
-- Run this SQL in your Supabase SQL Editor

create table if not exists kayan_services (
  slug text primary key,
  title_ar text not null,
  title_en text not null,
  short_desc_ar text not null default '',
  short_desc_en text not null default '',
  full_desc_ar text not null default '',
  full_desc_en text not null default '',
  image text not null default '',
  duration_ar text not null default '',
  duration_en text not null default '',
  warranty_ar text not null default '',
  warranty_en text not null default '',
  deliverables_ar jsonb not null default '[]'::jsonb,
  deliverables_en jsonb not null default '[]'::jsonb,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists kayan_projects (
  slug text primary key,
  category text not null default 'apartment',
  category_label_ar text not null default '',
  category_label_en text not null default '',
  title_ar text not null,
  title_en text not null,
  location_ar text not null default '',
  location_en text not null default '',
  location_slug text not null default 'new-cairo',
  area int not null default 150,
  duration_days int not null default 60,
  package_name_ar text not null default '',
  package_name_en text not null default '',
  style_ar text not null default '',
  style_en text not null default '',
  cover_image text not null default '',
  before_image text not null default '',
  after_image text not null default '',
  gallery jsonb not null default '[]'::jsonb,
  summary_ar text not null default '',
  summary_en text not null default '',
  highlights_ar jsonb not null default '[]'::jsonb,
  highlights_en jsonb not null default '[]'::jsonb,
  coords_x int not null default 50,
  coords_y int not null default 50,
  created_at timestamptz not null default now()
);

create table if not exists kayan_supervision_tiers (
  id text primary key,
  name_ar text not null,
  name_en text not null,
  badge_ar text default '',
  badge_en text default '',
  percentage numeric not null default 15,
  price_per_sqm int not null default 8500,
  popular boolean not null default false,
  desc_ar text not null default '',
  desc_en text not null default '',
  specs_ar jsonb not null default '[]'::jsonb,
  specs_en jsonb not null default '[]'::jsonb,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists kayan_blog_posts (
  slug text primary key,
  category_ar text not null default '',
  category_en text not null default '',
  title_ar text not null,
  title_en text not null,
  excerpt_ar text not null default '',
  excerpt_en text not null default '',
  cover_image text not null default '',
  read_time int not null default 5,
  published_date text not null default '2026-11-24',
  author_ar text not null default '',
  author_en text not null default '',
  sections jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists kayan_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  unit_type text default '',
  area_sqm int default 0,
  location text default '',
  estimated_cost text default '',
  notes text default '',
  source text default 'website',
  status text not null default 'new',
  created_at timestamptz not null default now()
);

-- Allow full server-side access (admin writes are protected by Nuxt server auth)
alter table kayan_services disable row level security;
alter table kayan_projects disable row level security;
alter table kayan_supervision_tiers disable row level security;
alter table kayan_blog_posts disable row level security;
alter table kayan_leads disable row level security;
