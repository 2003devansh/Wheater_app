import { create } from "zustand";
import type { Coordinates, DateRange, Unit } from "../types/global.types";

type AppState = {
  coords: Coordinates | null;
  setCoords: (coords: Coordinates) => void;

  unit: Unit;
  setUnit: (unit: Unit) => void;

  selectedDate: string;
  setSelectedDate: (date: string) => void;

  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
};

export const useAppStore = create<AppState>((set) => ({
  coords: null,
  setCoords: (coords) => set({ coords }),

  unit: "C",
  setUnit: (unit) => set({ unit }),

  selectedDate: new Date().toISOString().split("T")[0],
  setSelectedDate: (date) => set({ selectedDate: date }),

  dateRange: {
    start: "",
    end: "",
  },
  setDateRange: (range) => set({ dateRange: range }),
}));
