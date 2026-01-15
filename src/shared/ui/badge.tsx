import { memo, type ReactNode, type HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

type BadgeVariant = 'success' | 'primary' | 'default';
type BadgeSize = 'sm' | 'md';

interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-success-100 text-success-600 border border-success-100',
  primary: 'bg-primary-100 text-primary-500 border border-primary-100',
  default: 'bg-gray-100 text-gray-600',
};

/**
 * Badge component for displaying status, labels, or small pieces of information.
 * 
 * @example
 * ```tsx
 * <Badge variant="success" icon={<Check />}>
 *   Active
 * </Badge>
 * 
 * <Badge variant="primary" size="sm">
 *   New
 * </Badge>
 * ```
 */
export const Badge = memo(function Badge({
  children,
  variant = 'default',
  size = 'md',
  icon,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-medium rounded-full',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
});
