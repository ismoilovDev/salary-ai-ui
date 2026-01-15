import { memo } from 'react';
import { CircleDollarSign, Check } from 'lucide-react';
import { Badge } from '@/shared/ui';
import { formatCurrency } from '@/shared/lib/format';

interface SalaryDisplayProps {
  salary: number;
  currency: string;
  isWithinBudget: boolean;
}

export const SalaryDisplay = memo(function SalaryDisplay({
  salary,
  currency,
  isWithinBudget,
}: SalaryDisplayProps) {
  return (
    <div>
      <div className="flex items-center gap-2 text-gray-700 mb-2">
        <CircleDollarSign className="w-4 h-4" aria-hidden="true" />
        <span className="text-xs sm:text-sm font-medium">Recommended Base Salary</span>
      </div>

      <div
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-400 tracking-tight"
        aria-label={`Recommended salary: ${formatCurrency(salary, currency)}`}
      >
        {formatCurrency(salary, currency)}
      </div>

      {isWithinBudget && (
        <div className="mt-2">
          <Badge
            variant="success"
            size="sm"
            icon={<Check className="w-3 h-3" aria-hidden="true" />}
          >
            Within Budget
          </Badge>
        </div>
      )}
    </div>
  );
});
