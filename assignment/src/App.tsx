import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect } from "react";

import CurrentWeather from "./features/weather/pages/CurrentWeather";

import Navbar from "./shared/components/layout/Navbar";

import { useGeolocation } from "./shared/hooks/useGeolocation";
import HistoricalPage from "./features/historical/page/HistoricalPage";
import { useAppStore } from "./shared/store/useAppStore";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">{children}</div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <CurrentWeather />
      </Layout>
    ),
  },
  {
    path: "/historical",
    element: (
      <Layout>
        <HistoricalPage />
      </Layout>
    ),
  },
]);

export default function App() {
  const coords = useGeolocation();
  const setCoords = useAppStore((s) => s.setCoords);

  useEffect(() => {
    if (coords) setCoords(coords);
  }, [coords]);

  return <RouterProvider router={router} />;
}
