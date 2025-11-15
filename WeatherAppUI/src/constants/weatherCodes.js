/**
 * Weather condition codes mapping
 * Maps weather condition codes to background images
 */
export const WEATHER_CODE_BACKGROUNDS = {
  SUNNY: [1000],
  CLOUDY: [1003, 1006, 1009],
  RAINY: [1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240],
  SNOWY: [1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222],
  FOGGY: [1030, 1135, 1147],
};

export const BACKGROUND_IMAGES = {
  SUNNY: "url('/backgrounds/sunny.jpg')",
  CLOUDY: "url('/backgrounds/cloudy.jpg')",
  RAINY: "url('/backgrounds/rainy.jpg')",
  SNOWY: "url('/backgrounds/snowy.jpg')",
  FOGGY: "url('/backgrounds/foggy.jpg')",
  DEFAULT: "url('/backgrounds/default.jpg')",
};

export const DEFAULT_LOCATION = "Hà Nội, Việt Nam";
export const DEFAULT_TEMPERATURE = 27;
export const DEFAULT_WEATHER_CODE = 1000;
export const DEFAULT_WEATHER_TYPE = "Clear";

