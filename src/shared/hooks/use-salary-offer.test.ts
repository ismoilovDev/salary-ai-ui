import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useSalaryOffer } from './use-salary-offer';
import type { SalaryData, Candidate } from '@/shared/types';

const mockCandidate: Candidate = {
  id: '1',
  name: 'John Doe',
  position: 'Developer',
  aiFit: 90,
};

const mockSalaryData: SalaryData = {
  recommendedSalary: 85000000,
  currency: 'UZS',
  isWithinBudget: true,
  marketMin: 60000000,
  marketMax: 120000000,
  marketAvg: 80000000,
  similarRolesCount: 150,
  keyFactors: ['Experience', 'Skills'],
};

describe('useSalaryOffer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useSalaryOffer());

    expect(result.current.salaryData).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('initializes with provided initial data', () => {
    const { result } = renderHook(() =>
      useSalaryOffer({ initialData: mockSalaryData })
    );

    expect(result.current.salaryData).toEqual(mockSalaryData);
  });

  it('sets isLoading to true when refresh is called', async () => {
    const { result } = renderHook(() => useSalaryOffer({ mockDelay: 100 }));

    act(() => {
      result.current.refresh(mockCandidate);
    });

    expect(result.current.isLoading).toBe(true);
  });

  it('loads mock data after delay when no fetchSalaryData provided', async () => {
    vi.useRealTimers();

    const { result } = renderHook(() => useSalaryOffer({ mockDelay: 50 }));

    act(() => {
      result.current.refresh(mockCandidate);
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    }, { timeout: 2000 });

    expect(result.current.salaryData).not.toBeNull();

    vi.useFakeTimers();
  });

  it('uses custom fetchSalaryData when provided', async () => {
    const customFetch = vi.fn().mockResolvedValue(mockSalaryData);

    const { result } = renderHook(() =>
      useSalaryOffer({ fetchSalaryData: customFetch })
    );

    await act(async () => {
      await result.current.refresh(mockCandidate);
    });

    expect(customFetch).toHaveBeenCalledWith(mockCandidate);
    expect(result.current.salaryData).toEqual(mockSalaryData);
  });

  it('handles fetch errors', async () => {
    const error = new Error('Network error');
    const customFetch = vi.fn().mockRejectedValue(error);

    const { result } = renderHook(() =>
      useSalaryOffer({ fetchSalaryData: customFetch })
    );

    await act(async () => {
      await result.current.refresh(mockCandidate);
    });

    expect(result.current.error).toEqual(error);
    expect(result.current.salaryData).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('resets state when reset is called', async () => {
    const customFetch = vi.fn().mockResolvedValue(mockSalaryData);

    const { result } = renderHook(() =>
      useSalaryOffer({ fetchSalaryData: customFetch })
    );

    await act(async () => {
      await result.current.refresh(mockCandidate);
    });

    expect(result.current.salaryData).toEqual(mockSalaryData);

    act(() => {
      result.current.reset();
    });

    expect(result.current.salaryData).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('clears error when clearError is called', async () => {
    const error = new Error('Network error');
    const customFetch = vi.fn().mockRejectedValue(error);

    const { result } = renderHook(() =>
      useSalaryOffer({ fetchSalaryData: customFetch })
    );

    await act(async () => {
      await result.current.refresh(mockCandidate);
    });

    expect(result.current.error).toEqual(error);

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });
});
