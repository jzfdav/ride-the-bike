import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// --- Constants ---

export const MAINTENANCE_CONFIG = {
	CHAIN_LUBE_THRESHOLD: 500, // KM
	BATTERY_DRAIN_PER_DAY: 5, // %
	FUEL_LOG_LIMIT: 50,
	RIDE_LOG_LIMIT: 50,
};

// --- Schemas ---

export const RideSchema = z.object({
	id: z.number(),
	date: z.string(),
	distance: z.number(),
	odometer: z.number(),
});
export type Ride = z.infer<typeof RideSchema>;

export const FuelEntrySchema = z.object({
	id: z.number(),
	date: z.string(),
	odo: z.number(),
	liters: z.number(),
	cost: z.number(),
});
export type FuelEntry = z.infer<typeof FuelEntrySchema>;

export const BikeStoreStateSchema = z.object({
	currentOdo: z.number(),
	baseOdo: z.number(),
	targetOdo: z.number(),
	bikeModel: z.string(),
	serviceDueDate: z.string().nullable(),
	lastRideDate: z.string().nullable(),
	rides: z.array(RideSchema),
	hasSeenWelcome: z.boolean(),
	lastLubeOdo: z.number(),
	fuelLog: z.array(FuelEntrySchema),
	fuelBars: z.number().min(0).max(12),
	tyrePressure: z.object({
		front: z.number().nullable(),
		rear: z.number().nullable(),
		lastUpdated: z.string().nullable(),
	}),
	checklist: z.array(
		z.object({
			id: z.string(),
			text: z.string(),
			checked: z.boolean(),
		}),
	),
	showLubeTracker: z.boolean(),
	showFuelTracker: z.boolean(),
	showTyreTracker: z.boolean(),
	showChecklist: z.boolean(),
	lastFuelPrice: z.number().nullable(),
	activeHelp: z
		.object({
			title: z.string(),
			content: z.string(),
		})
		.nullable(),
});

export type BikeStoreState = z.infer<typeof BikeStoreStateSchema>;

export interface BikeStoreActions {
	setShowLubeTracker: (show: boolean) => void;
	setShowFuelTracker: (show: boolean) => void;
	setShowTyreTracker: (show: boolean) => void;
	setShowChecklist: (show: boolean) => void;
	setLastFuelPrice: (price: number | null) => void;
	setActiveHelp: (help: { title: string; content: string } | null) => void;
	setCurrentOdo: (odo: number) => void;
	setBaseOdo: (odo: number) => void;
	setTargetOdo: (odo: number) => void;
	setBikeModel: (model: string) => void;
	setServiceDueDate: (date: string | null) => void;
	setHasSeenWelcome: (val: boolean) => void;
	logRide: (distance: number) => void;
	logLube: () => void;
	logFuel: (liters: number, cost: number) => void;
	setFuelBars: (bars: number) => void;
	setTyrePressure: (front: number | null, rear: number | null) => void;
	toggleChecklistItem: (id: string) => void;
	resetChecklist: () => void;
}

export interface BikeStoreSelectors {
	getBatteryHealth: () => number;
	getBatteryMessage: () => string;
	getChainHealth: () => number;
	getDaysRemaining: () => number;
	getAverageFE: () => string | number;
}

export type BikeStore = BikeStoreState & BikeStoreActions & BikeStoreSelectors;

