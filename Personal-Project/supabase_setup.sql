-- ============================================================
-- NEU Library Visitor Log — Supabase Database Setup
-- Run this in your Supabase SQL Editor
-- ============================================================

-- ── TABLE: users ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.users (
  id          uuid PRIMARY KEY,               -- matches auth.users.id
  email       text NOT NULL UNIQUE,
  student_id  text NOT NULL,
  full_name   text NOT NULL,
  department  text NOT NULL,
  role        text NOT NULL CHECK (role IN ('Student', 'Staff')),
  created_at  timestamptz DEFAULT now()
);

-- ── TABLE: logs ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.logs (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid REFERENCES public.users(id) ON DELETE CASCADE,
  full_name   text NOT NULL,
  student_id  text NOT NULL,
  role        text NOT NULL,
  timestamp   timestamptz DEFAULT now()
);

-- ── INDEXES ──────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS logs_user_id_idx  ON public.logs(user_id);
CREATE INDEX IF NOT EXISTS logs_timestamp_idx ON public.logs(timestamp DESC);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on both tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.logs  ENABLE ROW LEVEL SECURITY;

-- ── POLICIES: users ──────────────────────────────────────────

-- Users can read their own row
CREATE POLICY "users: select own"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

-- Users can insert their own row (registration)
CREATE POLICY "users: insert own"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Admins can read all users
CREATE POLICY "users: admin read all"
  ON public.users FOR SELECT
  USING (
    auth.jwt() ->> 'email' IN (
      'jcesperanza@neu.edu.ph',
      'zirkeins.layupan@neu.edu.ph'
    )
  );

-- ── POLICIES: logs ────────────────────────────────────────────

-- Users can insert their own logs
CREATE POLICY "logs: insert own"
  ON public.logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can read their own logs
CREATE POLICY "logs: select own"
  ON public.logs FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can read ALL logs
CREATE POLICY "logs: admin read all"
  ON public.logs FOR SELECT
  USING (
    auth.jwt() ->> 'email' IN (
      'jcesperanza@neu.edu.ph',
      'zirkeins.layupan@neu.edu.ph'
    )
  );

-- ============================================================
-- DONE! Tables and policies are ready.
-- ============================================================
