import { addDays, differenceInDays, format, subDays } from 'date-fns';
import type { TransitionPhase } from '@/types/database';

export interface ETSInputs {
  etsDate: Date;
  terminalDays: number;
  ptdyDays: number;
  cspDays: number;
  desiredStartDate?: Date;
}

export interface ETSTimeline {
  etsDate: Date;
  lastDayOfWork: Date;
  terminalStart: Date;
  terminalEnd: Date;
  ptdyStart: Date;
  ptdyEnd: Date;
  cspStart: Date;
  cspEnd: Date;
  daysUntilETS: number;
  daysUntilLastDay: number;
  currentPhase: TransitionPhase;
  phaseLabel: string;
  recommendations: string[];
}

export function calculatePhase(etsDate: Date): TransitionPhase {
  const today = new Date();
  const daysUntilETS = differenceInDays(etsDate, today);

  if (daysUntilETS < 0) return 'post_ets';
  if (daysUntilETS <= 30) return 'terminal_ptdy';
  if (daysUntilETS <= 90) return '90_to_30_days';
  if (daysUntilETS <= 180) return '6_to_3_months';
  if (daysUntilETS <= 270) return '9_to_6_months';
  return '12_to_9_months';
}

export function getPhaseLabel(phase: TransitionPhase): string {
  const labels: Record<TransitionPhase, string> = {
    '12_to_9_months': '12-9 Months Out',
    '9_to_6_months': '9-6 Months Out',
    '6_to_3_months': '6-3 Months Out',
    '90_to_30_days': '90-30 Days Out',
    'terminal_ptdy': 'Terminal Leave / PTDY',
    'post_ets': 'Post-ETS (Job Hunt Mode)',
  };
  return labels[phase];
}

export function getPhaseRecommendation(phase: TransitionPhase): string {
  const recommendations: Record<TransitionPhase, string> = {
    '12_to_9_months': 'Focus on self-assessment, explore career paths, start networking. Begin researching SkillBridge opportunities.',
    '9_to_6_months': 'Complete TAP/TAPS, finalize career direction, start building resume and LinkedIn. Apply for SkillBridge if eligible.',
    '6_to_3_months': 'Apply to jobs aggressively, practice interviewing, attend job fairs. Finalize all transition paperwork.',
    '90_to_30_days': 'Final push on applications, conduct practice interviews, negotiate offers. Clear post/base.',
    'terminal_ptdy': 'Execute your plan. Continue interviews, finalize offers, prepare for first day.',
    'post_ets': 'You\'re in the game now. Follow up on applications, accept offers, prepare for your new career!',
  };
  return recommendations[phase];
}

export function calculateETSTimeline(inputs: ETSInputs): ETSTimeline {
  const { etsDate, terminalDays, ptdyDays, cspDays } = inputs;
  const today = new Date();
  
  // Terminal leave ends on ETS date
  const terminalEnd = etsDate;
  const terminalStart = subDays(terminalEnd, Math.ceil(terminalDays));
  
  // PTDY comes before terminal
  const ptdyEnd = subDays(terminalStart, 1);
  const ptdyStart = subDays(ptdyEnd, Math.ceil(ptdyDays) - 1);
  
  // CSP/SkillBridge comes before PTDY
  const cspEnd = subDays(ptdyStart, 1);
  const cspStart = subDays(cspEnd, Math.ceil(cspDays) - 1);
  
  // Last day of work is before CSP starts
  const lastDayOfWork = cspDays > 0 ? subDays(cspStart, 1) : subDays(ptdyStart, 1);
  
  const daysUntilETS = differenceInDays(etsDate, today);
  const daysUntilLastDay = differenceInDays(lastDayOfWork, today);
  const currentPhase = calculatePhase(etsDate);
  
  const recommendations = generateRecommendations(currentPhase, daysUntilETS);
  
  return {
    etsDate,
    lastDayOfWork,
    terminalStart,
    terminalEnd,
    ptdyStart,
    ptdyEnd,
    cspStart,
    cspEnd,
    daysUntilETS,
    daysUntilLastDay,
    currentPhase,
    phaseLabel: getPhaseLabel(currentPhase),
    recommendations,
  };
}

function generateRecommendations(phase: TransitionPhase, daysUntilETS: number): string[] {
  const recommendations: string[] = [];
  
  if (daysUntilETS > 270) {
    recommendations.push('Start documenting your military accomplishments now');
    recommendations.push('Research your target career path thoroughly');
    recommendations.push('Begin networking on LinkedIn');
    recommendations.push('Look into SkillBridge/CSP opportunities');
  } else if (daysUntilETS > 180) {
    recommendations.push('Complete your TAP workshop if not done');
    recommendations.push('Finalize your career direction');
    recommendations.push('Start building your resume and LinkedIn');
    recommendations.push('Apply for SkillBridge if eligible');
  } else if (daysUntilETS > 90) {
    recommendations.push('Apply to jobs daily');
    recommendations.push('Practice interviewing every week');
    recommendations.push('Attend virtual and in-person job fairs');
    recommendations.push('Finalize transition paperwork');
  } else if (daysUntilETS > 30) {
    recommendations.push('Send out 5+ applications per week');
    recommendations.push('Follow up on pending applications');
    recommendations.push('Prepare for final out-processing');
    recommendations.push('Negotiate any offers you receive');
  } else {
    recommendations.push('Focus on your top opportunities');
    recommendations.push('Finalize any pending offers');
    recommendations.push('Prepare for Day 1 at your new job');
    recommendations.push('Set up your new location logistics');
  }
  
  return recommendations;
}

export function formatDate(date: Date): string {
  return format(date, 'MMM d, yyyy');
}

export function formatDateShort(date: Date): string {
  return format(date, 'MMM d');
}
