'use client';

import { CardProps } from '@/types/ui';
import { cn } from '@/utils/cn';

export function Card({
  className,
  title,
  subtitle,
  children,
  footer,
  hover = false,
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg border border-gray-200 shadow-sm',
        hover && 'transition-shadow hover:shadow-md',
        className
      )}
    >
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && (
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
}
