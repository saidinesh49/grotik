'use client';

import { useEffect, useRef } from 'react';
import { DialogProps } from '@/types/ui';
import { cn } from '@/utils/cn';

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  actions,
  className,
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className={cn(
          'bg-white rounded-lg shadow-xl',
          'w-full max-w-md transform',
          'transition-all duration-200',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-gray-500 mb-4">
              {description}
            </p>
          )}
          {children}
        </div>
        {actions && (
          <div className="px-6 py-4 bg-gray-50 rounded-b-lg border-t flex justify-end space-x-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
