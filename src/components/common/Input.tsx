'use client';

import { InputProps } from '@/types/ui';
import { cn } from '@/utils/cn';

export function Input({
  className,
  type = 'text',
  label,
  error,
  value,
  onChange,
  placeholder,
  required,
}: InputProps) {
  const id = `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={cn(
          'block w-full rounded-md border-gray-300 shadow-sm',
          'focus:border-blue-500 focus:ring-blue-500',
          'placeholder:text-gray-400',
          'disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200',
          error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : '',
          className
        )}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
