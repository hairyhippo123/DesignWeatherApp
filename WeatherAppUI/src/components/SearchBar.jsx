import { useEffect, useRef, useState } from "react";
import { highlightMatch } from "../utils/textUtils";

/**
 * Search bar component with autocomplete suggestions
 * @param {Object} props
 * @param {string} props.searchInput - Current search input value
 * @param {Function} props.onSearchChange - Handler for search input changes
 * @param {Function} props.onSearch - Handler for search submission
 * @param {Array} props.suggestions - Array of city suggestions
 * @param {boolean} props.isLoadingSuggestions - Loading state for suggestions
 * @param {Function} props.onSuggestionClick - Handler for suggestion click
 * @param {Function} props.onClearSuggestions - Handler to clear suggestions
 */
export const SearchBar = ({
  searchInput,
  onSearchChange,
  onSearch,
  suggestions,
  isLoadingSuggestions = false,
  onSuggestionClick,
  onClearSuggestions,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const containerRef = useRef(null);

  // Reset selected index when suggestions change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [suggestions]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        onClearSuggestions();
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClearSuggestions]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (suggestions.length === 0 && e.key !== "Escape") {
      if (e.key === "Enter") {
        e.preventDefault();
        onSearch(searchInput);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          onSearch(searchInput);
        }
        break;
      case "Escape":
        e.preventDefault();
        onClearSuggestions();
        inputRef.current?.blur();
        setIsFocused(false);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
      handleSuggestionClick(suggestions[selectedIndex]);
    } else {
      onSearch(searchInput);
    }
  };

  const handleSuggestionClick = (city) => {
    onSuggestionClick(city);
    onClearSuggestions();
    setIsFocused(false);
    inputRef.current?.blur();
  };

  const handleInputChange = (e) => {
    onSearchChange(e.target.value);
    setSelectedIndex(-1);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleClear = () => {
    onSearchChange("");
    inputRef.current?.focus();
    onClearSuggestions();
  };

  // Scroll selected suggestion into view
  useEffect(() => {
    if (selectedIndex >= 0 && suggestionsRef.current) {
      const selectedElement = suggestionsRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [selectedIndex, suggestions]);

  // Show suggestions dropdown when input is focused and has at least 2 characters
  const hasInput = searchInput.trim().length >= 2;
  const showSuggestions = isFocused && hasInput;
  const hasValue = searchInput.trim().length > 0;

  return (
    <div ref={containerRef} className="relative flex flex-col mb-6">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <div
            className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl transition-opacity duration-300 ${
              isFocused ? "opacity-100" : "opacity-0"
            }`}
          ></div>
          <div
            className={`relative flex items-center bg-white/95 backdrop-blur-md border-2 rounded-2xl transition-all duration-300 shadow-lg ${
              isFocused
                ? "border-blue-400 shadow-2xl shadow-blue-500/20 scale-105"
                : "border-white/30 hover:border-white/50"
            }`}
          >
            {/* Search Icon */}
            <div className="pl-4 pr-2 flex-shrink-0">
              <svg
                className={`w-5 h-5 transition-colors duration-200 ${
                  isFocused ? "text-blue-500" : "text-gray-400"
                }`}
                stroke="currentColor"
                strokeWidth="2"
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

            {/* Input Field */}
            <input
              ref={inputRef}
              type="text"
              value={searchInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={handleInputFocus}
              placeholder="Search for a city..."
              className="flex-1 py-4 px-2 bg-transparent text-gray-800 placeholder-gray-400 outline-none text-sm font-medium w-48 md:w-56 lg:w-64 transition-all duration-300"
              name="search"
              autoComplete="off"
            />

            {/* Loading Spinner */}
            {isLoadingSuggestions && (
              <div className="pr-3 flex-shrink-0">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* Clear Button */}
            {hasValue && !isLoadingSuggestions && (
              <button
                type="button"
                onClick={handleClear}
                className="pr-3 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none"
                aria-label="Clear search"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full mt-3 w-full max-w-[400px] bg-white/95 backdrop-blur-xl border border-white/30 rounded-2xl overflow-hidden z-50 shadow-2xl shadow-black/20 max-h-80 overflow-y-auto scrollbar-hide animate-fadeIn">
          {isLoadingSuggestions ? (
            <div className="p-6 text-center">
              <div className="inline-flex items-center gap-3 text-gray-600">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm font-medium">Searching cities...</span>
              </div>
            </div>
          ) : suggestions.length > 0 ? (
            <div ref={suggestionsRef} className="py-2">
              {suggestions.map((city, idx) => (
                <div
                  key={idx}
                  className={`mx-2 mb-1 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                    idx === selectedIndex
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 shadow-md scale-[1.02]"
                      : "hover:bg-gray-100/50"
                  }`}
                  onClick={() => handleSuggestionClick(city)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700 flex-1">
                      {highlightMatch(city, searchInput)}
                    </span>
                    {idx === selectedIndex && (
                      <svg
                        className="w-4 h-4 text-blue-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <div className="flex flex-col items-center gap-2">
                <svg
                  className="w-12 h-12 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm font-medium text-gray-500">
                  No cities found
                </p>
                <p className="text-xs text-gray-400">
                  Try a different search term
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
