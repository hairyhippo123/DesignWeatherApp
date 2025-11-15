/**
 * Loading spinner component
 */
export const LoadingSpinner = () => {
  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

