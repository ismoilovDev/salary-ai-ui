import { forwardRef, memo, type ReactNode, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  isLoading?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 disabled:bg-primary-300',
  secondary: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 active:bg-gray-100 shadow-sm disabled:bg-gray-50 disabled:text-gray-400',
  ghost: 'bg-transparent text-gray-500 hover:bg-gray-100 active:bg-gray-200 disabled:text-gray-300',
};

/**
 * Primary button component with multiple variants and sizes.
 * Supports icons, loading states, and all native button attributes.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md" icon={<Save />}>
 *   Save Changes
 * </Button>
 * 
 * <Button variant="secondary" isLoading>
 *   Loading...
 * </Button>
 * ```
 */
export const Button = memo(forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      variant = 'secondary',
      size = 'md',
      icon,
      isLoading = false,
      className,
      disabled,
      ...props
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium rounded-lg',
          'transition-all duration-200 cursor-pointer',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : icon ? (
          <span className="shrink-0">{icon}</span>
        ) : null}
        {children}
      </button>
    );
  }
));
