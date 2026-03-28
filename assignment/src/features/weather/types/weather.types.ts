export type HourlyWeather = {
  time: string[];
  temperature_2m: number[];
  relativehumidity_2m: number[];
  precipitation: number[];
  visibility: number[];
  windspeed_10m: number[];
};

export type DailyWeather = {
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
};

export type WeatherResponse = {
  hourly: HourlyWeather;
  daily: DailyWeather;
};

export type WeatherData = {
  hourly: {
    time: string[];
    temperature: number[];
    humidity: number[];
    precipitation: number[];
    visibility: number[];
    windSpeed: number[];
  };
  daily: {
    tempMax: number;
    tempMin: number;
    sunrise: string;
    sunset: string;
  };
};
