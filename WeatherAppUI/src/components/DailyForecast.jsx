import { formatDate } from "../utils/dateUtils";

/**
 * Get weather icon based on condition
 */
const getWeatherIcon = (condition) => {
  const conditionLower = condition.toLowerCase();
  
  if (conditionLower.includes("sun") || conditionLower.includes("clear")) {
    return (
      <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          clipRule="evenodd"
        />
      </svg>
    );
  } else if (conditionLower.includes("cloud")) {
    return (
      <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
        <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
      </svg>
    );
  } else if (conditionLower.includes("rain")) {
    return (
      <svg className="w-6 h-6 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
        <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path
          fillRule="evenodd"
          d="M3.5 4a1.5 1.5 0 011.5 1.5v.5a1 1 0 001 1h6a1 1 0 001-1v-.5A1.5 1.5 0 0114.5 4h1a.5.5 0 010 1h-1a.5.5 0 00-.5.5v.5a2 2 0 01-2 2H6a2 2 0 01-2-2v-.5a.5.5 0 00-.5-.5h-1a.5.5 0 010-1h1z"
          clipRule="evenodd"
        />
      </svg>
    );
  } else if (conditionLower.includes("snow")) {
    return (
      <svg className="w-6 h-6 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
        <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
      </svg>
    );
  }
  
  return (
    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
    </svg>
  );
};

/**
 * Daily forecast component
 * @param {Array} props.forecastData - Array of daily forecast data
 */
export const DailyForecast = ({ forecastData = [] }) => {
  if (!forecastData || forecastData.length === 0) {
    return (
      <div className="w-full md:w-[380px] lg:w-[420px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 md:p-8 flex flex-col rounded-r-2xl md:rounded-l-2xl shadow-2xl">
        <div className="flex items-center gap-2 mb-6">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <h2 className="text-xl font-bold text-white">5-Day Forecast</h2>
        </div>
        <div className="text-gray-300 text-sm text-center py-8">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-[380px] lg:w-[420px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 md:p-8 flex flex-col rounded-r-2xl md:rounded-l-2xl shadow-2xl">
      <div className="flex items-center gap-2 mb-6">
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <h2 className="text-xl font-bold text-white">5-Day Forecast</h2>
      </div>
      <div className="space-y-3 flex-1 overflow-y-auto scrollbar-hide">
        {forecastData.map((day, idx) => {
          const date = new Date(day.date);
          const isToday = idx === 0;
          const dayName = isToday
            ? "Today"
            : formatDate(day.date, { weekday: "short" });
          const fullDate = formatDate(day.date, {
            day: "numeric",
            month: "short",
          });

          return (
            <div
              key={idx}
              className={`group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform translate-y-4 opacity-0 animate-slideUp ${
                isToday ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/30" : ""
              }`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Weather Icon */}
                  <div className="flex-shrink-0">
                    {getWeatherIcon(day.day.condition.text)}
                  </div>

                  {/* Date and Condition */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-sm font-bold ${
                          isToday ? "text-blue-200" : "text-white"
                        }`}
                      >
                        {dayName}
                      </span>
                      <span className="text-xs text-gray-300">{fullDate}</span>
                    </div>
                    <p className="text-xs text-gray-300 truncate">
                      {day.day.condition.text}
                    </p>
                  </div>
                </div>

                {/* Temperature */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="flex flex-col items-end gap-1">
                    <div className="text-base font-bold text-white flex items-center gap-1">
                      {Math.round(day.day.maxtemp_c)}
                      <span className="text-xs">°</span>
                    </div>
                    <div className="text-sm text-gray-400 flex items-center gap-1">
                      {Math.round(day.day.mintemp_c)}
                      <span className="text-xs">°</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
