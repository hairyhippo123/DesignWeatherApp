/**
 * GeoDB API service
 * Handles city suggestions and location searches
 */

const GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY || "";
const GEO_API_BASE_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

/**
 * Fetches city suggestions based on search query
 * @param {string} query - Search query
 * @param {number} limit - Maximum number of results (default: 5)
 * @returns {Promise<Array>} - Array of city suggestions
 */
export const fetchCitySuggestions = async (query, limit = 5) => {
  if (!query || !query.trim()) {
    return [];
  }

  if (!GEO_API_KEY) {
    console.warn("Geo API key is not configured");
    return [];
  }

  try {
    const response = await fetch(
      `${GEO_API_BASE_URL}/cities?namePrefix=${encodeURIComponent(query)}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": GEO_API_KEY,
          "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
          accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("GeoDB API error");
    }

    const data = await response.json();
    
    if (data.data && data.data.length > 0) {
      return data.data.map((city) => `${city.name},${city.countryCode}`);
    }
    
    return [];
  } catch (error) {
    console.error("fetchCitySuggestions error:", error);
    return [];
  }
};

