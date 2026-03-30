import { useState } from "react";

import { useHistorical } from "../hooks/useHistorical";
import { useAirQuality } from "../../air-quality/hooks/useAirQuality";

import Card from "../../../shared/components/ui/Card";
import ChartBlock from "../../../shared/components/ui/ChartBlock";
import LineChart from "../../../shared/components/ui/LineChart";
import Skeleton from "../../../shared/components/ui/Skeleton";
import { useAppStore } from "../../../shared/store/useAppStore";

export default function HistoricalPage() {
  const coords = useAppStore((s) => s.coords);

  const [startInput, setStartInput] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d.toISOString().split("T")[0];
  });

  const [endInput, setEndInput] = useState(
    () => new Date().toISOString().split("T")[0],
  );

  const [startDate, setStartDate] = useState(startInput);
  const [endDate, setEndDate] = useState(endInput);

  const [error, setError] = useState<string | null>(null);

  const data = useHistorical(coords?.lat, coords?.lon, startDate, endDate);
  const air = useAirQuality(coords?.lat, coords?.lon);

  // ================= VALIDATION =================
  const handleSearch = () => {
    const start = new Date(startInput);
    const end = new Date(endInput);
    const today = new Date();

    if (end > today) return setError("End date cannot be in the future");
    if (start > end) return setError("Start date must be before end date");

    const diffDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays > 730) return setError("Date range cannot exceed 2 years");

    setError(null);
    setStartDate(startInput);
    setEndDate(endInput);
  };

  // ================= LOADING =================
  if (!coords || !data || !air) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-32" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  // ================= DATA PROCESSING =================

  const labels = data.time;

  const meanTemp = data.tempMax.map(
    (max, i) => (max + (data.tempMin[i] ?? 0)) / 2,
  );

  // 🌅 Sun conversion
  const sunriseValues = data.sunrise.map((t) => {
    const d = new Date(t);
    return d.getHours() + d.getMinutes() / 60;
  });

  const sunsetValues = data.sunset.map((t) => {
    const d = new Date(t);
    return d.getHours() + d.getMinutes() / 60;
  });

  // 🌬 Wind direction (dominant)
  const avgDirection =
    data.windDirection.reduce((a, b) => a + b, 0) / data.windDirection.length;

  const getDirection = (deg: number) => {
    const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return dirs[Math.round(deg / 45) % 8];
  };

  // 🌧 Total precipitation
  const totalPrecip = data.precipitation.reduce((a, b) => a + b, 0);

  // 🌫 AIR QUALITY (hourly → daily aggregation)

  const groupByDay = (times: string[], values: number[]) => {
    const map: Record<string, number[]> = {};

    times.forEach((t, i) => {
      const day = t.split("T")[0];
      if (!map[day]) map[day] = [];
      map[day].push(values[i]);
    });

    return map;
  };

  const alignToLabels = (labels: string[], grouped: Record<string, number[]>) =>
    labels.map((day) => {
      const arr = grouped[day] || [];
      if (!arr.length) return 0;
      return arr.reduce((a, b) => a + b, 0) / arr.length;
    });

  const pm10Daily = alignToLabels(data.time, groupByDay(air.time, air.pm10));

  const pm25Daily = alignToLabels(data.time, groupByDay(air.time, air.pm25));

  // ================= UI =================

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Historical Weather</h1>
        <p className="text-gray-500 text-sm">Analyze long-term trends</p>
      </div>

      {/* DATE RANGE */}
      <Card title="Select Date Range">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Start Date</label>
            <input
              type="date"
              value={startInput}
              onChange={(e) => setStartInput(e.target.value)}
              className="border rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">End Date</label>
            <input
              type="date"
              value={endInput}
              onChange={(e) => setEndInput(e.target.value)}
              className="border rounded-lg px-3 py-2"
            />
          </div>

          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Apply
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      </Card>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card title="Total Precipitation">
          <p>{totalPrecip.toFixed(2)} mm</p>
        </Card>

        <Card title="Wind Overview">
          <p>
            {getDirection(avgDirection)} ({avgDirection.toFixed(0)}°)
          </p>
        </Card>

        <Card title="Sun Cycle (Latest)">
          <p>🌅 {data.sunrise.at(-1)}</p>
          <p>🌇 {data.sunset.at(-1)}</p>
        </Card>
      </div>

      {/* CHARTS */}

      <ChartBlock title="Temperature (Min / Max / Mean)">
        <LineChart
          labels={labels}
          data={[
            { label: "Max", values: data.tempMax, borderColor: "red" },
            { label: "Min", values: data.tempMin, borderColor: "blue" },
            { label: "Mean", values: meanTemp, borderColor: "green" },
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
              values: data.precipitation,
              borderColor: "purple",
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
              values: data.windSpeed,
              borderColor: "orange",
            },
          ]}
          multi
        />
      </ChartBlock>

      <ChartBlock title="Sun Cycle (IST)">
        <LineChart
          labels={labels}
          data={[
            {
              label: "Sunrise",
              values: sunriseValues,
              borderColor: "orange",
            },
            {
              label: "Sunset",
              values: sunsetValues,
              borderColor: "purple",
            },
          ]}
          multi
        />
      </ChartBlock>

      <ChartBlock title="Air Quality (PM10 & PM2.5)">
        <LineChart
          labels={labels}
          data={[
            { label: "PM10", values: pm10Daily, borderColor: "brown" },
            { label: "PM2.5", values: pm25Daily, borderColor: "black" },
          ]}
          multi
        />
      </ChartBlock>
    </div>
  );
}
