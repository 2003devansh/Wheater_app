import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  zoomPlugin,
);

type Dataset = {
  label: string;
  values: number[];
  borderColor?: string;
  backgroundColor?: string;
};

type Props = {
  labels: string[];
  data: number[] | Dataset[];
  label?: string;
  multi?: boolean;
};

export default function LineChart({
  labels,
  data,
  label,
  multi = false,
}: Props) {
  const datasets = multi
    ? (data as Dataset[]).map((d) => ({
        label: d.label,
        data: d.values,
        borderColor: d.borderColor || "#3b82f6",
        backgroundColor: d.backgroundColor || "transparent",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 5,
      }))
    : [
        {
          label,
          data: data as number[],
          borderColor: "#3b82f6",
          backgroundColor: "transparent",
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 2,
          pointHoverRadius: 5,
        },
      ];

  const chartData = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false as const,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "x" as const,
        },
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: "x" as const,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 0,
        },
      },
    },
  };

  return (
    <div className="w-full h-64">
      <Line data={chartData} options={options} />
    </div>
  );
}
