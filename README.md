# RideTheBike

A gamified PWA to encourage frequent bike rides and maintain mechanical health.

## Intent

To reach 13,000 km in 3 months (from 10,000 km) by gamifying "mechanical sympathy." The app encourages frequent, short local rides to keep the machine "alive" and ready.

See `/docs/00-vision.md` for the full project vision.

## Tech Stack

- **Framework:** Preact (with Vite)
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
│   ├── app.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Tailwind CSS imports
├── docs/                # Project documentation
├── ai/                  # AI context and rules
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind with OLED theme
└── package.json
```

## Features

- **Odometer Progress:** Track progress from 10,000 → 13,000 km
- **Battery Health:** Virtual metric based on time since last ride (100% if rode today, -5% per day)
- **Daily Target:** Calculated based on remaining distance and days
- **OLED Theme:** True black background with Pulsar Neon Blue accents
