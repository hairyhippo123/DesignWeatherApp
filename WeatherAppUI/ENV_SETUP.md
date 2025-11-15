# Environment Variables Setup

This document explains how to set up environment variables for the Weather App.

## Required Environment Variables

Create a `.env` file in the `WeatherAppUI` directory with the following variables:

```env
VITE_WEATHER_API_KEY=your_weather_api_key_here
VITE_GEO_API_KEY=your_geo_api_key_here
```

## Getting API Keys

### 1. WeatherAPI Key

1. Visit [https://www.weatherapi.com/](https://www.weatherapi.com/)
2. Sign up for a free account
3. Navigate to your dashboard
4. Copy your API key
5. Add it to your `.env` file as `VITE_WEATHER_API_KEY`

**Note:** The free tier includes 1 million API calls per month.

### 2. GeoDB API Key (Optional)

1. Visit [https://rapidapi.com/wirefreethought/api/geodb-cities/](https://rapidapi.com/wirefreethought/api/geodb-cities/)
2. Sign up for a RapidAPI account
3. Subscribe to the GeoDB Cities API (free tier available)
4. Copy your API key from the RapidAPI dashboard
5. Add it to your `.env` file as `VITE_GEO_API_KEY`

**Note:** The GeoDB API is optional. If not provided, city suggestions will be disabled, but the app will still work for manual searches.

## Important Notes

- **Never commit your `.env` file to version control**
- The `.env` file should be in `.gitignore`
- Restart the development server after adding/changing environment variables
- Environment variables must be prefixed with `VITE_` to be accessible in Vite applications

## Troubleshooting

### Variables not working?

1. Make sure your `.env` file is in the `WeatherAppUI` directory
2. Check that variables are prefixed with `VITE_`
3. Restart your development server
4. Verify there are no typos in variable names

### API errors?

1. Verify your API keys are correct
2. Check that your API keys are active and not expired
3. Verify you have available API credits/quota
4. Check the browser console for detailed error messages

