/**
 * Hourly forecast component
 * @param {Array} props.hourlyData - Array of hourly forecast data
 */
export const HourlyForecast = ({ hourlyData = [] }) => {
  // If no data, show placeholder
  if (!hourlyData || hourlyData.length === 0) {
    return (
      <div className="mt-10 w-full overflow-hidden">
        <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
          {[...Array(10)].map((_, idx) => (
            <div
              key={idx}
              className="min-w-[70px] flex-shrink-0 bg-black/40 hover:bg-black/60 transition rounded-xl p-3 flex flex-col items-center text-white"
            >
              <div className="text-xs mb-1 whitespace-nowrap">{`${
                9 + idx
              }:00`}</div>
              <div className="text-lg font-semibold whitespace-nowrap">
                {27 + (idx % 3)}°C
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 w-full overflow-hidden">
      <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
        {hourlyData.map((hour, idx) => (
          <div
            key={idx}
            className="min-w-[70px] flex-shrink-0 bg-black/40 hover:bg-black/60 transition rounded-xl p-3 flex flex-col items-center text-white"
          >
            <div className="text-xs mb-1 whitespace-nowrap">
              {new Date(hour.time).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </div>
            <div className="text-lg font-semibold whitespace-nowrap">
              {Math.round(hour.temp_c)}°C
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
