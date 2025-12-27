# RideTheBike Project Standards

This document outlines the strict quality guardrails for the RideTheBike project. Refer to this before and after every change.

## ✅ Dos

### 1. Premium UX First
- **One-Handed Ergonomics**: Keep primary interaction buttons (Log, Save, Refuel) in the lower third of the screen.
- **Micro-animations**: Use Framer Motion for all state transitions (entrance, exit, metric updates).
- **Typography**: Strictly use the "Outfit" font family with appropriate weights.

### 2. Engineering Excellence
- **Unit Testing**: Every piece of business logic (math, date calculations, store updates) MUST have a corresponding Vitest suite.
- **Zero Regressions**: Before notifying the user, run `npm test` and manually verify that core features (Odometer, Battery) are unchanged.
- **Clean State**: Use Zustand for all persisted state. Avoid ad-hoc `localStorage` calls in components.
- **Modular Components**: Extract complex UI parts (Maintenance, Fuel, Welcome) into separate files in `src/components/`.

### 3. Documentation
- **Updated Artifacts**: Keep `task.md`, `implementation_plan.md`, and `walkthrough.md` updated as you work.

---

## ❌ Don'ts

### 1. Code Health
- **Dead Code**: Never leave unused imports, variables, or commented-out logic after a feature is completed.
- **Hardcoded Constants**: Avoid repeating "10,000" or "13,000" everywhere. Use the store or a constants file.
- **Type Bloat**: Avoid adding TypeScript syntax to `.jsx` files (keep it clean JSDoc or pure JS).

### 2. UI/UX
- **Cluttered Interface**: Do not overwhelm the user with all stats at once. Use a minimal, premium "Dashboard" aesthetic.
- **Plain Colors**: Never use basic browser colors. Use the curated OLED theme defined in `tailwind.config.js`.
- **Intrusive Overlays**: Don't show the Welcome Screen more than once. Use the `hasSeenWelcome` flag.
