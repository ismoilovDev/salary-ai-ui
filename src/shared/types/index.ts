export interface Candidate {
  id: string;
  name: string;
  position: string;
  aiFit: number;
}

export interface SalaryData {
  recommendedSalary: number;
  currency: string;
  isWithinBudget: boolean;
  marketMin: number;
  marketMax: number;
  marketAvg: number;
  similarRolesCount: number;
  keyFactors: string[];
}

export interface SalaryOfferProps {
  jobTitle: string;
  candidate: Candidate;
  salaryData?: SalaryData | null;
  isLoading?: boolean;
  error?: Error | null;
  onClose?: () => void;
  onRefresh?: () => void;
  onCandidateChange?: () => void;
}
