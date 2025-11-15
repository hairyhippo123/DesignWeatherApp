import { WEATHER_CODE_BACKGROUNDS, BACKGROUND_IMAGES } from "../constants/weatherCodes";

/**
 * Gets background image URL based on weather code
 * @param {number} weatherCode - Weather condition code
 * @returns {string} - Background image URL
 */
export const getBackgroundImage = (weatherCode) => {
  if (WEATHER_CODE_BACKGROUNDS.SUNNY.includes(weatherCode)) {
    return BACKGROUND_IMAGES.SUNNY;
  }
  if (WEATHER_CODE_BACKGROUNDS.CLOUDY.includes(weatherCode)) {
    return BACKGROUND_IMAGES.CLOUDY;
  }
  if (WEATHER_CODE_BACKGROUNDS.RAINY.includes(weatherCode)) {
    return BACKGROUND_IMAGES.RAINY;
  }
  if (WEATHER_CODE_BACKGROUNDS.SNOWY.includes(weatherCode)) {
    return BACKGROUND_IMAGES.SNOWY;
  }
  if (WEATHER_CODE_BACKGROUNDS.FOGGY.includes(weatherCode)) {
    return BACKGROUND_IMAGES.FOGGY;
  }
  return BACKGROUND_IMAGES.DEFAULT;
};

