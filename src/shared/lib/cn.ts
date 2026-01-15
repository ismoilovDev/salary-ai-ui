import { clsx, type ClassValue } from 'clsx';

/**
 * Utility function for constructing className strings conditionally.
 * Combines clsx for conditional classes.
 * 
 * @example
 * ```tsx
 * cn('base-class', isActive && 'active', className)
 * cn('px-4 py-2', { 'bg-blue-500': isPrimary, 'bg-gray-500': !isPrimary })
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
