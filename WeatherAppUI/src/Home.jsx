// Home.jsx
import React, { useState, useEffect } from "react";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState("5d");
  const [weatherType, setWeatherType] = useState("Clear");
  const [searchInput, setSearchInput] = useState("");
  const [locationName, setLocationName] = useState("Tbilisi, Georgia");
  const [temperature, setTemperature] = useState(11);
  const [isLoading, setIsLoading] = useState(false);
  const [forecastData, setForecastData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setWeatherType("Rain");
    }, 1000);
  }, []);

  const getBackgroundImage = () => {
    const bgMap = {
      Rain: "url('/backgrounds/rainy.jpg')",
      Clear: "url('/backgrounds/sunny.jpg')",
      Clouds: "url('/backgrounds/cloudy.jpg')",
      Fog: "url('/backgrounds/foggy.jpg')",
      Snow: "url('/backgrounds/snowy.jpg')",
    };
    return bgMap[weatherType] || "url('/backgrounds/default.jpg')";
  };

  const fetchCitySuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}&limit=5`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': 'c5db06d892mshd466a10c1f52c38p18f361jsn1a54a2c8bdb7',
            'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
            'accept': 'application/json'
            
          }
        }
      );
      if (!response.ok) throw new Error("GeoDB API error");
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        setSuggestions(data.data.map(city => `${city.name},${city.countryCode}`));
      } else {
        setSuggestions(["No results found"]);
      }
    } catch (error) {
      console.error("fetchCitySuggestions error:", error);
      setSuggestions(["No results found"]);
    }
  };

  const handleSearch = async (cityOverride) => {
    if (!searchInput.trim() && !cityOverride) return;
    setIsLoading(true);
  
    let input = cityOverride || searchInput.trim();
    
    if (!input.includes(",")) {
      input += ",VN"; // chỉ tự thêm ,VN nếu thiếu
    }
  
    const encodedInput = encodeURIComponent(input); // encode toàn bộ
    
    try {
      const currentWeatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodedInput}&appid=e91d2af2599560662dd1085d05f48dca&units=metric`
      );
      if (!currentWeatherResponse.ok) throw new Error("City not found");
      const currentData = await currentWeatherResponse.json();
      setWeatherType(currentData.weather[0].main);
      setTemperature(Math.round(currentData.main.temp));
      setLocationName(`${currentData.name}, ${currentData.sys.country}`);
  
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodedInput}&appid=e91d2af2599560662dd1085d05f48dca&units=metric`
      );
      if (!forecastResponse.ok) throw new Error("Forecast not found");
      const forecastJson = await forecastResponse.json();
  
      const dailyForecast = {};
      forecastJson.list.forEach(item => {
        const date = item.dt_txt.split(" ")[0];
        if (!dailyForecast[date]) {
          dailyForecast[date] = item;
        }
      });
  
      setForecastData(Object.values(dailyForecast).slice(0, 5));
    } catch (error) {
      console.error(error);
      alert("City not found. Please check the name.");
    } finally {
      setIsLoading(false);
      setSuggestions([]);
    }
  };
  

  const handleSuggestionClick = (city) => {
    if (city === "No results found") return;
    setSearchInput(city);
    setSuggestions([]);
    handleSearch(city);
  };

  const highlightMatch = (city) => {
    const parts = city.split(new RegExp(`(${searchInput})`, "gi"));
    return parts.map((part, idx) =>
      part.toLowerCase() === searchInput.toLowerCase() ? (
        <span key={idx} className="text-yellow-400 font-semibold">{part}</span>
      ) : (
        <span key={idx}>{part}</span>
      )
    );
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 opacity-0 animate-fadeIn"
      style={{ backgroundImage: getBackgroundImage() }}
    >
      <div className="bg-black/30 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-7xl flex flex-col md:flex-row overflow-hidden">
      {isLoading && (
  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
  </div>
)}
        {/* Left Panel */}
        <div className="flex-1 p-8 flex flex-col justify-between">
          <div>
            {/* Search Bar */}
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="relative flex flex-col mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                    fetchCitySuggestions(e.target.value);
                  }}
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
                      {highlightMatch(city)}
                    </div>
                  ))}
                </div>
              )}
            </form>

            <div className="text-gray-400 text-sm">{new Date().toLocaleDateString()} | {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            <div className="text-4xl md:text-5xl text-white font-bold mt-2">{locationName}</div>
            <div className="flex items-center mt-6">
              <div className="text-7xl md:text-8xl text-white font-extrabold">{temperature}°C</div>
              <div className="ml-6 text-gray-300 text-sm">Northwest, 38.9 km/h</div>
            </div>
            <div className="text-4xl md:text-5xl text-white font-semibold mt-6">{weatherType}</div>
          </div>

          {/* Hourly Forecast */}
<div className="flex overflow-x-auto mt-10 space-x-4 pb-2">
  {forecastData.length > 0 ? (
    forecastData.slice(0, 10).map((item, idx) => (
      <div key={idx} 
      className="min-w-[64px] bg-black/40 hover:bg-black/60 transition rounded-xl p-3 flex flex-col items-center text-white transform translate-y-4 opacity-0 animate-slideUp"
      style={{ animationDelay: `${idx * 0.1}s` }}>
        <div className="text-xs mb-1">
          {new Date(item.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="text-lg font-semibold">
          {Math.round(item.main.temp)}°C
        </div>
      </div>
    ))
  ) : (
    ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"].map((hour, idx) => (
      <div key={idx} className="min-w-[64px] bg-black/40 hover:bg-black/60 transition rounded-xl p-3 flex flex-col items-center text-white">
        <div className="text-xs mb-1">{hour}</div>
        <div className="text-lg font-semibold">{9 + idx}°C</div>
      </div>
    ))
  )}
</div>
        </div>
        {/* Right Panel */}
        <div className="w-full md:w-1/3 bg-black/20 backdrop-blur-md p-8 flex flex-col">
          <div className="text-white text-xl font-bold mb-6">The Next Days Forecast</div>     
          {/* Forecast List */}
          <div className="space-y-6">
            {forecastData.length > 0 ? (
              forecastData.map((day, idx) => (
                <div key={idx} className="flex justify-between items-center text-white transform translate-y-4 opacity-0 animate-slideUp"
                style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div>
                    <div className="text-sm font-medium">{new Date(day.dt_txt).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</div>
                    <div className="text-xs text-gray-400">{day.weather[0].main}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">{Math.round(day.main.temp_min)}°C</div>
                    <div className="text-sm">{Math.round(day.main.temp_max)}°C</div>
                  </div>
                </div>
              ))
            ) : (
              ["Friday, April 21","Saturday, April 22","Sunday, April 23","Monday, April 24","Tuesday, April 25"].map((day, idx) => (
                <div key={idx} className="flex justify-between items-center text-white">
                  <div>
                    <div className="text-sm font-medium">{day}</div>
                    <div className="text-xs text-gray-400">{idx === 0 ? "Heavy Rain" : idx === 2 ? "Fog" : "Partly Cloudy"}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">9°C</div>
                    <div className="text-sm">16°C</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
