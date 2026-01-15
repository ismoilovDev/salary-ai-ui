import { memo, forwardRef } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { Badge } from '@/shared/ui';
import { cn } from '@/shared/lib/cn';
import type { Candidate } from '@/shared/types';

interface CandidateSelectorProps {
  candidate: Candidate;
  onChange?: () => void;
  className?: string;
}

export const CandidateSelector = memo(forwardRef<HTMLButtonElement, CandidateSelectorProps>(
  function CandidateSelector({ candidate, onChange, className }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onChange}
        aria-label={`Selected candidate: ${candidate.name}. Click to change.`}
        className={cn(
          'w-full flex items-center justify-between gap-2 sm:gap-3 p-2.5 sm:p-3',
          'bg-white border border-gray-200 rounded-xl',
          'hover:border-gray-300 transition-colors cursor-pointer',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          className
        )}
      >
        <div className="min-w-0 flex-1 text-left">
          <div className="font-medium text-sm sm:text-base text-gray-900 truncate">
            {candidate.name}
          </div>
          <div className="text-xs sm:text-sm text-gray-500 truncate">
            {candidate.position}
          </div>
        </div>

        <Badge
          variant="success"
          size="sm"
          icon={<Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" aria-hidden="true" />}
        >
          <span className="hidden xs:inline">AI Fit:</span> {candidate.aiFit}%
        </Badge>

        <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" aria-hidden="true" />
      </button>
    );
  }
));
