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
			lastLubeOdo: 10000,
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

	it("calculates chain health correctly (50% after 250km)", () => {
		useStore.setState({ currentOdo: 10250, lastLubeOdo: 10000 });
		expect(useStore.getState().getChainHealth()).toBe(50);
	});

	it("resets chain health after logLube", () => {
		useStore.setState({ currentOdo: 10500, lastLubeOdo: 10000 });
		expect(useStore.getState().getChainHealth()).toBe(0);
		useStore.getState().logLube();
		expect(useStore.getState().getChainHealth()).toBe(100);
	});

	it("calculates Fuel Economy accurately using interval", () => {
		// First entry (initial fill)
		useStore.getState().logFuel(10, 100);
		// Move odo
		useStore.setState({ currentOdo: 10400 });
		// Second entry (consumed 10L to cover 400km)
		useStore.getState().logFuel(10, 100);

		expect(useStore.getState().getAverageFE()).toBe("40.0");
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
});
