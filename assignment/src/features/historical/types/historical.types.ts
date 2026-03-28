export type HistoricalResponse = {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    windspeed_10m_max: number[];
  };
};

export type HistoricalData = {
  time: string[];
  tempMax: number[];
  tempMin: number[];
  precipitation: number[];
  windSpeed: number[];
};
