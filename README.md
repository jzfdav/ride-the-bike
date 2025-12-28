# RideTheBike

A gamified PWA to encourage frequent bike rides and maintain mechanical health.

## Intent

To reach 13,000 km in 3 months (from 10,000 km) by gamifying "mechanical sympathy." The app encourages frequent, short local rides to keep the machine "alive" and ready.

See `/docs/00-vision.md` for the full project vision.

## Tech Stack

- **Framework:** React 18 (with Vite)
- **Styling:** Tailwind CSS (OLED True Black theme)
- **Deployment:** GitHub Pages
- **State:** LocalStorage (Offline-first approach)
- **PWA:** vite-plugin-pwa

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` to see the app.

### Build

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for GitHub Pages deployment.

## Project Structure

```
ride-the-bike/
├── src/
│   ├── components/      # Modular UI components
│   │   ├── BottomActions.tsx
│   │   ├── FuelModule.tsx
│   │   ├── TyreModule.tsx
│   │   ├── WeatherModule.tsx
│   │   └── ...
│   ├── app.tsx          # Main app component
│   ├── store.ts         # Zustand state management
│   ├── main.tsx         # Entry point
│   └── index.css        # Tailwind CSS imports
├── docs/                # Project documentation
├── ai/                  # AI context and rules
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind with OLED theme
└── package.json
```

## Features

- **Odometer Progress:** Track progress from base to target KM (configurable in settings).
- **Battery Health:** Virtual metric based on time since last ride (100% if rode today, -5% per day).
- **Service Deadline:** Calculate run-rate based on a user-defined service due date.
- **Fuel Tracker:** Log refuels and monitor real-time fuel efficiency (KM/L).
- **Tyre Pressure:** Track front/rear pressure with timestamped updates.
- **Maintenance:** Dedicated module for chain lubrication tracking.
- **Rider Insights:** Live weather forecasts and Air Quality Index (AQI) via Open-Meteo API.
- **Pre-ride Checklist:** Essential safety gear and bike health checks before every ride.
- **OLED Theme:** True black background with Pulsar Neon Blue accents for maximum battery efficiency and aesthetics.
