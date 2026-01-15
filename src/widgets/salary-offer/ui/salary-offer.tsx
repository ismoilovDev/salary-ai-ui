import { memo, useCallback } from 'react';
import { X } from 'lucide-react';
import { Card, IconButton } from '@/shared/ui';
import { cn } from '@/shared/lib/cn';
import type { SalaryOfferProps } from '@/shared/types';
import { SalaryOfferHeader } from './salary-offer-header';
import { CandidateSelector } from './candidate-selector';
import { SalaryDisplay } from './salary-display';
import { MarketComparison } from './market-comparison';
import { KeyFactors } from './key-factors';
import { EmptyState } from './empty-state';
import { LoadingState } from './loading-state';

export const SalaryOffer = memo(function SalaryOffer({
  jobTitle,
  candidate,
  salaryData,
  isLoading = false,
  error,
  onClose,
  onRefresh,
  onCandidateChange,
}: SalaryOfferProps) {
  const hasData = !!salaryData;

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingState />;
    }

    if (error) {
      return (
        <div className="mt-5 p-4 bg-red-50 rounded-lg text-center">
          <p className="text-sm text-red-600 mb-3">
            {error.message || 'Failed to load salary data'}
          </p>
          <button
            onClick={onRefresh}
            className="text-sm text-red-700 underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      );
    }

    if (hasData) {
      return (
        <div className="mt-5 space-y-5">
          <SalaryDisplay
            salary={salaryData.recommendedSalary}
            currency={salaryData.currency}
            isWithinBudget={salaryData.isWithinBudget}
          />

          <MarketComparison
            currentSalary={salaryData.recommendedSalary}
            min={salaryData.marketMin}
            max={salaryData.marketMax}
            avg={salaryData.marketAvg}
            similarRolesCount={salaryData.similarRolesCount}
          />

          <KeyFactors factors={salaryData.keyFactors} />
        </div>
      );
    }

    return <EmptyState onRefresh={onRefresh} />;
  };

  return (
    <Card className={cn('w-full max-w-2xl relative rounded-md')}>
      <SalaryOfferHeader jobTitle={jobTitle} />

      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
        <IconButton
          onClick={handleClose}
          aria-label="Close salary offer modal"
        >
          <X className="w-5 h-5" />
        </IconButton>
      </div>

      <div className="relative px-4 pb-5 sm:px-6 sm:pb-6">
        <CandidateSelector
          candidate={candidate}
          onChange={onCandidateChange}
        />

        {renderContent()}
      </div>
    </Card>
  );
});
