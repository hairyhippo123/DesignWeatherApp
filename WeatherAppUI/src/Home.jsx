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

  const {
    suggestions,
    isLoading: isLoadingSuggestions,
    clearSuggestions,
  } = useCitySuggestions(searchInput);

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
      clearSuggestions();
    },
    [searchInput, fetchWeather, clearSuggestions]
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
  const hourlyData = forecastData.length > 0 ? forecastData[0].hour || [] : [];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed transition-all duration-1000"
        style={{
          backgroundImage: getBackgroundImage(weatherCode),
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/50"></div>
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4 md:p-6 lg:p-8 z-10">
        <div className="w-full max-w-7xl animate-fadeIn">
          <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-black/50 border border-white/30 overflow-hidden relative">
            {isLoading && <LoadingSpinner />}

            <div className="flex flex-col lg:flex-row">
              {/* Left Panel */}
              <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col justify-between min-w-0 space-y-8">
                {/* Search and Weather Info */}
                <div className="space-y-8 min-w-0">
                  <SearchBar
                    searchInput={searchInput}
                    onSearchChange={setSearchInput}
                    onSearch={handleSearch}
                    suggestions={suggestions}
                    isLoadingSuggestions={isLoadingSuggestions}
                    onSuggestionClick={handleSuggestionClick}
                    onClearSuggestions={clearSuggestions}
                  />

                  <WeatherInfo
                    locationName={locationName}
                    temperature={temperature}
                    weatherType={weatherType}
                  />
                </div>

                {/* Hourly Forecast */}
                <div className="min-w-0">
                  <HourlyForecast hourlyData={hourlyData} />
                </div>
              </div>

              {/* Right Panel – Forecast 5 days */}
              <div className="border-t lg:border-t-0 lg:border-l border-white/20">
                <DailyForecast forecastData={forecastData} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && <ErrorMessage message={error} onDismiss={clearError} />}
    </div>
  );
}
