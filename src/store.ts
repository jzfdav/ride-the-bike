import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Ride {
    id: number;
    date: string;
    distance: number;
    odometer: number;
}

export interface ServiceEntry {
    id: number;
    date: string;
    type: string;
    description: string;
}

export interface FuelEntry {
    id: number;
    date: string;
    odo: number;
    liters: number;
    cost: number;
}

export interface BikeStore {
    // Core State
    currentOdo: number;
    baseOdo: number;
    targetOdo: number;
    serviceDate: string | null;
    lastRideDate: string | null;
    rides: Ride[];

    // Onboarding State
    hasSeenWelcome: boolean;

    // Maintenance State
    lastLubeOdo: number;
    serviceLog: ServiceEntry[];

    // Fuel State
    fuelLog: FuelEntry[];
    fuelBars: number; // 0-12 segments

    // Tyre State
    tyrePressure: {
        front: number | null;
        rear: number | null;
        lastUpdated: string | null;
    };

    // Rider Insights
    weather: {
        temp: number | null;
        code: number | null;
        rainProb: number | null;
        lastUpdated: string | null;
    };
    aqi: {
        value: number | null;
        label: string | null;
    };
    checklist: {
        id: string;
        text: string;
        checked: boolean;
    }[];

    // Visibility State
    showLubeTracker: boolean;

    // Actions
    setCurrentOdo: (odo: number) => void;
    setBaseOdo: (odo: number) => void;
    setTargetOdo: (odo: number) => void;
    setServiceDate: (date: string | null) => void;
    setHasSeenWelcome: (val: boolean) => void;
    logRide: (distance: number) => void;
    logLube: () => void;
    addServiceEntry: (entry: Omit<ServiceEntry, 'id' | 'date'>) => void;
    logFuel: (liters: number, cost: number) => void;
    setFuelBars: (bars: number) => void;
    setTyrePressure: (front: number | null, rear: number | null) => void;
    updateWeather: (lat: number, lon: number) => Promise<void>;
    toggleChecklistItem: (id: string) => void;
    setShowLubeTracker: (val: boolean) => void;

    // Selectors/Computed
    getBatteryHealth: () => number;
    getBatteryMessage: () => string;
    getChainHealth: () => number;
    getDaysRemaining: () => number;
    getAverageFE: () => string | number;
}

