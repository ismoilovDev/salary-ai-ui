import { useState, useCallback } from 'react';
import type { SalaryData, Candidate } from '@/shared/types';

interface UseSalaryOfferOptions {
  initialData?: SalaryData | null;
  fetchSalaryData?: (candidate: Candidate) => Promise<SalaryData>;
  mockDelay?: number;
}

interface UseSalaryOfferReturn {
  salaryData: SalaryData | null;
  isLoading: boolean;
  error: Error | null;
  refresh: (candidate: Candidate) => Promise<void>;
  reset: () => void;
  clearError: () => void;
}

export function useSalaryOffer(options: UseSalaryOfferOptions = {}): UseSalaryOfferReturn {
  const { initialData = null, fetchSalaryData, mockDelay = 1500 } = options;

  const [salaryData, setSalaryData] = useState<SalaryData | null>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async (candidate: Candidate) => {
    setIsLoading(true);
    setError(null);

    try {
      if (fetchSalaryData) {
        const data = await fetchSalaryData(candidate);
        setSalaryData(data);
      } else {
        const { mockSalaryData } = await import('@/shared/mocks');
        await new Promise(resolve => setTimeout(resolve, mockDelay));
        setSalaryData(mockSalaryData);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch salary data');
      setError(error);
      console.error('Failed to fetch salary data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchSalaryData, mockDelay]);

  const reset = useCallback(() => {
    setSalaryData(initialData);
    setIsLoading(false);
    setError(null);
  }, [initialData]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    salaryData,
    isLoading,
    error,
    refresh,
    reset,
    clearError,
  };
}
