import { useState, useEffect, useCallback, useRef } from "react";
import { fetchCitySuggestions } from "../services/weatherService";

/**
 * Custom hook for managing city suggestions
 * @param {string} searchQuery - Search query for city suggestions
 * @param {number} minLength - Minimum query length to trigger search (default: 2)
 * @returns {Object} - Suggestions state and handlers
 */
export const useCitySuggestions = (searchQuery, minLength = 2) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const loadSuggestions = async () => {
      // Clear previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Reset state if query is empty or too short
      if (!searchQuery || searchQuery.trim().length < minLength) {
        setSuggestions([]);
        setIsLoading(false);
        setError(null);
        return;
      }

      // Create new abort controller for this request
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      setIsLoading(true);
      setError(null);

      try {
        const query = searchQuery.trim();
        
        // Check if request was aborted before making the request
        if (signal.aborted) {
          return;
        }
        
        const results = await fetchCitySuggestions(query, signal);
        
        // Check if request was aborted after the request
        if (signal.aborted) {
          return;
        }

        setSuggestions(results);
      } catch (err) {
        // Don't set error if request was aborted
        if (err.name === "AbortError" || signal.aborted) {
          return;
        }

        console.error("Error fetching suggestions:", err);
        setError(err.message);
        setSuggestions([]);
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    // Debounce API calls
    const timeoutId = setTimeout(loadSuggestions, 300);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [searchQuery, minLength]);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
    setError(null);
    setIsLoading(false);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  return {
    suggestions,
    isLoading,
    error,
    clearSuggestions,
  };
};

