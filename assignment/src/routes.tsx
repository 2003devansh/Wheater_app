import { createBrowserRouter } from "react-router-dom";
import CurrentWeather from "./features/weather/pages/CurrentWeather";
import HistoricalPage from "./features/historical/page/HistoricalPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CurrentWeather />,
  },
  {
    path: "/historical",
    element: <HistoricalPage />,
  },
]);
