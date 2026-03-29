import { fetchJson } from "../../../shared/services/apiClient";
import type { WeatherData, WeatherResponse } from "../types/weather.types";

export const fetchWeather = async (
  lat: number,
  lon: number,
): Promise<WeatherData> => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,precipitation,visibility,windspeed_10m,uv_index,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,windspeed_10m_max&timezone=auto`;

  const data = await fetchJson<WeatherResponse>(url);
  return {
    hourly: {
      time: data.hourly.time,
      temperature: data.hourly.temperature_2m,
      humidity: data.hourly.relativehumidity_2m,
      precipitation: data.hourly.precipitation,
      visibility: data.hourly.visibility,
      windSpeed: data.hourly.windspeed_10m,
      uvIndex: data.hourly.uv_index,
      precipitationProbability: data.hourly.precipitation_probability,
    },
    daily: {
      tempMax: data.daily.temperature_2m_max[0],
      tempMin: data.daily.temperature_2m_min[0],
      sunrise: data.daily.sunrise[0],
      sunset: data.daily.sunset[0],
      windMax: data.daily.windspeed_10m_max[0],
    },
  };
};
