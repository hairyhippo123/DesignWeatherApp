/**
 * Loading spinner component
 */
export const LoadingSpinner = () => {
  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 rounded-2xl animate-fadeIn">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-white/20 rounded-full"></div>
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <p className="text-white font-medium text-sm animate-pulse">
          Loading weather data...
        </p>
      </div>
    </div>
  );
};
