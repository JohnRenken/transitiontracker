// Army CSP Duration Caps by Rank Category
// Source: https://www.army.mil/article/284575

export type RankCategory = 'I' | 'II' | 'III';

export interface RankInfo {
  rank: string;
  category: RankCategory;
  maxCspDays: number;
}

// Category I: E1–E5 → up to 120 days
// Category II: E6–E7, WO1–CW3, O1–O3 → up to 90 days
// Category III: E8+, CW4+, O4+ → up to 60 days

export const RANK_DATA: RankInfo[] = [
  // Enlisted - Category I (E1-E5)
  { rank: 'E-1 (PVT)', category: 'I', maxCspDays: 120 },
  { rank: 'E-2 (PV2)', category: 'I', maxCspDays: 120 },
  { rank: 'E-3 (PFC)', category: 'I', maxCspDays: 120 },
  { rank: 'E-4 (SPC/CPL)', category: 'I', maxCspDays: 120 },
  { rank: 'E-5 (SGT)', category: 'I', maxCspDays: 120 },
  // Enlisted - Category II (E6-E7)
  { rank: 'E-6 (SSG)', category: 'II', maxCspDays: 90 },
  { rank: 'E-7 (SFC)', category: 'II', maxCspDays: 90 },
  // Enlisted - Category III (E8+)
  { rank: 'E-8 (MSG/1SG)', category: 'III', maxCspDays: 60 },
  { rank: 'E-9 (SGM/CSM)', category: 'III', maxCspDays: 60 },
  // Warrant Officers - Category II (WO1-CW3)
  { rank: 'WO1', category: 'II', maxCspDays: 90 },
  { rank: 'CW2', category: 'II', maxCspDays: 90 },
  { rank: 'CW3', category: 'II', maxCspDays: 90 },
  // Warrant Officers - Category III (CW4+)
  { rank: 'CW4', category: 'III', maxCspDays: 60 },
  { rank: 'CW5', category: 'III', maxCspDays: 60 },
  // Officers - Category II (O1-O3)
  { rank: 'O-1 (2LT)', category: 'II', maxCspDays: 90 },
  { rank: 'O-2 (1LT)', category: 'II', maxCspDays: 90 },
  { rank: 'O-3 (CPT)', category: 'II', maxCspDays: 90 },
  // Officers - Category III (O4+)
  { rank: 'O-4 (MAJ)', category: 'III', maxCspDays: 60 },
  { rank: 'O-5 (LTC)', category: 'III', maxCspDays: 60 },
  { rank: 'O-6 (COL)', category: 'III', maxCspDays: 60 },
];

export const CATEGORY_CAPS: Record<RankCategory, number> = {
  'I': 120,
  'II': 90,
  'III': 60,
};

export function getRankCapDays(rank: string): number {
  const rankInfo = RANK_DATA.find(r => r.rank === rank);
  return rankInfo?.maxCspDays ?? 120; // Default to Category I if not found
}

export function getRankCategory(rank: string): RankCategory {
  const rankInfo = RANK_DATA.find(r => r.rank === rank);
  return rankInfo?.category ?? 'I';
}

export const TRANSITION_WINDOW_DAYS = 180;
