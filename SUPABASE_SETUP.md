# Supabase Setup Instructions for KRAUZ School

1. Go to your Supabase Project Dashboard.
2. Open the **SQL Editor**.
3. Copy and paste the following SQL to create the database structure:

```sql
-- Create custom types
create type user_role as enum ('student', 'admin');
create type submission_status as enum ('pending', 'approved', 'rejected');

-- Profiles table (extends default auth.users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  telegram_id text unique,
  avatar_url text,
  current_level int default 1,
  role user_role default 'student',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Modules/Levels table
create table modules (
  id serial primary key,
  level_number int unique not null,
  title text not null,
  description text,
  content text, -- Markdown content for the lesson
  is_locked boolean default true
);

-- Assignments table (One per module for simplicity, can be expanded)
create table assignments (
  id serial primary key,
  module_id int references modules(id) on delete cascade,
  description text not null,
  criteria text -- Instructions for the AI on how to grade
);

-- Submissions table
create table submissions (
  id serial primary key,
  user_id uuid references profiles(id) on delete cascade,
  assignment_id int references assignments(id) on delete cascade,
  content text not null, -- Student's answer
  status submission_status default 'pending',
  ai_feedback text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS (Row Level Security) Policies
alter table profiles enable row level security;
alter table modules enable row level security;
alter table assignments enable row level security;
alter table submissions enable row level security;

-- Policies (Simplified for prototype)
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

create policy "Modules are viewable by everyone." on modules for select using (true);
create policy "Assignments are viewable by everyone." on assignments for select using (true);

create policy "Users can view own submissions." on submissions for select using (auth.uid() = user_id);
create policy "Users can insert own submissions." on submissions for insert with check (auth.uid() = user_id);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Seed Data (Initial 25 Levels)
INSERT INTO modules (level_number, title, description, content)
SELECT 
  generate_series(1, 25) as level_number, 
  'Module ' || generate_series(1, 25) as title, 
  'Description for module ' || generate_series(1, 25) as description, 
  '# Lesson Content ' || generate_series(1, 25) as content;
  
-- Mock Assignments for modules
INSERT INTO assignments (module_id, description, criteria)
SELECT 
  id, 
  'Complete the task for ' || title, 
  'Check for understanding of ' || title 
FROM modules;

```

4. Go to **Project Settings -> API** and copy your `URL` and `anon` public key.
5. Create a file `.env.local` in your project root and add them:

```
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
GEMINI_API_KEY=your_google_gemini_key
```
