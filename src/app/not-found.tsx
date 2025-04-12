import { Button } from '@/components/common';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Page Not Found
      </h2>
      <p className="text-gray-600 text-center max-w-md mb-8">
        Sorry, we couldn't find the page you're looking for. It might have been
        removed, renamed, or doesn't exist.
      </p>
      <Button href="/" size="lg">
        Return Home
      </Button>
    </div>
  );
}
