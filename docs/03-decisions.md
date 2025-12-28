# Architecture & Product Decisions

Record significant decisions made during development.

1. **React over Preact**
   - **Date:** Dec 2025
   - **Decision:** Use React 18 instead of Preact.
   - **Rationale:** While Preact is smaller, React 18 provides better ecosystem compatibility and features like Suspense/Transitions which align with the "Premium UX" goal.
   - **Alternatives:** Preact, Vue, Svelte.

2. **Zustand for State Management**
   - **Date:** Dec 2025
   - **Decision:** Use Zustand with `persist` middleware.
   - **Rationale:** Minimal boilerplate, easy-to-use selectors, and built-in persistence to `localStorage` satisfy the offline-first requirement perfectly.
   - **Alternatives:** Redux Toolkit, Context API, Jotai.

3. **User-Configurable Service Deadlines**
   - **Date:** Dec 2025
   - **Decision:** Allow users to set a specific "Service Due Date" instead of a fixed 90-day window.
   - **Rationale:** Provides better utility as users can sync the app with their actual service schedule.
   - **Alternatives:** Fixed 30/60/90 day increments.
4. **Singleton Help System**
   - **Date:** Dec 2025
   - **Decision:** Implement a global `activeHelp` state for a single, shared help modal.
   - **Rationale:** Prevents "modal stacking" and ensures high-contrast z-index management, keeping the UI clean and scannable.

5. **Configurable Dashboard (Hardening)**
   - **Date:** Dec 2025
   - **Decision:** Make Fuel, Tyre, Lube, and Checklist modules toggleable in Settings.
   - **Rationale:** Empowers the user to streamline their instrument cluster based on their own bike's hardware and maintenance habits.
