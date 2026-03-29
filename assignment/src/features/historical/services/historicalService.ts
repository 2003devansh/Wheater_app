import { fetchJson } from "../../../shared/services/apiClient";
import type {
  HistoricalData,
  HistoricalResponse,
} from "../types/historical.types";

export const fetchHistorical = async (
  lat: number,
  lon: number,
  start: string,
  end: string,
): Promise<HistoricalData> => {
  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${start}&end_date=${end}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&timezone=auto`;

  const data = await fetchJson<HistoricalResponse>(url);
  return {
    time: data.daily.time,
    tempMax: data.daily.temperature_2m_max,
    tempMin: data.daily.temperature_2m_min,
    precipitation: data.daily.precipitation_sum,
    windSpeed: data.daily.windspeed_10m_max,
  };
};
