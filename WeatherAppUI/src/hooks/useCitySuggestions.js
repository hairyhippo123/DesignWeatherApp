import { useState, useEffect, useCallback } from "react";
import { fetchCitySuggestions } from "../services/geoService";
import { removeVietnameseTones } from "../utils/textUtils";

/**
 * Custom hook for managing city suggestions
 * @param {string} searchQuery - Search query for city suggestions
 * @returns {Object} - Suggestions state and handlers
 */
export const useCitySuggestions = (searchQuery) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadSuggestions = async () => {
      if (!searchQuery || !searchQuery.trim()) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      const normalizedQuery = removeVietnameseTones(searchQuery);
      const results = await fetchCitySuggestions(normalizedQuery);
      setSuggestions(results);
      setIsLoading(false);
    };

    // Debounce API calls
    const timeoutId = setTimeout(loadSuggestions, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
  }, []);

  return {
    suggestions,
    isLoading,
    clearSuggestions,
  };
};

