import { highlightMatch } from "../utils/textUtils";

/**
 * Search bar component with autocomplete suggestions
 * @param {Object} props
 * @param {string} props.searchInput - Current search input value
 * @param {Function} props.onSearchChange - Handler for search input changes
 * @param {Function} props.onSearch - Handler for search submission
 * @param {Array} props.suggestions - Array of city suggestions
 * @param {Function} props.onSuggestionClick - Handler for suggestion click
 * @param {Function} props.onClearSuggestions - Handler to clear suggestions
 */
export const SearchBar = ({
  searchInput,
  onSearchChange,
  onSearch,
  suggestions,
  onSuggestionClick,
  onClearSuggestions,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  const handleSuggestionClick = (city) => {
    onSuggestionClick(city);
    onClearSuggestions();
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col mb-6">
      <div className="relative">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search..."
          className="input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none focus:shadow-2xl duration-300"
          name="search"
        />
        <svg
          className="size-6 absolute top-3 right-3 text-gray-500"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
        </svg>
      </div>
      {suggestions.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-black/70 border border-gray-400 rounded-xl overflow-hidden z-10">
          {suggestions.map((city, idx) => (
            <div
              key={idx}
              className="p-3 text-white hover:bg-black/80 cursor-pointer"
              onClick={() => handleSuggestionClick(city)}
            >
              {highlightMatch(city, searchInput)}
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

