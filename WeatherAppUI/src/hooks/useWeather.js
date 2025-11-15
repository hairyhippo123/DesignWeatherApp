import { useState, useCallback } from "react";
import { fetchWeatherForecast } from "../services/weatherService";
import {
  DEFAULT_LOCATION,
  DEFAULT_TEMPERATURE,
  DEFAULT_WEATHER_CODE,
  DEFAULT_WEATHER_TYPE,
} from "../constants/weatherCodes";

/**
 * Custom hook for managing weather data
 * @returns {Object} - Weather state and handlers
 */
export const useWeather = () => {
  const [weatherType, setWeatherType] = useState(DEFAULT_WEATHER_TYPE);
  const [weatherCode, setWeatherCode] = useState(DEFAULT_WEATHER_CODE);
  const [locationName, setLocationName] = useState(DEFAULT_LOCATION);
  const [temperature, setTemperature] = useState(DEFAULT_TEMPERATURE);
  const [forecastData, setForecastData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetches weather data for a location
   * @param {string} location - Location to fetch weather for
   */
  const fetchWeather = useCallback(async (location) => {
    if (!location || !location.trim()) {
      setError("Vui lòng nhập tên thành phố");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherForecast(location.trim());
      
      setWeatherType(data.current.condition.text);
      setWeatherCode(data.current.condition.code);
      setTemperature(Math.round(data.current.temp_c));
      setLocationName(`${data.location.name}, ${data.location.country}`);
      setForecastData(data.forecast.forecastday || []);
    } catch (err) {
      setError(err.message || "Không thể tải dữ liệu thời tiết. Vui lòng thử lại.");
      console.error("Weather fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Clears the error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Resets weather data to defaults
   */
  const resetWeather = useCallback(() => {
    setWeatherType(DEFAULT_WEATHER_TYPE);
    setWeatherCode(DEFAULT_WEATHER_CODE);
    setLocationName(DEFAULT_LOCATION);
    setTemperature(DEFAULT_TEMPERATURE);
    setForecastData([]);
    setError(null);
  }, []);

  return {
    weatherType,
    weatherCode,
    locationName,
    temperature,
    forecastData,
    isLoading,
    error,
    fetchWeather,
    clearError,
    resetWeather,
  };
};

