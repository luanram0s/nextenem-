# Next Enem: Supabase RLS Policies

This document defines the security policies required for the Supabase backend to ensure data privacy and public accessibility where appropriate.

## 1. History Table (Private)
**Goal:** Only the owner can see and add their performance history.

```sql
-- Enable RLS
ALTER TABLE history ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own history
CREATE POLICY "Users can view own history" 
ON history FOR SELECT 
USING (auth.uid() = user_id);

-- Policy: Users can only insert their own history
CREATE POLICY "Users can insert own history" 
ON history FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only update their own history
CREATE POLICY "Users can update own history" 
ON history FOR UPDATE 
USING (auth.uid() = user_id);
```

## 2. Theory Library / Global Cache (Public)
**Goal:** Everyone can read the content, but only admins (or system) can write/update.

```sql
-- Enable RLS for questions_cache
ALTER TABLE questions_cache ENABLE ROW LEVEL SECURITY;

-- Policy: Public read access
CREATE POLICY "Public read access for questions" 
ON questions_cache FOR SELECT 
USING (is_public = true);

-- Policy: Admin-only write (Example using service role or specific admin check)
CREATE POLICY "Admin write access" 
ON questions_cache FOR ALL 
USING (auth.jwt() ->> 'role' = 'service_role');
```

## 3. Study Plans (Mixed)
**Goal:** Personal plans are private, shared plans are public.

```sql
-- Enable RLS for study_plans
ALTER TABLE study_plans ENABLE ROW LEVEL SECURITY;

-- Policy: Users can see their own or public plans
CREATE POLICY "View public or own plans" 
ON study_plans FOR SELECT 
USING (is_public = true OR auth.uid() = user_id);

-- Policy: Users can manage their own plans
CREATE POLICY "Manage own plans" 
ON study_plans FOR ALL 
USING (auth.uid() = user_id);
```
