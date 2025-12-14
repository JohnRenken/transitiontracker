import { subDays, differenceInDays, format, addDays } from 'date-fns';
import { getRankCapDays, TRANSITION_WINDOW_DAYS } from './rank-caps';

export interface ETSTimelineInputs {
  etsDate: Date;
  terminalDays: number;
  ptdyDays: number;
  requestedCspDays: number;
  rank: string;
}

export interface TimelineWarning {
  type: 'error' | 'warning';
  message: string;
}

export interface ETSTimelineResult {
  // Dates
  etsDate: Date;
  windowStartDate: Date; // ETS - 180 days
  terminalStart: Date;
  terminalEnd: Date;
  ptdyStart: Date;
  ptdyEnd: Date;
  cspStart: Date;
  cspEnd: Date;
  lastDayOfWork: Date;
  
  // Days breakdown
  totalWindowDays: number;
  terminalDays: number;
  ptdyDays: number;
  allowedCspDays: number;
  requestedCspDays: number;
  rankCapDays: number;
  remainingForTraining: number;
  daysUntilETS: number;
  daysUntilLastDay: number;
  
  // Status
  warnings: TimelineWarning[];
  isValid: boolean;
}

export function calculateETSTimeline(inputs: ETSTimelineInputs): ETSTimelineResult {
  const { etsDate, terminalDays, ptdyDays, requestedCspDays, rank } = inputs;
  const today = new Date();
  
  const warnings: TimelineWarning[] = [];
  
  // Get rank-based cap
  const rankCapDays = getRankCapDays(rank);
  
  // Calculate the 180-day window
  const windowStartDate = subDays(etsDate, TRANSITION_WINDOW_DAYS);
  
  // Step 1: Calculate remaining days for CSP/SkillBridge
  // REMAINING_FOR_TRAINING = WINDOW - (TERMINAL_DAYS + PTDY_DAYS)
  const remainingForTraining = Math.max(0, TRANSITION_WINDOW_DAYS - (terminalDays + ptdyDays));
  
  // Step 2: Calculate allowed CSP days
  // ALLOWED_TRAINING_DAYS = min(RANK_CAP_DAYS, REMAINING_FOR_TRAINING)
  const allowedCspDays = Math.min(rankCapDays, remainingForTraining, requestedCspDays);
  
  // Validate and generate warnings
  const totalRequestedDays = terminalDays + ptdyDays + requestedCspDays;
  
  if (totalRequestedDays > TRANSITION_WINDOW_DAYS) {
    warnings.push({
      type: 'error',
      message: `Your plan exceeds the 180-day window by ${totalRequestedDays - TRANSITION_WINDOW_DAYS} days. Reduce training days or leave days.`,
    });
  }
  
  if (requestedCspDays > rankCapDays) {
    warnings.push({
      type: 'warning',
      message: `Your requested CSP length (${requestedCspDays} days) exceeds rank-based program limits (${rankCapDays} days max for your rank).`,
    });
  }
  
  if (terminalDays + ptdyDays > TRANSITION_WINDOW_DAYS) {
    warnings.push({
      type: 'error',
      message: `Your terminal leave (${terminalDays} days) + PTDY (${ptdyDays} days) already exceeds the 180-day window. No room for CSP.`,
    });
  }
  
  // Step 3: Calculate dates (backwards plan)
  // Terminal ends on ETS date
  const terminalEnd = etsDate;
  const terminalStart = subDays(terminalEnd, Math.max(0, Math.ceil(terminalDays) - 1));
  
  // PTDY comes before terminal
  const ptdyEnd = ptdyDays > 0 ? subDays(terminalStart, 1) : terminalStart;
  const ptdyStart = ptdyDays > 0 ? subDays(ptdyEnd, Math.ceil(ptdyDays) - 1) : ptdyEnd;
  
  // CSP comes before PTDY
  const cspEnd = allowedCspDays > 0 ? subDays(ptdyStart, 1) : ptdyStart;
  const cspStart = allowedCspDays > 0 ? subDays(cspEnd, Math.ceil(allowedCspDays) - 1) : cspEnd;
  
  // Last day of work is before CSP/PTDY/Terminal starts
  const lastDayOfWork = allowedCspDays > 0 
    ? subDays(cspStart, 1) 
    : ptdyDays > 0 
      ? subDays(ptdyStart, 1)
      : subDays(terminalStart, 1);
  
  const daysUntilETS = differenceInDays(etsDate, today);
  const daysUntilLastDay = differenceInDays(lastDayOfWork, today);
  
  const isValid = warnings.filter(w => w.type === 'error').length === 0;
  
  return {
    etsDate,
    windowStartDate,
    terminalStart,
    terminalEnd,
    ptdyStart,
    ptdyEnd,
    cspStart,
    cspEnd,
    lastDayOfWork,
    totalWindowDays: TRANSITION_WINDOW_DAYS,
    terminalDays,
    ptdyDays,
    allowedCspDays,
    requestedCspDays,
    rankCapDays,
    remainingForTraining,
    daysUntilETS,
    daysUntilLastDay,
    warnings,
    isValid,
  };
}

export function formatDateDisplay(date: Date): string {
  return format(date, 'EEE, MMM d, yyyy');
}

export function formatDateShort(date: Date): string {
  return format(date, 'MMM d');
}
