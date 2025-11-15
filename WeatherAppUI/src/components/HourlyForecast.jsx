/**
 * Hourly forecast component
 * @param {Array} props.hourlyData - Array of hourly forecast data
 */
export const HourlyForecast = ({ hourlyData = [] }) => {
  // If no data, show placeholder
  if (!hourlyData || hourlyData.length === 0) {
    return (
      <div className="mt-8 w-full overflow-hidden">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Hourly Forecast
          </h2>
        </div>
        <div className="flex overflow-x-auto space-x-3 pb-3 scrollbar-hide">
          {[...Array(10)].map((_, idx) => (
            <div
              key={idx}
              className="min-w-[85px] flex-shrink-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 hover:border-white/30 transition-all duration-200 flex flex-col items-center text-white shadow-lg"
            >
              <div className="text-xs font-medium text-gray-200 mb-2 whitespace-nowrap">
                {`${9 + idx}:00`}
              </div>
              <div className="w-8 h-8 mb-2 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-400/30 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-yellow-200"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-base font-bold whitespace-nowrap">
                {27 + (idx % 3)}°
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 w-full overflow-hidden">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Hourly Forecast
        </h2>
      </div>
      <div className="flex overflow-x-auto space-x-3 pb-3 scrollbar-hide">
        {hourlyData.slice(0, 24).map((hour, idx) => {
          const hourTime = new Date(hour.time);
          const isNow = idx === 0;

          return (
            <div
              key={idx}
              className={`min-w-[85px] flex-shrink-0 backdrop-blur-sm border rounded-xl p-4 transition-all duration-200 flex flex-col items-center text-white shadow-lg ${
                isNow
                  ? "bg-gradient-to-br from-blue-500/30 to-purple-500/30 border-blue-400/50 scale-105"
                  : "bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/30"
              }`}
            >
              <div
                className={`text-xs font-medium mb-2 whitespace-nowrap ${
                  isNow ? "text-blue-100 font-bold" : "text-gray-200"
                }`}
              >
                {isNow
                  ? "Now"
                  : hourTime.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
              </div>
              <div className="w-8 h-8 mb-2 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-400/30 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-yellow-200"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-base font-bold whitespace-nowrap">
                {Math.round(hour.temp_c)}°
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
