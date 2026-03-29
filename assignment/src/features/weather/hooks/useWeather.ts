import { useEffect, useState } from "react";
import type { WeatherData } from "../types/weather.types";
import { fetchWeather } from "../services/weatherService";

export const useWeather = (lat?: number, lon?: number) => {
  const [data, setData] = useState<WeatherData | null>(null);

  useEffect(() => {
    if (!lat || !lon) return;

    fetchWeather(lat, lon).then(setData).catch(console.error);
  }, [lat, lon]);

  return data;
};
