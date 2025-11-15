/**
 * Highlights matching text in a string
 * @param {string} text - Text to highlight
 * @param {string} searchTerm - Term to highlight
 * @returns {Array} - Array of JSX elements with highlighted parts
 */
export const highlightMatch = (text, searchTerm) => {
  if (!searchTerm) return text;

  // Escape special regex characters in searchTerm
  const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escapedTerm})`, "gi"));
  
  return parts.map((part, idx) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <span
        key={idx}
        className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-bold"
      >
        {part}
      </span>
    ) : (
      <span key={idx}>{part}</span>
    )
  );
};

