import { useState } from "react";

import LineChart from "../../../shared/components/ui/LineChart";
import ChartBlock from "../../../shared/components/ui/ChartBlock";
import Card from "../../../shared/components/ui/Card";
import Skeleton from "../../../shared/components/ui/Skeleton";

import { useAirQuality } from "../../air-quality/hooks/useAirQuality";
import { useWeather } from "../hooks/useWeather";
import { useAppStore } from "../../../shared/store/useAppStore";

export default function CurrentWeather() {
  const coords = useAppStore((s) => s.coords);

  const weather = useWeather(coords?.lat, coords?.lon);
  const air = useAirQuality(coords?.lat, coords?.lon);

  const [unit, setUnit] = useState<"C" | "F">("C");

  const convertTemp = (temp: number) =>
    unit === "C" ? temp : (temp * 9) / 5 + 32;

  if (!coords || !weather || !air) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  const labels = weather.hourly.time.map((t) => `${new Date(t).getHours()}:00`);

  const currentTemp = convertTemp(
    weather.hourly.temperature[weather.hourly.temperature.length - 1],
  );

  const maxTemp = convertTemp(weather.daily.tempMax);
  const minTemp = convertTemp(weather.daily.tempMin);

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Weather Dashboard
          </h1>
          <p className="text-gray-500 text-sm">Real-time weather insights</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setUnit("C")}
            className={`px-3 py-1 rounded-lg text-sm ${
              unit === "C"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            °C
          </button>

          <button
            onClick={() => setUnit("F")}
            className={`px-3 py-1 rounded-lg text-sm ${
              unit === "F"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            °F
          </button>
        </div>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Current Overview
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Card title="Temperature">
            <p className="text-3xl font-bold text-gray-800">
              {currentTemp.toFixed(1)}°{unit}
            </p>
            <p className="text-sm text-gray-500">
              Max: {maxTemp.toFixed(1)}° / Min: {minTemp.toFixed(1)}°
            </p>
          </Card>

          <Card title="Atmospheric">
            <div className="space-y-1 text-sm">
              <p>Humidity: {weather.hourly.humidity[0]}%</p>
              <p>Precipitation: {weather.hourly.precipitation[0]}</p>
              <p>UV Index: {weather.hourly.uvIndex[0]}</p>
            </div>
          </Card>

          <Card title="Sun Cycle">
            <div className="space-y-1 text-sm">
              <p>🌅 {weather.daily.sunrise}</p>
              <p>🌇 {weather.daily.sunset}</p>
            </div>
          </Card>

          <Card title="Wind">
            <p>Max: {weather.daily.windMax} km/h</p>
            <p>Precip Prob: {weather.hourly.precipitationProbability[0]}%</p>
          </Card>

          <Card title="Air Quality">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p>AQI: {air.aqi[0]}</p>
              <p>PM10: {air.pm10[0]}</p>
              <p>PM2.5: {air.pm25[0]}</p>
              <p>CO: {air.co[0]}</p>
              <p>CO2: {air.co2[0]}</p>
              <p>NO2: {air.no2[0]}</p>
              <p>SO2: {air.so2[0]}</p>
            </div>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-700">Hourly Trends</h2>

        <ChartBlock title="Temperature">
          <LineChart
            labels={labels}
            data={[
              {
                label: `Temperature (°${unit})`,
                values: weather.hourly.temperature.map(convertTemp),
                borderColor: "red",
              },
            ]}
            multi
          />
        </ChartBlock>

        <ChartBlock title="Humidity">
          <LineChart
            labels={labels}
            data={[
              {
                label: "Humidity",
                values: weather.hourly.humidity,
                borderColor: "blue",
              },
            ]}
            multi
          />
        </ChartBlock>

        <ChartBlock title="Precipitation">
          <LineChart
            labels={labels}
            data={[
              {
                label: "Precipitation",
                values: weather.hourly.precipitation,
                borderColor: "purple",
              },
            ]}
            multi
          />
        </ChartBlock>

        <ChartBlock title="Visibility">
          <LineChart
            labels={labels}
            data={[
              {
                label: "Visibility",
                values: weather.hourly.visibility,
                borderColor: "green",
              },
            ]}
            multi
          />
        </ChartBlock>

        <ChartBlock title="Wind Speed">
          <LineChart
            labels={labels}
            data={[
              {
                label: "Wind Speed",
                values: weather.hourly.windSpeed,
                borderColor: "orange",
              },
            ]}
            multi
          />
        </ChartBlock>

        <ChartBlock title="PM10 & PM2.5">
          <LineChart
            labels={labels}
            data={[
              {
                label: "PM10",
                values: air.pm10,
                borderColor: "brown",
              },
              {
                label: "PM2.5",
                values: air.pm25,
                borderColor: "black",
              },
            ]}
            multi
          />
        </ChartBlock>
      </section>
    </div>
  );
}
