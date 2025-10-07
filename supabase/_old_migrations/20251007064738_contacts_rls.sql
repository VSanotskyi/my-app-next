-- 2025-10-07: Enable RLS and add policies for contacts table

-- Enable Row Level Security
alter table contacts enable row level security;

-- Optional: disable existing policies if you want to reset them
-- drop policy if exists "Users can manage their own contacts" on contacts;

-- Create a single universal policy for all actions
create policy "Users can manage their own contacts"
on contacts
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Optionally comment for documentation
comment on policy "Users can manage their own contacts" on contacts is
'Allow each user to select, insert, update and delete only their own contacts.';
