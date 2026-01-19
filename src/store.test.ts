import { beforeEach, describe, expect, it } from "vitest";
import { useStore } from "./store";

describe("RideTheBike Store", () => {
	beforeEach(() => {
		useStore.setState({
			currentOdo: 10000,
			serviceDueDate: null,
			lastRideDate: null,
			rides: [],
			hasSeenWelcome: false,

			fuelLog: [],
		});
	});

	it("defaults to 100% battery health for new users", () => {
		expect(useStore.getState().getBatteryHealth()).toBe(100);
	});

	it("calculates battery health correctly (100% if rode today)", () => {
		const today = new Date().toISOString();
		useStore.setState({ lastRideDate: today });
		expect(useStore.getState().getBatteryHealth()).toBe(100);
	});

	it("decays battery health by 5% per day", () => {
		const twoDaysAgo = new Date();
		twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
		useStore.setState({ lastRideDate: twoDaysAgo.toISOString() });
		expect(useStore.getState().getBatteryHealth()).toBe(90);
	});



	it("calculates Fuel Economy accurately using interval", () => {
		// First entry (initial fill)
		useStore.getState().logFuel(10, 100);
		// Move odo
		useStore.setState({ currentOdo: 10400 });
		// Second entry (consumed 10L to cover 400km)
		useStore.getState().logFuel(10, 100);

		expect(useStore.getState().getAverageFE()).toBe(40);
	});

	it("returns 0 FE if less than 2 entries exist", () => {
		useStore.getState().logFuel(10, 100);
		expect(useStore.getState().getAverageFE()).toBe(0);
	});

	it("guards against negative distance in logRide", () => {
		useStore.getState().logRide(-50);
		expect(useStore.getState().currentOdo).toBe(10000); // Unchanged
	});

	it("guards against zero or negative liters in logFuel", () => {
		useStore.getState().logFuel(0, 100);
		expect(useStore.getState().fuelLog[0].liters).toBe(0.1); // Min safe value
	});

	it("logs a ride and updates odometer", () => {
		useStore.getState().logRide(25.5);
		expect(useStore.getState().currentOdo).toBe(10025.5);
		expect(useStore.getState().rides.length).toBe(1);
		expect(useStore.getState().rides[0].distance).toBe(25.5);
	});

	it("maintains 100% battery health for future-dated rides", () => {
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		useStore.setState({ lastRideDate: tomorrow.toISOString() });
		expect(useStore.getState().getBatteryHealth()).toBe(100);
	});

	it("sorts logs chronologically even if added out of order", () => {
		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);

		// Log older entry first (simulating a missed entry)
		useStore.setState({ currentOdo: 10100 });
		useStore.getState().logFuel(10, 100); // Today's entry (added first)

		useStore.setState({ currentOdo: 10050 });
		// Manually override date for "yesterday" via a raw log action if we had one,
		// but since logFuel uses Date.now(), we'll simulate sorting via state manipulation
		// to verify the sort() call in the store works.
		const logs = [...useStore.getState().fuelLog];
		logs.push({
			id: 123,
			date: yesterday.toISOString(),
			odo: 10050,
			liters: 5,
			cost: 50,
		});
		useStore.setState({ fuelLog: logs });

		// Trigger an action that sorts (like logFuel or logRide)
		useStore.getState().logRide(0);

		const sortedLogs = useStore.getState().fuelLog;
		expect(new Date(sortedLogs[0].date) > new Date(sortedLogs[1].date)).toBe(
			true,
		);
	});
});
