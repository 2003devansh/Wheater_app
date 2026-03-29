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
      () => {
        console.error("Failed to get geolocation", coordinates);
      },
    );
  }, []);
};
