/**
 * Removes Vietnamese tones from a string
 * @param {string} str - Input string
 * @returns {string} - String without Vietnamese tones
 */
export const removeVietnameseTones = (str) => {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

/**
 * Highlights matching text in a string
 * @param {string} text - Text to highlight
 * @param {string} searchTerm - Term to highlight
 * @returns {Array} - Array of JSX elements with highlighted parts
 */
export const highlightMatch = (text, searchTerm) => {
  if (!searchTerm) return text;

  const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
  return parts.map((part, idx) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <span key={idx} className="text-yellow-400 font-semibold">
        {part}
      </span>
    ) : (
      <span key={idx}>{part}</span>
    )
  );
};

