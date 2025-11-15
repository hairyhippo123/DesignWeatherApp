/**
 * Hourly forecast component
 * @param {Array} props.hourlyData - Array of hourly forecast data
 */
export const HourlyForecast = ({ hourlyData = [] }) => {
  // If no data, show placeholder
  if (!hourlyData || hourlyData.length === 0) {
    return (
      <div className="flex overflow-x-auto mt-10 space-x-4 pb-2">
        {[...Array(10)].map((_, idx) => (
          <div
            key={idx}
            className="min-w-[64px] bg-black/40 hover:bg-black/60 transition rounded-xl p-3 flex flex-col items-center text-white"
          >
            <div className="text-xs mb-1">{`${9 + idx}:00`}</div>
            <div className="text-lg font-semibold">{27 + (idx % 3)}°C</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex overflow-x-auto mt-10 space-x-4 pb-2">
      {hourlyData.map((hour, idx) => (
        <div
          key={idx}
          className="min-w-[64px] bg-black/40 hover:bg-black/60 transition rounded-xl p-3 flex flex-col items-center text-white"
        >
          <div className="text-xs mb-1">
            {new Date(hour.time).toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div className="text-lg font-semibold">
            {Math.round(hour.temp_c)}°C
          </div>
        </div>
      ))}
    </div>
  );
};

