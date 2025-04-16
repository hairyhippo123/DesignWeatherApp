import React, { useState, useEffect } from "react";

// 🔑 WeatherAPI key
const WEATHER_API_KEY = "ac1f6d44573c40d0b4d92440251504"; // Thay bằng key bạn lấy được

// ✅ Hàm xử lý tiếng Việt
const removeVietnameseTones = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "D");
};

export default function Home() {
  const [weatherType, setWeatherType] = useState("Clear");
  const [weatherCode, setWeatherCode] = useState(1000); // ← thêm
  const [searchInput, setSearchInput] = useState("");
  const [locationName, setLocationName] = useState("Hà Nội, Việt Nam");
  const [temperature, setTemperature] = useState(27);
  const [isLoading, setIsLoading] = useState(false);
  const [forecastData, setForecastData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // ✅ Dựa vào weatherCode
  const getBackgroundImage = () => {
    const code = weatherCode;

    if ([1000].includes(code)) return "url('/backgrounds/sunny.jpg')";
    if ([1003, 1006, 1009].includes(code)) return "url('/backgrounds/cloudy.jpg')";
    if ([1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240].includes(code)) return "url('/backgrounds/rainy.jpg')";
    if ([1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222].includes(code)) return "url('/backgrounds/snowy.jpg')";
    if ([1030, 1135, 1147].includes(code)) return "url('/backgrounds/foggy.jpg')";

    return "url('/backgrounds/default.jpg')";
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
    const encodedInput = encodeURIComponent(input);

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${encodedInput}&days=5&lang=vi`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();

      setWeatherType(data.current.condition.text);
      setWeatherCode(data.current.condition.code); // ← gán code
      setTemperature(Math.round(data.current.temp_c));
      setLocationName(`${data.location.name}, ${data.location.country}`);
      setForecastData(data.forecast.forecastday);
    } catch (error) {
      console.error(error);
      alert("Không tìm thấy thành phố.");
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
            {/* Search */}
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="relative flex flex-col mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchInput(value);
                    fetchCitySuggestions(removeVietnameseTones(value));
                  }}
                  placeholder="Search..."
                  className="input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none focus:shadow-2xl duration-300"
                  name="search"
                />
                <svg className="size-6 absolute top-3 right-3 text-gray-500" stroke="currentColor" strokeWidth="1.5"
                  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    strokeLinejoin="round" strokeLinecap="round"></path>
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
              <div className="ml-6 text-gray-300 text-sm">Cập nhật tự động</div>
            </div>
            <div className="text-4xl md:text-5xl text-white font-semibold mt-6">{weatherType}</div>
          </div>

          {/* Hourly forecast placeholder */}
          <div className="flex overflow-x-auto mt-10 space-x-4 pb-2">
            {[...Array(10)].map((_, idx) => (
              <div key={idx} className="min-w-[64px] bg-black/40 hover:bg-black/60 transition rounded-xl p-3 flex flex-col items-center text-white">
                <div className="text-xs mb-1">{`${9 + idx}:00`}</div>
                <div className="text-lg font-semibold">{27 + idx % 3}°C</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel – Forecast 5 days */}
        <div className="w-full md:w-1/3 bg-black/20 backdrop-blur-md p-8 flex flex-col">
          <div className="text-white text-xl font-bold mb-6">Dự báo 5 ngày tới</div>
          <div className="space-y-6">
            {forecastData.map((day, idx) => (
              <div key={idx} className="flex justify-between items-center text-white transform translate-y-4 opacity-0 animate-slideUp"
                style={{ animationDelay: `${idx * 0.1}s` }}>
                <div>
                  <div className="text-sm font-medium">{new Date(day.date).toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
                  <div className="text-xs text-gray-400">{day.day.condition.text}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm">{Math.round(day.day.mintemp_c)}°C</div>
                  <div className="text-sm">{Math.round(day.day.maxtemp_c)}°C</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
