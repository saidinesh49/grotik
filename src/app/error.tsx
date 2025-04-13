'use client';

import { Button } from '@/components/common';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className="mb-8 text-5xl text-red-500">⚠️</div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Something went wrong
      </h1>
      <p className="text-gray-600 text-center max-w-md mb-8">
        We apologize for the inconvenience. An error occurred while processing
        your request.
      </p>
      <div className="flex space-x-4">
        <Button onClick={reset} variant="primary">
          Try Again
        </Button>
        <Button href="/" variant="outline">
          Return Home
        </Button>
      </div>
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg max-w-md">
          <p className="text-sm font-mono text-gray-700 break-all">
            {error.message}
          </p>
        </div>
      )}
    </div>
  );
}
