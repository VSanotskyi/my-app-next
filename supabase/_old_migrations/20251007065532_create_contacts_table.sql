-- 2025-10-07: Create contacts table

create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  created_at timestamp with time zone default now()
);
