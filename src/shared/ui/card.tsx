import { forwardRef, memo, type ReactNode, type HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * Card container component with consistent styling.
 * Used as a wrapper for content sections and modals.
 * 
 * @example
 * ```tsx
 * <Card className="p-6">
 *   <h2>Card Title</h2>
 *   <p>Card content goes here</p>
 * </Card>
 * ```
 */
export const Card = memo(forwardRef<HTMLDivElement, CardProps>(
  function Card({ children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white rounded-2xl shadow-xl overflow-hidden',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
));
