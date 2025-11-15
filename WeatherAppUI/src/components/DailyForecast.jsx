import { formatDate } from "../utils/dateUtils";

/**
 * Daily forecast component
 * @param {Array} props.forecastData - Array of daily forecast data
 */
export const DailyForecast = ({ forecastData = [] }) => {
  if (!forecastData || forecastData.length === 0) {
    return (
      <div className="w-full md:w-1/3 bg-black/20 backdrop-blur-md p-8 flex flex-col">
        <div className="text-white text-xl font-bold mb-6">Dự báo 5 ngày tới</div>
        <div className="text-gray-400 text-sm">Không có dữ liệu</div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-1/3 bg-black/20 backdrop-blur-md p-8 flex flex-col">
      <div className="text-white text-xl font-bold mb-6">Dự báo 5 ngày tới</div>
      <div className="space-y-6">
        {forecastData.map((day, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center text-white transform translate-y-4 opacity-0 animate-slideUp"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div>
              <div className="text-sm font-medium">
                {formatDate(day.date, {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </div>
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
  );
};

