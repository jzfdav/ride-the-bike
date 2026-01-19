# RideTheBike

[![Deploy to GitHub Pages](https://github.com/jzfdav/ride-the-bike/actions/workflows/deploy.yml/badge.svg)](https://github.com/jzfdav/ride-the-bike/actions/workflows/deploy.yml)
[![Playwright Tests](https://github.com/jzfdav/ride-the-bike/actions/workflows/playwright.yml/badge.svg)](https://github.com/jzfdav/ride-the-bike/actions/workflows/playwright.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Biome](https://img.shields.io/badge/Biome-60A5FA?style=for-the-badge&logo=biome&logoColor=white)](https://biomejs.dev/)

A gamified PWA to encourage frequent bike rides and maintain mechanical health.

## Intent

To reach your next service milestone by gamifying "mechanical sympathy." The app encourages frequent, short local rides to keep the machine "alive" and ready.

See `/docs/00-vision.md` for the full project vision.

## Tech Stack

- **Framework:** React 18 (with Vite)
- **Styling:** Tailwind CSS (Material 3 Expressive Design)
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
├── tailwind.config.js   # Tailwind with M3 Tokens
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
- **Configurable Dashboard:** Toggle visibility for Fuel, Tyre, Lube, and Checklist modules in Settings.
- **Theme Switcher:** Choose from Blue, Red (OnePlus), or Green (Emerald) accent colors.
- **Fullscreen Mobile:** Dynamic viewport units (dvh/dvw) for seamless mobile experience.
- **Success Indicators:** Real-time visual feedback (toasts) for all logging actions.
- **Material 3 Theme:** Expressive Dark theme with dynamic semantic colors (`primary`, `tertiary`, `error`) for optimal readability and aesthetics.
