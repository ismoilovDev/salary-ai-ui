import { memo } from 'react';
import { ListTodo, Check } from 'lucide-react';

interface KeyFactorsProps {
  factors: string[];
}

export const KeyFactors = memo(function KeyFactors({ factors }: KeyFactorsProps) {
  if (factors.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2 text-gray-700 mb-3">
        <ListTodo className="w-4 h-4" aria-hidden="true" />
        <span className="text-xs sm:text-sm font-medium">Key factors</span>
      </div>

      <ul className="space-y-2" aria-label="Key factors list">
        {factors.map((factor, index) => (
          <li key={index} className="flex items-start gap-2 sm:gap-2.5">
            <Check className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-xs sm:text-sm text-gray-600">{factor}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});
