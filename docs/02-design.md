# Design

## High-Level Architecture

The application is built as a lightweight, offline-first Progressive Web App (PWA).

- **Frontend Framework:** React 18 (Vite used for build orchestrating).
- **State Management:** Zustand with `persist` middleware for persistent local storage of all bike metrics.
- **Styling:** Tailwind CSS with a custom OLED-optimized theme.
- **Animations:** Framer Motion for high-quality micro-interactions.
- **Icons:** Lucide React for consistent dashboard iconography.

## Key Design Principles

1. **OLED First:** Every pixel counts. The background is `#000000` to maximize battery life on OLED displays and provide a premium "instrument cluster" feel.
2. **One-Handed Use:** Primary interaction points (Log, Save, Refuel) are positioned at the bottom of the screen.
3. **Information Density:** Use a dashboard aesthetic with high contrast and clear typography (Outfit) to make data scannable at a glance.
4. **Offline Resilience:** The app must be fully functional without an internet connection, using `localStorage` for all user data. External APIs (Weather) are treated as progressive enhancements.

## Component Structure

- **Core Components:** `app.tsx`, `store.ts`.
- **Feature Modules:** Self-contained components in `src/components/` (e.g., `FuelModule`, `TyreModule`, `WeatherModule`).
- **Overlays/Modals:** `WelcomeOverlay.tsx`, `SettingsModal.tsx`.