export const useStore = create<BikeStore>()(
	persist(
		immer((set, get) => ({
			// Core State
			currentOdo: 10000,
			baseOdo: 10000,
			targetOdo: 13000,
			bikeModel: "My Bike",
			serviceDueDate: null,
			lastRideDate: null,
			rides: [],
			hasSeenWelcome: false,
			lastLubeOdo: 10000,
			fuelLog: [],
			fuelBars: 12,
			tyrePressure: {
				front: null,
				rear: null,
				lastUpdated: null,
			},
			checklist: [
				{ id: "gear", text: "Helmet & Safety Gear", checked: false },
				{ id: "fluids", text: "Oil & Brake Fluid Levels", checked: false },
				{ id: "chain", text: "Chain Tension & Slack", checked: false },
				{ id: "lights", text: "Headlight & Indicators", checked: false },
			],
			showLubeTracker: true,
			showFuelTracker: true,
			showTyreTracker: true,
			showChecklist: true,
			lastFuelPrice: null,
			activeHelp: null,

			// Actions
			setActiveHelp: (help) =>
				set((state) => {
					state.activeHelp = help;
				}),
			setCurrentOdo: (odo) =>
				set((state) => {
					state.currentOdo = Math.max(0, odo);
				}),
			setBaseOdo: (base) =>
				set((state) => {
					state.baseOdo = Math.max(0, base);
				}),
			setTargetOdo: (target) =>
				set((state) => {
					state.targetOdo = Math.max(0, target);
				}),
			setBikeModel: (model) =>
				set((state) => {
					state.bikeModel = model.trim() || "My Bike";
				}),
			setServiceDueDate: (date) =>
				set((state) => {
					state.serviceDueDate = date;
				}),
			setHasSeenWelcome: (val) =>
				set((state) => {
					state.hasSeenWelcome = val;
				}),

			logRide: (distance) => {
				const today = new Date().toISOString();
				const safeDistance = Math.max(0, distance);
				set((state) => {
					state.currentOdo += safeDistance;
					state.lastRideDate = today;
					state.rides.unshift({
						id: Date.now(),
						date: today,
						distance: safeDistance,
						odometer: state.currentOdo,
					});
					// Sort by date descending and slice
					state.rides.sort(
						(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
					);
					state.rides = state.rides.slice(0, MAINTENANCE_CONFIG.RIDE_LOG_LIMIT);
				});
			},

			logLube: () => {
				set((state) => {
					state.lastLubeOdo = state.currentOdo;
				});
			},

			logFuel: (liters, cost) => {
				const safeLiters = Math.max(0.1, liters);
				const safeCost = Math.max(0, cost);
				set((state) => {
					state.fuelLog.unshift({
						id: Date.now(),
						date: new Date().toISOString(),
						odo: state.currentOdo,
						liters: safeLiters,
						cost: safeCost,
					});
					// Sort by date descending and slice
					state.fuelLog.sort(
						(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
					);
					state.fuelLog = state.fuelLog.slice(
						0,
						MAINTENANCE_CONFIG.FUEL_LOG_LIMIT,
					);
					state.fuelBars = 12;
				});
			},

			setFuelBars: (bars) =>
				set((state) => {
					state.fuelBars = Math.max(0, Math.min(12, bars));
				}),

			setTyrePressure: (front, rear) =>
				set((state) => {
					state.tyrePressure.front = front;
					state.tyrePressure.rear = rear;
					state.tyrePressure.lastUpdated = new Date().toISOString();
				}),

			toggleChecklistItem: (id) =>
				set((state) => {
					const item = state.checklist.find((i) => i.id === id);
					if (item) item.checked = !item.checked;
				}),

			resetChecklist: () =>
				set((state) => {
					for (const item of state.checklist) {
						item.checked = false;
					}
				}),

			setShowLubeTracker: (show) =>
				set((state) => {
					state.showLubeTracker = show;
				}),
			setShowFuelTracker: (show) =>
				set((state) => {
					state.showFuelTracker = show;
				}),
			setShowTyreTracker: (show) =>
				set((state) => {
					state.showTyreTracker = show;
				}),
			setShowChecklist: (show) =>
				set((state) => {
					state.showChecklist = show;
				}),
			setLastFuelPrice: (price) =>
				set((state) => {
					state.lastFuelPrice = price;
				}),

			// Selectors
			getBatteryHealth: () => {
				const { lastRideDate } = get();
				if (!lastRideDate) return 100;

				const today = new Date();
				today.setHours(0, 0, 0, 0);
				const lastRide = new Date(lastRideDate);
				lastRide.setHours(0, 0, 0, 0);

				if (lastRide.getTime() >= today.getTime()) return 100;

				const daysSince = Math.floor(
					(today.getTime() - lastRide.getTime()) / (1000 * 60 * 60 * 24),
				);
				return Math.max(
					0,
					100 - daysSince * MAINTENANCE_CONFIG.BATTERY_DRAIN_PER_DAY,
				);
			},

			getBatteryMessage: () => {
				const { lastRideDate } = get();
				if (!lastRideDate) return "Optimal (New)";

				const today = new Date();
				today.setHours(0, 0, 0, 0);
				const lastRide = new Date(lastRideDate);
				lastRide.setHours(0, 0, 0, 0);

				const daysSince = Math.floor(
					(today.getTime() - lastRide.getTime()) / (1000 * 60 * 60 * 24),
				);
				if (daysSince === 0) return "Optimal (Rode today)";
				return `${daysSince} day${daysSince > 1 ? "s" : ""} idle`;
			},

			getChainHealth: () => {
				const { currentOdo, lastLubeOdo } = get();
				const kmSinceLube = currentOdo - lastLubeOdo;
				return Math.max(
					0,
					Math.min(
						100,
						100 - (kmSinceLube / MAINTENANCE_CONFIG.CHAIN_LUBE_THRESHOLD) * 100,
					),
				);
			},

			getDaysRemaining: () => {
				const { serviceDueDate } = get();
				if (!serviceDueDate) return 0;

				const today = new Date();
				today.setHours(0, 0, 0, 0);
				const target = new Date(serviceDueDate);
				target.setHours(0, 0, 0, 0);

				const remaining = Math.round(
					(target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
				);
				return Math.max(0, remaining);
			},

			getAverageFE: () => {
				const { fuelLog } = get();
				if (fuelLog.length < 2) return 0;

				let totalDistance = 0;
				let totalLiters = 0;

				// Iterate from the second-to-last entry up to the first,
				// comparing each entry with the one immediately after it (which is older)
				for (let i = 0; i < fuelLog.length - 1; i++) {
					const current = fuelLog[i]; // More recent entry
					const prev = fuelLog[i + 1]; // Older entry
					const diff = current.odo - prev.odo;
					if (diff > 0 && current.liters > 0) {
						// Ensure positive distance and liters
						totalDistance += diff;
						totalLiters += current.liters;
					}
				}

				if (totalLiters === 0 || totalDistance === 0) return 0;
				return parseFloat((totalDistance / totalLiters).toFixed(2));
			},
		})),
		{
			name: "ride-the-bike-storage",
			onRehydrateStorage: () => (state) => {
				if (state) {
					const result = BikeStoreStateSchema.safeParse(state);
					if (!result.success) {
						console.error(
							"Store hydration validation failed:",
							result.error.format(),
						);
					}
				}
			},
		},
	),
);
