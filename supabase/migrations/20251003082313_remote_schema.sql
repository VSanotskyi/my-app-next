create table "public"."contacts" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "name" text not null,
    "phone" text,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."contacts" enable row level security;

CREATE UNIQUE INDEX contacts_pkey ON public.contacts USING btree (id);

alter table "public"."contacts" add constraint "contacts_pkey" PRIMARY KEY using index "contacts_pkey";

create policy "Allow users to delete their own contacts"
on "public"."contacts"
as permissive
for delete
to public
using ((auth.uid() = user_id));


create policy "Allow users to insert their own contacts"
on "public"."contacts"
as permissive
for insert
to public
with check ((auth.uid() = user_id));


create policy "Allow users to select their own contacts"
on "public"."contacts"
as permissive
for select
to public
using ((auth.uid() = user_id));


create policy "Allow users to update their own contacts"
on "public"."contacts"
as permissive
for update
to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));




