import { useEffect, useState } from "react";
import type { HistoricalData } from "../types/historical.types";
import { fetchHistorical } from "../services/historicalService";

export const useHistorical = (
  lat?: number,
  lon?: number,
  start?: string,
  end?: string,
) => {
  const [data, setData] = useState<HistoricalData | null>(null);

  useEffect(() => {
    if (!lat || !lon || !start || !end) return;

    fetchHistorical(lat, lon, start, end).then(setData).catch(console.error);
  }, [lat, lon, start, end]);

  return data;
};
