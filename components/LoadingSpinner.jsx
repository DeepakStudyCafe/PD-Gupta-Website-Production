// components/LoadingSpinner.jsx
export default function LoadingSpinner({ size = 'md' }) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
      <div className="w-14 h-14 border-4 border-primary-700 border-t-transparent rounded-full animate-spin"></div>

      <p className="mt-6 text-lg font-medium text-gray-700">Loading...</p>
      <p className="text-sm text-gray-500 mt-1">
        Please wait while we prepare the page
      </p>
    </div>
  );
}
