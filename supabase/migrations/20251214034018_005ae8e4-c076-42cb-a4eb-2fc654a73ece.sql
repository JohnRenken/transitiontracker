-- Create enum for app roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create enum for career paths
CREATE TYPE public.career_path AS ENUM ('sales', 'cyber', 'project_management', 'skilled_trades', 'healthcare_tech', 'operations');

-- Create enum for military branches
CREATE TYPE public.military_branch AS ENUM ('army', 'navy', 'air_force', 'marine_corps', 'coast_guard', 'space_force');

-- Create enum for transition phases
CREATE TYPE public.transition_phase AS ENUM ('12_to_9_months', '9_to_6_months', '6_to_3_months', '90_to_30_days', 'terminal_ptdy', 'post_ets');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  branch military_branch,
  mos TEXT,
  rank TEXT,
  years_served INTEGER,
  ets_date DATE,
  terminal_days NUMERIC(5,1) DEFAULT 0,
  ptdy_days NUMERIC(5,1) DEFAULT 0,
  csp_days NUMERIC(5,1) DEFAULT 0,
  target_path career_path,
  target_location TEXT,
  timezone TEXT DEFAULT 'America/New_York',
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Create tasks table (admin-managed task templates)
CREATE TABLE public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  phase transition_phase NOT NULL,
  category TEXT,
  default_due_offset_days INTEGER DEFAULT 0,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_tasks table (user's personalized tasks)
CREATE TABLE public.user_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lessons table (course content)
CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module TEXT NOT NULL,
  title TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  content_markdown TEXT,
  media_url TEXT,
  duration_minutes INTEGER DEFAULT 5,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_lesson_progress table
CREATE TABLE public.user_lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  quiz_score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Create resources table
CREATE TABLE public.resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('pdf', 'video', 'link', 'template', 'checklist', 'script')),
  url TEXT,
  tags TEXT[],
  module TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create assessments table
CREATE TABLE public.assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  score INTEGER,
  answers_json JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_settings table
CREATE TABLE public.admin_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value_json JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to get current user's phase
CREATE OR REPLACE FUNCTION public.get_user_phase(_ets_date DATE)
RETURNS transition_phase
LANGUAGE SQL
STABLE
AS $$
  SELECT CASE
    WHEN _ets_date IS NULL THEN 'post_ets'::transition_phase
    WHEN _ets_date <= CURRENT_DATE THEN 'post_ets'::transition_phase
    WHEN _ets_date - CURRENT_DATE <= 30 THEN 'terminal_ptdy'::transition_phase
    WHEN _ets_date - CURRENT_DATE <= 90 THEN '90_to_30_days'::transition_phase
    WHEN _ets_date - CURRENT_DATE <= 180 THEN '6_to_3_months'::transition_phase
    WHEN _ets_date - CURRENT_DATE <= 270 THEN '9_to_6_months'::transition_phase
    ELSE '12_to_9_months'::transition_phase
  END
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for tasks (public read, admin write)
CREATE POLICY "Anyone authenticated can view active tasks" ON public.tasks
  FOR SELECT USING (auth.role() = 'authenticated' AND is_active = TRUE);

CREATE POLICY "Admins can manage tasks" ON public.tasks
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_tasks
CREATE POLICY "Users can view own tasks" ON public.user_tasks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks" ON public.user_tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks" ON public.user_tasks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks" ON public.user_tasks
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for lessons (public read, admin write)
CREATE POLICY "Anyone authenticated can view active lessons" ON public.lessons
  FOR SELECT USING (auth.role() = 'authenticated' AND is_active = TRUE);

CREATE POLICY "Admins can manage lessons" ON public.lessons
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_lesson_progress
CREATE POLICY "Users can view own progress" ON public.user_lesson_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own progress" ON public.user_lesson_progress
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for resources (public read, admin write)
CREATE POLICY "Anyone authenticated can view active resources" ON public.resources
  FOR SELECT USING (auth.role() = 'authenticated' AND is_active = TRUE);

CREATE POLICY "Admins can manage resources" ON public.resources
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for assessments
CREATE POLICY "Users can view own assessments" ON public.assessments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own assessments" ON public.assessments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for admin_settings
CREATE POLICY "Admins can manage settings" ON public.admin_settings
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated users can read settings" ON public.admin_settings
  FOR SELECT USING (auth.role() = 'authenticated');

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add update triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON public.lessons
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON public.resources
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();