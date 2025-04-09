import React, { useState, useEffect } from "react";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState("5d");
  const [weatherType, setWeatherType] = useState("Clear");

  // Simulate fetching weather type (you will replace this with real API call)
  useEffect(() => {
    // Example: Simulate getting "Rain" from weather API
    setTimeout(() => {
      setWeatherType("Rain");
    }, 1000);
  }, []);

  const getBackgroundImage = () => {
    if (weatherType === "Rain") return "url('/backgrounds/rainy.jpg')";
    if (weatherType === "Clear") return "url('/backgrounds/sunny.jpg')";
    if (weatherType === "Clouds") return "url('/backgrounds/cloudy.jpg')";
    if (weatherType === "Fog") return "url('/backgrounds/foggy.jpg')";
    if (weatherType === "Snow") return "url('/backgrounds/snowy.jpg')";
    return "url('/backgrounds/default.jpg')";
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: getBackgroundImage() }}
    >
      <div className="bg-black/30 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-7xl flex flex-col md:flex-row overflow-hidden">

        {/* Left Panel */}
        <div className="flex-1 p-8 flex flex-col justify-between">
          {/* Main Weather */}
          <div>
            <div className="text-gray-400 text-sm">21 April 2023 | 11:00</div>
            <div className="text-4xl md:text-5xl text-white font-bold mt-2">Tbilisi, Georgia</div>
            <div className="flex items-center mt-6">
              <div className="text-7xl md:text-8xl text-white font-extrabold">11°C</div>
              <div className="ml-6 text-gray-300 text-sm">Northwest, 38.9 km/h</div>
            </div>
            <div className="text-4xl md:text-5xl text-white font-semibold mt-6">Heavy Rain</div>
          </div>

          {/* Hourly Forecast */}
          <div className="flex overflow-x-auto mt-10 space-x-4 pb-2">
            {["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"].map((hour, idx) => (
              <div key={idx} className="min-w-[64px] bg-black/40 hover:bg-black/60 transition rounded-xl p-3 flex flex-col items-center text-white">
                <div className="text-xs mb-1">{hour}</div>
                <div className="text-lg font-semibold">{9 + idx}°C</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/3 bg-black/20 backdrop-blur-md p-8 flex flex-col">
          <div className="text-white text-xl font-bold mb-6">The Next Days Forecast</div>
          <div className="flex space-x-4 mb-8">
            {["5d","14d","30d"].map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition ${selectedTab === tab ? 'bg-white text-black' : 'bg-gray-600/50 text-white hover:bg-gray-500/70'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Forecast List */}
          <div className="space-y-6">
            {["Friday, April 21","Saturday, April 22","Sunday, April 23","Monday, April 24","Tuesday, April 25"].map((day, idx) => (
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
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
