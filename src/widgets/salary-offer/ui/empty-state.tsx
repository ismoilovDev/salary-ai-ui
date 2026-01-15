import { memo } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/shared/ui';
import emptyStateImage from '@/assets/images/empty-state.png';

interface EmptyStateProps {
  onRefresh?: () => void;
}

export const EmptyState = memo(function EmptyState({ onRefresh }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-6 sm:py-8 text-center">
      <div className="w-32 h-32 sm:w-40 sm:h-40 mb-4">
        <img
          src={emptyStateImage}
          alt=""
          className="w-full h-full object-contain"
          aria-hidden="true"
        />
      </div>

      <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
        No salary data yet
      </h3>

      <p className="text-xs sm:text-sm text-gray-500 max-w-xs mb-5 px-4">
        We couldn't generate a salary recommendation yet. Update or complete the key factors, then refresh to recalculate.
      </p>

      <Button
        variant="secondary"
        icon={<RefreshCw className="w-4 h-4" aria-hidden="true" />}
        onClick={onRefresh}
      >
        Refresh
      </Button>
    </div>
  );
});
