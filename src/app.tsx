import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    ChevronRight,
    History,
    Bike,
    Activity,
    MapPin,
    TrendingDown
} from 'lucide-react';
import { useStore } from './store';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { WelcomeOverlay } from './components/WelcomeOverlay';
import { MaintenanceModule } from './components/MaintenanceModule';
import { FuelModule } from './components/FuelModule';
import { TyreModule } from './components/TyreModule';
import { WeatherModule } from './components/WeatherModule';
import { ChecklistModule } from './components/ChecklistModule';
import { BottomActions } from './components/BottomActions';
import { SettingsModal } from './components/SettingsModal';

function cn(...inputs: any[]) {
    return twMerge(clsx(inputs));
}

export function App() {
    const {
        currentOdo,
        baseOdo,
        targetOdo,
        lastRideDate,
        rides,
        hasSeenWelcome,
        setHasSeenWelcome,
        setServiceDueDate,
        getBatteryHealth,
        getBatteryMessage,
        getDaysRemaining,
        showLubeTracker,
        updateWeather
    } = useStore();

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [batteryHealth, setBatteryHealth] = useState(100);
    const [batteryMessage, setBatteryMessage] = useState(getBatteryMessage());

    useEffect(() => {
        setBatteryHealth(getBatteryHealth());
        setBatteryMessage(getBatteryMessage());

        // Fetch weather if available
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
                updateWeather(pos.coords.latitude, pos.coords.longitude);
            }, (err) => {
                console.warn("Geolocation denied", err);
            });
        }

        const interval = setInterval(() => {
            setBatteryHealth(getBatteryHealth());
            setBatteryMessage(getBatteryMessage());
        }, 60000);
        return () => clearInterval(interval);
    }, [getBatteryHealth, getBatteryMessage, lastRideDate]);

    const denominator = targetOdo - baseOdo;
    const progress = denominator > 0
        ? Math.max(0, Math.min(100, ((currentOdo - baseOdo) / denominator) * 100))
        : 100;

    const daysRemaining = getDaysRemaining();
    const dailyTarget = daysRemaining > 0 ? (targetOdo - currentOdo) / daysRemaining : 0;

    const handleSetSettings = () => {
        setIsSettingsOpen(true);
    };

    const totalRidesThisWeek = rides.filter(ride => {
        const rideDate = new Date(ride.date);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return rideDate >= weekAgo;
    }).length;

    return (
        <div className="min-h-screen bg-oled-black text-white font-dashboard selection:bg-pulsar-blue/30 p-4 pb-32">
            <AnimatePresence>
                {!hasSeenWelcome && (
                    <WelcomeOverlay onComplete={() => setHasSeenWelcome(true)} />
                )}
            </AnimatePresence>

            <div className="max-w-md mx-auto space-y-6">
                {/* Header */}
                <header className="flex items-center justify-between mb-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3"
                    >
                        <div className="p-2.5 bg-pulsar-blue/10 rounded-2xl border border-pulsar-blue/20 shadow-[0_0_20px_rgba(0,82,204,0.1)]">
                            <Bike className="w-6 h-6 text-pulsar-blue" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-glow-pulsar">
                                RideTheBike
                            </h1>
                            <p className="text-[10px] text-oled-gray-400 uppercase tracking-widest font-bold opacity-70">
                                Pulsar Edition
                            </p>
                        </div>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={handleSetSettings}
                        className="p-2.5 bg-white/5 rounded-2xl border border-white/5 transition-all hover:bg-white/10 active:scale-95"
                    >
                        <Calendar className="w-5 h-5 text-oled-gray-400" />
                    </motion.button>
                </header>

                {/* Main Odometer Card */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden bg-white/[0.03] rounded-[2rem] p-7 border border-white/5 backdrop-blur-md"
                >
                    <div className="flex justify-between items-start mb-6">
                        <div className="space-y-1.5">
                            <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black flex items-center gap-2">
                                <Activity className="w-3.5 h-3.5" /> Odometer
                            </span>
                            <div className="text-5xl font-bold tracking-tighter text-pulsar-blue text-glow-pulsar">
                                {Math.floor(currentOdo).toLocaleString()}<span className="text-2xl font-medium opacity-40 ml-1">km</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden shadow-inner">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1.5, ease: "circOut" }}
                                className="bg-pulsar-blue h-full rounded-full shadow-[0_0_20px_rgba(0,82,204,0.6)]"
                            />
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-black tracking-widest text-white/20">
                            <span>{progress.toFixed(1)}% SERVICE PROGRESS</span>
                            <span className="text-pulsar-blue/60">{(targetOdo - currentOdo).toLocaleString()} KM TO GO</span>
                        </div>
                    </div>
                </motion.section>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <motion.section
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/[0.03] rounded-3xl p-5 border border-white/5"
                    >
                        <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black flex items-center gap-2 mb-3">
                            <TrendingDown className="w-3.5 h-3.5 text-warning-orange" /> Battery
                        </span>
                        <div className={cn(
                            "text-3xl font-bold tracking-tighter",
                            batteryHealth > 50 ? "text-pulsar-blue text-glow-pulsar" : "text-warning-orange text-glow-warning"
                        )}>
                            {batteryHealth}%
                        </div>
                        <div className="text-[9px] text-white/20 font-bold mt-2 uppercase tracking-tight">
                            {batteryMessage}
                        </div>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/[0.03] rounded-3xl p-5 border border-white/5"
                    >
                        <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black flex items-center gap-2 mb-3">
                            <ChevronRight className="w-3.5 h-3.5 text-pulsar-blue" /> Run-Rate
                        </span>
                        <div className="text-3xl font-bold tracking-tighter text-pulsar-blue text-glow-pulsar">
                            {dailyTarget > 0 ? dailyTarget.toFixed(1) : '0'} <span className="text-sm font-medium opacity-40">km/d</span>
                        </div>
                        <div className="text-[9px] text-white/20 font-bold mt-2 uppercase tracking-tight">
                            Daily Target for {daysRemaining} days
                        </div>
                    </motion.section>
                </div>

                {/* Advanced Maintenance */}
                {showLubeTracker && <MaintenanceModule />}
                <FuelModule />
                <WeatherModule />
                <TyreModule />
                <ChecklistModule />

                {/* Recent History */}
                {rides.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center justify-between px-2">
                            <h2 className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] flex items-center gap-2">
                                <History className="w-4 h-4" /> Activity
                            </h2>
                            <span className="text-[10px] font-black text-pulsar-blue uppercase tracking-widest">
                                {totalRidesThisWeek}/3 WEEKLY RIDES
                            </span>
                        </div>

                        <div className="space-y-3">
                            {rides.slice(0, 3).map((ride) => (
                                <div
                                    key={ride.id}
                                    className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/5"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-pulsar-blue/10 rounded-xl">
                                            <MapPin className="w-4 h-4 text-pulsar-blue" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold">Ride Logged</div>
                                            <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest">
                                                {new Date(ride.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-pulsar-blue">+{ride.distance} km</div>
                                        <div className="text-[10px] text-white/20 font-bold tracking-tighter">{ride.odometer.toLocaleString()} total</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                )}
            </div>

            <BottomActions />

            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />
        </div>
    );
}
