export type AirQualityResponse = {
  hourly: {
    time: string[];
    pm10: number[];
    pm2_5: number[];
    carbon_monoxide: number[];
    nitrogen_dioxide: number[];
    sulphur_dioxide: number[];
    european_aqi: number[];
  };
};
export type AirQualityData = {
  time: string[];
  pm10: number[];
  pm25: number[];
  co: number[];
  no2: number[];
  so2: number[];
  aqi: number[];
};
