import { fetchJson } from "../../../shared/services/apiClient";
import type { AirQualityData, AirQualityResponse } from "../types/air.types";

export const fetchAirQuality = async (
  lat: number,
  lon: number,
): Promise<AirQualityData> => {
  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5,carbon_monoxide,carbon_dioxide,nitrogen_dioxide,sulphur_dioxide,european_aqi`;

  const data = await fetchJson<AirQualityResponse>(url);

  return {
    time: data.hourly.time,
    pm10: data.hourly.pm10,
    pm25: data.hourly.pm2_5,
    co: data.hourly.carbon_monoxide,
    no2: data.hourly.nitrogen_dioxide,
    so2: data.hourly.sulphur_dioxide,
    aqi: data.hourly.european_aqi,
    co2: data.hourly.carbon_dioxide,
  };
};
