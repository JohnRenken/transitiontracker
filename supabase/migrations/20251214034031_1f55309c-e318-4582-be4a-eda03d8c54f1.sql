-- Fix search_path for get_user_phase function
CREATE OR REPLACE FUNCTION public.get_user_phase(_ets_date DATE)
RETURNS transition_phase
LANGUAGE SQL
STABLE
SECURITY INVOKER
SET search_path = public
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