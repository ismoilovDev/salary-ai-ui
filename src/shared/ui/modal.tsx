import { type ReactNode, useEffect, useId } from 'react';
import { useFocusTrap } from '@/shared/hooks';
import { cn } from '@/shared/lib/cn';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  ariaLabel?: string;
  className?: string;
}

/**
 * Accessible modal component with focus trap and keyboard navigation.
 * 
 * Features:
 * - Focus trap (Tab cycles through focusable elements)
 * - Escape key closes modal
 * - Click outside closes modal
 * - Body scroll lock when open
 * - Proper ARIA attributes
 * - Smooth animations
 * 
 * @example
 * ```tsx
 * <Modal isOpen={isOpen} onClose={handleClose} ariaLabel="Settings dialog">
 *   <h2>Settings</h2>
 *   <p>Modal content here</p>
 * </Modal>
 * ```
 */
export function Modal({
  children,
  isOpen,
  onClose,
  ariaLabel,
  className,
}: ModalProps) {
  const modalId = useId();
  const focusTrapRef = useFocusTrap<HTMLDivElement>({
    isActive: isOpen,
    onEscape: onClose,
    restoreFocus: true,
  });

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-gray-500/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={focusTrapRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabel ? undefined : `${modalId}-title`}
        className={cn(
          'relative z-10 w-full max-w-2xl',
          'animate-in fade-in zoom-in-95 duration-200',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
