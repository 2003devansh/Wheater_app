import { useEffect, useState } from "react";
import type { Coordinates } from "../types/global.types";

export const useGeolocation = () => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoordinates({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => {
        console.error("Failed to get geolocation", err);

        // Note the water : these are hardcoded value
        setCoordinates({
          lat: 28.6139,
          lon: 77.209,
        });
      },
    );
  }, []);

  //   console.log("Current coordinates:", coordinates);

  return coordinates;
};