export const useStore = create<BikeStore>()(
    persist(
        (set, get) => ({
            // Core State
            currentOdo: 10000,
            baseOdo: 10000,
            targetOdo: 13000,
            serviceDate: null,
            lastRideDate: null,
            rides: [],

            // Onboarding State
            hasSeenWelcome: false,

            // Maintenance State
            lastLubeOdo: 10000,
            serviceLog: [],

            // Fuel State
            fuelLog: [],
            fuelBars: 12,

            // Tyre State
            tyrePressure: {
                front: null,
                rear: null,
                lastUpdated: null
            },

            // Rider Insights
            weather: {
                temp: null,
                code: null,
                rainProb: null,
                lastUpdated: null
            },
            aqi: {
                value: null,
                label: null
            },
            checklist: [
                { id: 'tyres', text: 'Tyre Pressure & Tread', checked: false },
                { id: 'lights', text: 'Lights & Indicators', checked: false },
                { id: 'oil', text: 'Oil & Fluid Levels', checked: false },
                { id: 'stand', text: 'Side Stand Up', checked: false }
            ],

            // Visibility State
            showLubeTracker: false,

            // Core Actions
            setCurrentOdo: (odo) => set({ currentOdo: odo }),
            setBaseOdo: (odo) => set({ baseOdo: odo }),
            setTargetOdo: (odo) => set({ targetOdo: odo }),
            setServiceDate: (date) => set({ serviceDate: date }),
            setHasSeenWelcome: (val) => set({ hasSeenWelcome: val }),

            logRide: (distance) => {
                const state = get();
                const newOdo = state.currentOdo + distance;
                const today = new Date().toISOString();

                const newRide: Ride = {
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
                    serviceLog: [{
                        id: Date.now(),
                        date: new Date().toISOString(),
                        type: entry.type,
                        description: entry.description
                    }, ...get().serviceLog]
                });
            },

            // Fuel Actions
            logFuel: (liters, cost) => {
                const entry: FuelEntry = {
                    id: Date.now(),
                    date: new Date().toISOString(),
                    odo: get().currentOdo,
                    liters,
                    cost
                };
                set({
                    fuelLog: [entry, ...get().fuelLog].slice(0, 50),
                    fuelBars: 12 // Reset to full on refuel
                });
            },

            setFuelBars: (bars) => set({ fuelBars: Math.max(0, Math.min(12, bars)) }),

            setTyrePressure: (front, rear) => set({
                tyrePressure: {
                    front,
                    rear,
                    lastUpdated: new Date().toISOString()
                }
            }),

            updateWeather: async (lat, lon) => {
                try {
                    const [wRes, aRes] = await Promise.all([
                        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&hourly=precipitation_probability&forecast_days=1`),
                        fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi`)
                    ]);

                    const wData = await wRes.json();
                    const aData = await aRes.json();

                    const currentHour = new Date().getHours();
                    const rainProb = wData.hourly?.precipitation_probability?.[currentHour] || 0;

                    const aqiVal = aData.current.us_aqi;
                    let aqiLabel = "Good";
                    if (aqiVal > 50) aqiLabel = "Fair";
                    if (aqiVal > 100) aqiLabel = "Poor";
                    if (aqiVal > 200) aqiLabel = "Dangerous";

                    set({
                        weather: {
                            temp: Math.round(wData.current.temperature_2m),
                            code: wData.current.weather_code,
                            rainProb: rainProb,
                            lastUpdated: new Date().toISOString()
                        },
                        aqi: {
                            value: aqiVal,
                            label: aqiLabel
                        }
                    });
                } catch (e) {
                    console.error("Failed to fetch rider insights", e);
                }
            },

            toggleChecklistItem: (id) => set({
                checklist: get().checklist.map(item =>
                    item.id === id ? { ...item, checked: !item.checked } : item
                )
            }),

            setShowLubeTracker: (val) => set({ showLubeTracker: val }),

            // Selectors & Computed Logic
            getBatteryHealth: () => {
                const { lastRideDate } = get();
                if (!lastRideDate) return 100;

                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const lastRide = new Date(lastRideDate);
                lastRide.setHours(0, 0, 0, 0);

                if (lastRide.getTime() === today.getTime()) return 100;

                const daysSince = Math.floor((today.getTime() - lastRide.getTime()) / (1000 * 60 * 60 * 24));
                return Math.max(0, 100 - (daysSince * 5));
            },

            getBatteryMessage: () => {
                const { lastRideDate } = get();
                if (!lastRideDate) return "Optimal (New)";

                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const lastRide = new Date(lastRideDate);
                lastRide.setHours(0, 0, 0, 0);

                const daysSince = Math.floor((today.getTime() - lastRide.getTime()) / (1000 * 60 * 60 * 24));
                if (daysSince === 0) return "Optimal (Rode today)";
                return `${daysSince} day${daysSince > 1 ? 's' : ''} idle`;
            },

            getChainHealth: () => {
                const { currentOdo, lastLubeOdo } = get();
                const kmSinceLube = currentOdo - lastLubeOdo;
                // Lube recommended every 500km
                return Math.max(0, Math.min(100, 100 - (kmSinceLube / 500) * 100));
            },

            getDaysRemaining: () => {
                const { serviceDate } = get();
                if (!serviceDate) return 90;

                const startPoint = new Date(serviceDate);
                startPoint.setHours(0, 0, 0, 0);

                const targetDate = new Date(startPoint);
                targetDate.setDate(targetDate.getDate() + 90);
                targetDate.setHours(0, 0, 0, 0);

                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const remaining = Math.round((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                return Math.max(0, remaining);
            },

            getAverageFE: () => {
                const { fuelLog } = get();
                if (fuelLog.length < 2) return 0;

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
