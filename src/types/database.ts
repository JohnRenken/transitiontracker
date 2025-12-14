export type AppRole = 'admin' | 'user';
export type CareerPath = 'sales' | 'cyber' | 'project_management' | 'skilled_trades' | 'healthcare_tech' | 'operations';
export type MilitaryBranch = 'army' | 'navy' | 'air_force' | 'marine_corps' | 'coast_guard' | 'space_force';
export type TransitionPhase = '12_to_9_months' | '9_to_6_months' | '6_to_3_months' | '90_to_30_days' | 'terminal_ptdy' | 'post_ets';

export interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  branch: MilitaryBranch | null;
  mos: string | null;
  rank: string | null;
  years_served: number | null;
  ets_date: string | null;
  terminal_days: number;
  ptdy_days: number;
  csp_days: number;
  target_path: CareerPath | null;
  target_location: string | null;
  timezone: string;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  phase: TransitionPhase;
  category: string | null;
  default_due_offset_days: number;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserTask {
  id: string;
  user_id: string;
  task_id: string | null;
  title: string;
  description: string | null;
  due_date: string | null;
  completed: boolean;
  completed_at: string | null;
  notes: string | null;
  created_at: string;
}

export interface Lesson {
  id: string;
  module: string;
  title: string;
  order_index: number;
  content_markdown: string | null;
  media_url: string | null;
  duration_minutes: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string | null;
  type: 'pdf' | 'video' | 'link' | 'template' | 'checklist' | 'script';
  url: string | null;
  tags: string[] | null;
  module: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Assessment {
  id: string;
  user_id: string;
  type: string;
  score: number | null;
  answers_json: Record<string, unknown> | null;
  created_at: string;
}

export const PHASE_LABELS: Record<TransitionPhase, string> = {
  '12_to_9_months': '12-9 Months Out',
  '9_to_6_months': '9-6 Months Out',
  '6_to_3_months': '6-3 Months Out',
  '90_to_30_days': '90-30 Days',
  'terminal_ptdy': 'Terminal/PTDY',
  'post_ets': 'Post-ETS',
};

export const BRANCH_LABELS: Record<MilitaryBranch, string> = {
  army: 'U.S. Army',
  navy: 'U.S. Navy',
  air_force: 'U.S. Air Force',
  marine_corps: 'U.S. Marine Corps',
  coast_guard: 'U.S. Coast Guard',
  space_force: 'U.S. Space Force',
};

export const PATH_LABELS: Record<CareerPath, string> = {
  sales: 'Sales',
  cyber: 'Cybersecurity',
  project_management: 'Project Management',
  skilled_trades: 'Skilled Trades',
  healthcare_tech: 'Healthcare Tech',
  operations: 'Operations',
};
