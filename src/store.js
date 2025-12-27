import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
    persist(
        (set, get) => ({
            // Core State
            currentOdo: 10000,
            serviceDate: null,
            lastRideDate: null,
            rides: [],

            // Onboarding State
            hasSeenWelcome: false,

            // Maintenance State
            lastLubeOdo: 10000,
            serviceLog: [],

            // Fuel State
            fuelLog: [], // { date, odo, liters, cost }

            // Core Actions
            setCurrentOdo: (odo) => set({ currentOdo: odo }),
            setServiceDate: (date) => set({ serviceDate: date }),
            setHasSeenWelcome: (val) => set({ hasSeenWelcome: val }),

            logRide: (distance) => {
                const state = get();
                const newOdo = state.currentOdo + distance;
                const today = new Date().toISOString();

                const newRide = {
                    id: Date.now(),
                    date: today,
                    distance,
                    odometer: newOdo,
                };

                set({
                    currentOdo: newOdo,
                    lastRideDate: today,
                    rides: [newRide, ...state.rides].slice(0, 50),
                });
            },

            // Maintenance Actions
            logLube: () => {
                set({ lastLubeOdo: get().currentOdo });
            },

            addServiceEntry: (entry) => {
                set({
                    serviceLog: [{ id: Date.now(), date: new Date().toISOString(), ...entry }, ...get().serviceLog]
                });
            },

            // Fuel Actions
            logFuel: (liters, cost) => {
                const entry = {
                    id: Date.now(),
                    date: new Date().toISOString(),
                    odo: get().currentOdo,
                    liters,
                    cost
                };
                set({ fuelLog: [entry, ...get().fuelLog].slice(0, 50) });
            },

            // Selectors & Computed Logic
            getBatteryHealth: () => {
                const { lastRideDate } = get();
                if (!lastRideDate) return 0;

                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const lastRide = new Date(lastRideDate);
                lastRide.setHours(0, 0, 0, 0);

                if (lastRide.getTime() === today.getTime()) return 100;

                const daysSince = Math.floor((today.getTime() - lastRide.getTime()) / (1000 * 60 * 60 * 24));
                return Math.max(0, 100 - (daysSince * 5));
            },

            getChainHealth: () => {
                const { currentOdo, lastLubeOdo } = get();
                const kmSinceLube = currentOdo - lastLubeOdo;
                // Lube recommended every 500km
                return Math.max(0, Math.min(100, 100 - (kmSinceLube / 500) * 100));
            },

            getDaysRemaining: () => {
                const { serviceDate } = get();
                const startPoint = serviceDate ? new Date(serviceDate) : new Date();

                const targetDate = new Date(startPoint);
                targetDate.setDate(targetDate.getDate() + 90);

                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const remaining = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                return Math.max(0, remaining);
            },

            getAverageFE: () => {
                const { fuelLog } = get();
                if (fuelLog.length < 2) return 0;

                // Simple FE calculation: distance between last two refuels / liters of the later refuel
                const latest = fuelLog[0];
                const previous = fuelLog[1];
                const distance = latest.odo - previous.odo;
                if (distance <= 0) return 0;

                return (distance / latest.liters).toFixed(1);
            }
        }),
        {
            name: 'ride-the-bike-storage',
        }
    )
);
