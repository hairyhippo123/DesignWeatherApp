/**
 * Error message component
 * @param {Object} props
 * @param {string} props.message - Error message to display
 * @param {Function} props.onDismiss - Handler to dismiss error
 */
export const ErrorMessage = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-fadeIn">
      <span>{message}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-2 text-white hover:text-gray-200"
        >
          ×
        </button>
      )}
    </div>
  );
};

