/**
 * Formats date to locale string
 * @param {string|Date} date - Date to format
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, options = {}) => {
  return new Date(date).toLocaleDateString("vi-VN", options);
};

/**
 * Formats time to locale string
 * @param {Date} date - Date to format
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} - Formatted time string
 */
export const formatTime = (date, options = { hour: "2-digit", minute: "2-digit" }) => {
  return new Date(date).toLocaleTimeString([], options);
};

/**
 * Gets formatted date and time
 * @returns {string} - Formatted date and time string
 */
export const getCurrentDateTime = () => {
  const now = new Date();
  return `${formatDate(now)} | ${formatTime(now)}`;
};

