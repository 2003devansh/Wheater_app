# 🌦️ Weather Dashboard

A responsive weather dashboard built with **React + TypeScript** that provides real-time and historical weather insights using the Open-Meteo API.

---

## 🚀 Live Demo

👉 wheater-app-rouge.vercel.app

---

## 📌 Project Overview

This application automatically detects the user's location using browser GPS and displays:

- 🌡️ Current weather conditions
- 📅 Historical weather analysis (up to 2 years)

It is designed to be **fast, responsive, and user-friendly**, with interactive charts and clean UI.

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite) + TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Chart.js + react-chartjs-2
- **State Management:** Zustand
- **API:** Open-Meteo API
- **Other:** chartjs-plugin-zoom

---

## ✨ Features

### 📍 Location-Based Weather

- Automatically detects user location using browser geolocation
- Fetches localized weather data

---

### 🌤️ Current Weather

- Temperature (Current, Min, Max)
- Atmospheric data (Humidity, Precipitation, UV Index)
- Wind data (Speed, Precipitation Probability)
- Sun cycle (Sunrise, Sunset)
- Air quality (AQI, PM10, PM2.5, CO, NO2, SO2)

---

### 📊 Hourly Charts

- Temperature (°C ↔ °F toggle)
- Humidity
- Precipitation
- Visibility
- Wind Speed
- PM10 & PM2.5 (combined chart)

✔ Interactive features:

- Zoom & pan
- Responsive charts
- Smooth rendering

---

### 📅 Historical Data (Max 2 Years)

- Select custom date range
- Temperature (Min, Max, Mean)
- Precipitation trends
- Wind speed trends

✔ Includes:

- Input validation (max 2 years, no future dates)
- Controlled API calls (only on button click)

---

## ⚡ Performance Optimizations

- Controlled API requests (no unnecessary calls)
- Lightweight state management (Zustand)
- Efficient rendering with React hooks
- Optimized chart updates

---

## 📱 Responsive Design

- Fully mobile-friendly layout
- Adaptive grid system
- Readable charts on all screen sizes

---

## 🧠 Key Engineering Decisions

- **Feature-based folder structure** for scalability
- **Custom hooks** for API abstraction
- **Reusable UI components** (Card, ChartBlock, LineChart)
- **Controlled form handling** for better UX
- **Separation of input vs applied state** in historical search

---

## 🔌 APIs Used

- Open-Meteo Forecast API
- Open-Meteo Air Quality API
- Open-Meteo Historical Archive API

---

## 🧪 How to Run Locally

```bash
# Clone the repository
git clone https://github.com/2003devansh/Wheater_app

# Navigate to project
cd assignment

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 📦 Build

```bash
npm run build
```

---

## 🚀 Deployment

This project is deployed using **Vercel**.

To deploy:

1. Push code to GitHub
2. Import repo in Vercel
3. Click deploy

---

---

## 📝 Notes

- Temperature toggle implemented (°C ↔ °F)
- API calls optimized for performance
- Validation ensures correct historical queries

---

## 👤 Author

Devansh singh
GitHub: https://github.com/2003devansh

---

## ⭐ Acknowledgements

- Open-Meteo API
- Chart.js
- React ecosystem

---
