/**
 * Weather API service
 * Handles all weather-related API calls
 */

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || "";
const WEATHER_API_BASE_URL = "https://api.weatherapi.com/v1";

/**
 * Fetches weather forecast for a location
 * @param {string} location - Location to fetch weather for
 * @param {number} days - Number of days for forecast (default: 5)
 * @returns {Promise<Object>} - Weather data
 */
export const fetchWeatherForecast = async (location, days = 5) => {
  if (!WEATHER_API_KEY) {
    throw new Error("API key is not configured. Please add VITE_WEATHER_API_KEY to your .env file");
  }

  const encodedLocation = encodeURIComponent(location);
  const response = await fetch(
    `${WEATHER_API_BASE_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${encodedLocation}&days=${days}&lang=en`
  );

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error("City not found.");
    }
    if (response.status === 401) {
      throw new Error("Invalid API key. Please check your configuration.");
    }
    throw new Error(`API error: ${response.status}. Please try again later.`);
  }

  return await response.json();
};

/**
 * Fetches city suggestions/autocomplete using WeatherAPI search endpoint
 * @param {string} query - Search query
 * @param {AbortSignal} signal - Abort signal for cancelling the request
 * @returns {Promise<Array>} - Array of city suggestions with format "City, Country"
 */
export const fetchCitySuggestions = async (query, signal = null) => {
  if (!query || !query.trim() || query.trim().length < 2) {
    return [];
  }

  if (!WEATHER_API_KEY) {
    console.warn("Weather API key is not configured. City suggestions will not work.");
    return [];
  }

  try {
    const encodedQuery = encodeURIComponent(query.trim());
    const response = await fetch(
      `${WEATHER_API_BASE_URL}/search.json?key=${WEATHER_API_KEY}&q=${encodedQuery}`,
      {
        signal: signal || undefined,
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid API key");
      }
      return [];
    }

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      // Format: "City Name, Country"
      return data.slice(0, 8).map((city) => {
        return `${city.name}${city.region ? `, ${city.region}` : ""}, ${city.country}`;
      });
    }

    return [];
  } catch (error) {
    // Don't throw error if request was aborted
    if (error.name === "AbortError") {
      throw error;
    }

    console.error("fetchCitySuggestions error:", error);
    return [];
  }
};
