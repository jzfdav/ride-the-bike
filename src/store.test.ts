import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from './store';

describe('RideTheBike Store', () => {
    beforeEach(() => {
        useStore.setState({
            currentOdo: 10000,
            serviceDate: null,
            lastRideDate: null,
            rides: [],
            hasSeenWelcome: false,
            lastLubeOdo: 10000,
            serviceLog: [],
            fuelLog: []
        });
    });

    it('defaults to 100% battery health for new users', () => {
        expect(useStore.getState().getBatteryHealth()).toBe(100);
    });

    it('calculates battery health correctly (100% if rode today)', () => {
        const today = new Date().toISOString();
        useStore.setState({ lastRideDate: today });
        expect(useStore.getState().getBatteryHealth()).toBe(100);
    });

    it('decays battery health by 5% per day', () => {
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
        useStore.setState({ lastRideDate: twoDaysAgo.toISOString() });
        expect(useStore.getState().getBatteryHealth()).toBe(90);
    });

    it('calculates chain health correctly (50% after 250km)', () => {
        useStore.setState({ currentOdo: 10250, lastLubeOdo: 10000 });
        expect(useStore.getState().getChainHealth()).toBe(50);
    });

    it('resets chain health after logLube', () => {
        useStore.setState({ currentOdo: 10500, lastLubeOdo: 10000 });
        expect(useStore.getState().getChainHealth()).toBe(0);
        useStore.getState().logLube();
        expect(useStore.getState().getChainHealth()).toBe(100);
    });

    it('calculates Fuel Economy accurately', () => {
        useStore.getState().logFuel(10, 100);
        useStore.setState({ currentOdo: 10400 });
        useStore.getState().logFuel(10, 100);

        expect(useStore.getState().getAverageFE()).toBe("40.0");
    });

    it('logs a ride and updates odometer', () => {
        useStore.getState().logRide(25.5);
        expect(useStore.getState().currentOdo).toBe(10025.5);
        expect(useStore.getState().rides.length).toBe(1);
        expect(useStore.getState().rides[0].distance).toBe(25.5);
    });

    it('manages fuel bars correctly', () => {
        useStore.getState().setFuelBars(5);
        expect(useStore.getState().fuelBars).toBe(5);

        // Refuel resets bars to 12
        useStore.getState().logFuel(10, 500);
        expect(useStore.getState().fuelBars).toBe(12);
    });
});
