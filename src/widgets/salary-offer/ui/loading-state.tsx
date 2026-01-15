import { memo } from 'react';

export const LoadingState = memo(function LoadingState() {
  return (
    <div
      className="mt-5 space-y-5 animate-pulse"
      role="status"
      aria-label="Loading salary data"
    >
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 bg-gray-200 rounded" />
          <div className="h-4 w-40 bg-gray-200 rounded" />
        </div>
        <div className="h-10 w-48 bg-gray-200 rounded" />
        <div className="mt-2 h-6 w-28 bg-gray-100 rounded-full" />
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 bg-gray-200 rounded" />
          <div className="h-4 w-36 bg-gray-200 rounded" />
        </div>
        <div className="relative pt-8 pb-2">
          <div className="h-2 w-full bg-gray-200 rounded-full" />
          <div className="flex justify-between mt-2">
            <div className="h-3 w-12 bg-gray-100 rounded" />
            <div className="h-3 w-8 bg-gray-100 rounded" />
            <div className="h-3 w-12 bg-gray-100 rounded" />
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <div className="w-3.5 h-3.5 bg-gray-100 rounded" />
          <div className="h-3 w-48 bg-gray-100 rounded" />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 bg-gray-200 rounded" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="w-4 h-4 bg-gray-200 rounded mt-0.5" />
              <div
                className="h-4 flex-1 bg-gray-100 rounded"
                style={{ maxWidth: `${70 + i * 10}%` }}
              />
            </div>
          ))}
        </div>
      </div>

      <span className="sr-only">Loading salary recommendation...</span>
    </div>
  );
});
