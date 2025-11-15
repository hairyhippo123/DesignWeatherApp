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
    throw new Error("API key chưa được cấu hình. Vui lòng thêm VITE_WEATHER_API_KEY vào file .env");
  }

  const encodedLocation = encodeURIComponent(location);
  const response = await fetch(
    `${WEATHER_API_BASE_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${encodedLocation}&days=${days}&lang=vi`
  );

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error("Không tìm thấy thành phố.");
    }
    if (response.status === 401) {
      throw new Error("API key không hợp lệ. Vui lòng kiểm tra lại cấu hình.");
    }
    throw new Error(`Lỗi API: ${response.status}. Vui lòng thử lại sau.`);
  }

  return await response.json();
};

