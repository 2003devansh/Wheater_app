import { useEffect, useState } from "react";
import type { AirQualityData } from "../types/air.types";
import { fetchAirQuality } from "../services/airQualityService";

export const useAirQuality = (lat?: number, lon?: number) => {
  const [data, setData] = useState<AirQualityData | null>(null);

  useEffect(() => {
    if (!lat || !lon) return;
    fetchAirQuality(lat, lon).then(setData).catch(console.error);
  }, [lat, lon]);

  return data;
};
