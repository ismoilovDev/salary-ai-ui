import type { Candidate, SalaryData } from '@/shared/types';

export const mockCandidate: Candidate = {
  id: '1',
  name: 'Ivan Petrov',
  position: 'Middle Frontend Developer',
  aiFit: 94,
};

export const mockSalaryData: SalaryData = {
  recommendedSalary: 15_000_000,
  currency: 'UZS',
  isWithinBudget: true,
  marketMin: 12_000_000,
  marketMax: 17_000_000,
  marketAvg: 14_500_000,
  similarRolesCount: 120,
  keyFactors: [
    '6 years experience confirmed',
    'Strong match for React',
    'High demand in current quarter',
  ],
};
