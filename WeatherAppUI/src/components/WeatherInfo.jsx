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
    <div className="mt-6 space-y-6">
      {/* Date and Time */}
      <div className="flex items-center gap-2 text-gray-200 text-sm font-medium">
        <svg
          className="w-4 h-4"
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
        <span>{getCurrentDateTime()}</span>
      </div>

      {/* Location */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <svg
            className="w-5 h-5 text-white/80"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-gray-300 text-xs uppercase tracking-wider font-medium">
            Location
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight">
          {locationName}
        </h1>
      </div>

      {/* Temperature */}
      <div className="flex items-baseline gap-3">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 blur-3xl rounded-full opacity-75"></div>
          <div className="relative">
            <span className="text-6xl md:text-7xl lg:text-8xl text-white font-extrabold drop-shadow-2xl">
              {temperature}
            </span>
            <span className="absolute top-0 right-0 text-3xl md:text-4xl lg:text-5xl text-yellow-200 font-bold opacity-80">
              °
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center pb-2">
          <span className="text-xl md:text-2xl text-white font-bold">C</span>
          <span className="text-xs text-gray-300 mt-1 flex items-center gap-1">
            <svg
              className="w-3 h-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            Auto update
          </span>
        </div>
      </div>

      {/* Weather Condition */}
      <div className="pt-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              />
            </svg>
          </div>
          <div>
            <p className="text-lg md:text-xl lg:text-2xl text-white font-semibold">
              {weatherType}
            </p>
            <p className="text-xs text-gray-300 mt-0.5">Current condition</p>
          </div>
        </div>
      </div>
    </div>
  );
};
