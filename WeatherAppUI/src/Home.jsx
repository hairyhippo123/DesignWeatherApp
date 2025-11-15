import { useState, useEffect, useCallback } from "react";
import { useWeather } from "./hooks/useWeather";
import { useCitySuggestions } from "./hooks/useCitySuggestions";
import { getBackgroundImage } from "./utils/weatherUtils";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { SearchBar } from "./components/SearchBar";
import { WeatherInfo } from "./components/WeatherInfo";
import { HourlyForecast } from "./components/HourlyForecast";
import { DailyForecast } from "./components/DailyForecast";
import { ErrorMessage } from "./components/ErrorMessage";
import { DEFAULT_LOCATION } from "./constants/weatherCodes";

/**
 * Main Home component
 * Displays weather information and forecast
 */
export default function Home() {
  const [searchInput, setSearchInput] = useState("");

  const {
    weatherType,
    weatherCode,
    locationName,
    temperature,
    forecastData,
    isLoading,
    error,
    fetchWeather,
    clearError,
  } = useWeather();

  const { suggestions, clearSuggestions } = useCitySuggestions(searchInput);

  // Load initial weather data on mount
  useEffect(() => {
    fetchWeather(DEFAULT_LOCATION);
  }, [fetchWeather]);

  // Handle search
  const handleSearch = useCallback(
    (location) => {
      const query = location || searchInput.trim();
      if (!query) {
        return;
      }
      fetchWeather(query);
    },
    [searchInput, fetchWeather]
  );

  // Handle suggestion click
  const handleSuggestionClick = useCallback(
    (city) => {
      setSearchInput(city);
      handleSearch(city);
    },
    [handleSearch]
  );

  // Get hourly forecast from first day
  const hourlyData =
    forecastData.length > 0 ? forecastData[0].hour || [] : [];

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 opacity-0 animate-fadeIn"
      style={{ backgroundImage: getBackgroundImage(weatherCode) }}
    >
      <div className="bg-black/30 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-7xl flex flex-col md:flex-row overflow-hidden relative">
        {isLoading && <LoadingSpinner />}

        {/* Left Panel */}
        <div className="flex-1 p-8 flex flex-col justify-between">
          <div>
            <SearchBar
              searchInput={searchInput}
              onSearchChange={setSearchInput}
              onSearch={handleSearch}
              suggestions={suggestions}
              onSuggestionClick={handleSuggestionClick}
              onClearSuggestions={clearSuggestions}
            />

            <WeatherInfo
              locationName={locationName}
              temperature={temperature}
              weatherType={weatherType}
            />
          </div>

          <HourlyForecast hourlyData={hourlyData} />
        </div>

        {/* Right Panel – Forecast 5 days */}
        <DailyForecast forecastData={forecastData} />
      </div>

      {error && (
        <ErrorMessage message={error} onDismiss={clearError} />
      )}
    </div>
  );
}
