import { forwardRef, memo, type ReactNode, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

type IconButtonVariant = 'ghost' | 'default';
type IconButtonSize = 'sm' | 'md';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
}

const sizeClasses: Record<IconButtonSize, string> = {
  sm: 'w-7 h-7',
  md: 'w-9 h-9',
};

const variantClasses: Record<IconButtonVariant, string> = {
  ghost: 'text-gray-400 hover:text-gray-600 hover:bg-gray-100/80 bg-white/50',
  default: 'text-gray-500 bg-gray-100 hover:bg-gray-200',
};

/**
 * Icon-only button component for actions like close, settings, etc.
 * 
 * @example
 * ```tsx
 * <IconButton onClick={handleClose} aria-label="Close modal">
 *   <X className="w-5 h-5" />
 * </IconButton>
 * ```
 */
export const IconButton = memo(forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      children,
      variant = 'ghost',
      size = 'md',
      className,
      ...props
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg',
          'transition-colors duration-200 cursor-pointer',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
));
