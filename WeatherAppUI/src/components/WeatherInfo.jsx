import { getCurrentDateTime } from "../utils/dateUtils";

/**
 * Weather information display component
 * @param {Object} props
 * @param {string} props.locationName - Location name
 * @param {number} props.temperature - Temperature in Celsius
 * @param {string} props.weatherType - Weather condition text
 */
export const WeatherInfo = ({ locationName, temperature, weatherType }) => {
  return (
    <div>
      <div className="text-gray-400 text-sm">{getCurrentDateTime()}</div>
      <div className="text-4xl md:text-5xl text-white font-bold mt-2">
        {locationName}
      </div>
      <div className="flex items-center mt-6">
        <div className="text-7xl md:text-8xl text-white font-extrabold">
          {temperature}°C
        </div>
        <div className="ml-6 text-gray-300 text-sm">Auto update</div>
      </div>
      <div className="text-4xl md:text-5xl text-white font-semibold mt-6">
        {weatherType}
      </div>
    </div>
  );
};

