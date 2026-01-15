import { memo, useMemo } from 'react';
import { Store, Info } from 'lucide-react';
import { formatCompactCurrency } from '@/shared/lib/format';
import { cn } from '@/shared/lib/cn';

interface MarketComparisonProps {
  currentSalary: number;
  min: number;
  max: number;
  avg: number;
  similarRolesCount: number;
}

export const MarketComparison = memo(function MarketComparison({
  currentSalary,
  min,
  max,
  avg,
  similarRolesCount,
}: MarketComparisonProps) {
  const { currentPosition, avgPosition } = useMemo(() => {
    const range = max - min;
    if (range === 0) return { currentPosition: 50, avgPosition: 50 };

    const current = Math.max(0, Math.min(100, ((currentSalary - min) / range) * 100));
    const average = Math.max(0, Math.min(100, ((avg - min) / range) * 100));

    return { currentPosition: current, avgPosition: average };
  }, [currentSalary, min, max, avg]);

  const isAboveAvg = currentSalary >= avg;

  return (
    <div>
      <div className="flex items-center gap-2 text-gray-700 mb-3">
        <Store className="w-4 h-4" />
        <span className="text-xs sm:text-sm font-medium">Market Comparison</span>
      </div>

      <div className="relative pt-8 pb-2">
        <div
          className="absolute -top-0 transform -translate-x-1/2"
          style={{ left: `${currentPosition}%` }}
        >
          <div
            className={cn(
              'text-white text-[10px] sm:text-xs font-medium px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md whitespace-nowrap',
              isAboveAvg ? 'bg-primary-400' : 'bg-gray-500'
            )}
          >
            {formatCompactCurrency(currentSalary)} UZS
          </div>
        </div>

        <div className="relative h-2 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-gray-100 via-gray-200 to-primary-100" />
          <div
            className="absolute inset-y-0 left-0 bg-gray-200 rounded-l-full"
            style={{ width: `${avgPosition}%` }}
          />
          <div
            className="absolute inset-y-0 bg-primary-100"
            style={{ left: `${avgPosition}%`, right: 0 }}
          />
        </div>

        <div
          className="absolute top-7 transform -translate-x-1/2"
          style={{ left: `${currentPosition}%` }}
        >
          <div
            className={cn(
              'w-3 h-3 rounded-full border-2 border-white shadow-md',
              isAboveAvg ? 'bg-primary-400' : 'bg-gray-500'
            )}
          />
        </div>

        <div className="flex justify-between mt-2 text-[10px] sm:text-xs text-gray-500">
          <span>{formatCompactCurrency(min)}</span>
          <span
            className="absolute transform -translate-x-1/2"
            style={{ left: `${avgPosition}%` }}
          >
            AVG ({formatCompactCurrency(avg)})
          </span>
          <span>{formatCompactCurrency(max)}</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 mt-2 text-[10px] sm:text-xs text-gray-400">
        <Info className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
        <span>Based on {similarRolesCount.toLocaleString()} similar roles in your region</span>
      </div>
    </div>
  );
});
