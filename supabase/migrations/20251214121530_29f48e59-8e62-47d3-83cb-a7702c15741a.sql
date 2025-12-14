-- Remove the overly permissive policy that allows all authenticated users to read admin settings
DROP POLICY IF EXISTS "Authenticated users can read settings" ON public.admin_settings;