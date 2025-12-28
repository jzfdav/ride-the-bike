# AI Context: RideTheBike Developer Instructions

## Project Personality
This is a high-performance, minimalist PWA for a software developer. No fluff. The UI should feel like a premium vehicle instrument cluster.

## Tech Stack
- **Framework:** React 18 (using Vite)
- **Styling:** Tailwind CSS (Focus on OLED True Black)
- **Deployment:** GitHub Pages
- **State:** LocalStorage (Offline-first approach)

## Technical Constraints
- Use React Hooks (`useState`, `useEffect`, `useMemo`).
- Implement `vite-plugin-pwa` for manifest and service worker.
- Avoid external UI libraries; build custom, lightweight Tailwind components.
- Ensure all components look perfect on a OnePlus 13 (High DPI, OLED).

## Domain Logic
- "Battery Health" is a virtual metric based on time elapsed since the last log.
- The "Service Target" is a fixed goal of 13,000km (next service interval).
- Current starting Odo: 10,000km (last service was at 10,000km).
- Target completion: 90 days from last service date (or project start if service date not set).