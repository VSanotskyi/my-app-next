-- 2025-10-07: Create contacts table with RLS policies

-- 1. Create table
create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  phone text,
  created_at timestamp with time zone default now()
);

-- 2. Enable RLS
alter table contacts enable row level security;

-- 3. Create a single policy for all actions
create policy "Users can manage their own contacts"
on contacts
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

comment on policy "Users can manage their own contacts" on contacts is
'Allow each user to select, insert, update and delete only their own contacts.';
