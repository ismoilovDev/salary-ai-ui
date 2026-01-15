import { memo } from 'react';
import { CircleDollarSign } from 'lucide-react';
import aiGradient from '@/assets/images/ai-gradient.png';

interface SalaryOfferHeaderProps {
  /** Job title being evaluated */
  jobTitle: string;
}

export const SalaryOfferHeader = memo(function SalaryOfferHeader({
  jobTitle,
}: SalaryOfferHeaderProps) {
  return (
    <header className="relative px-4 pt-4 pb-3 sm:px-6 sm:pt-5 sm:pb-4">
      <div
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage: `url(${aiGradient})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-hidden="true"
      />

      <div className="relative flex items-start gap-3">
        <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-linear-to-br from-primary-100 to-primary-50 flex items-center justify-center shadow-sm">
          <CircleDollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1 pr-8">
          <h2 id="salary-offer-title" className="text-base sm:text-lg font-semibold text-gray-900">
            Salary Offer
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            AI-driven compensation analysis for {jobTitle}.
          </p>
        </div>
      </div>
    </header>
  );
});
