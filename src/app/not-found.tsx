import { Button } from '@/components/common';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className="text-6xl font-bold text-gray-900 mb-4">404</div>
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">
        Page Not Found
      </h1>
      <p className="text-gray-600 text-center max-w-md mb-8">
        We couldn&apos;t find the page you&apos;re looking for. The page might have been
        removed, renamed, or doesn&apos;t exist.
      </p>
      <div className="flex space-x-4">
        <Button href="/" size="lg">
          Return Home
        </Button>
        <Button href="/lessons" variant="outline" size="lg">
          Browse Lessons
        </Button>
      </div>
    </div>
  );
}
