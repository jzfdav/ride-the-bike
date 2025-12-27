import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Activity, Save, Target, Droplets } from 'lucide-react';
import { useStore } from '../store';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const {
        serviceDate, setServiceDate,
        currentOdo, setCurrentOdo,
        baseOdo, setBaseOdo,
        targetOdo, setTargetOdo,
        showLubeTracker, setShowLubeTracker
    } = useStore();

    const [tempDate, setTempDate] = useState(serviceDate ? serviceDate.split('T')[0] : new Date().toISOString().split('T')[0]);
    const [tempOdo, setTempOdo] = useState(currentOdo.toString());
    const [tempBase, setTempBase] = useState(baseOdo.toString());
    const [tempTarget, setTempTarget] = useState(targetOdo.toString());
    const [tempShowLube, setTempShowLube] = useState(showLubeTracker);

    const handleSave = () => {
        const date = new Date(tempDate);
        if (!isNaN(date.getTime())) {
            setServiceDate(date.toISOString());
        }

        const odo = parseFloat(tempOdo);
        if (!isNaN(odo)) setCurrentOdo(odo);

        const base = parseFloat(tempBase);
        if (!isNaN(base)) setBaseOdo(base);

        const target = parseFloat(tempTarget);
        if (!isNaN(target)) setTargetOdo(target);

        setShowLubeTracker(tempShowLube);

        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-oled-black/80 backdrop-blur-sm z-[60]"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.95 }}
                        className="fixed bottom-0 left-0 right-0 z-[70] p-6 max-w-md mx-auto"
                    >
                        <div className="bg-oled-gray-100 rounded-[2.5rem] border border-white/10 p-8 shadow-2xl">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-oled-gray-400">Challenge Settings</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-5 h-5 text-oled-gray-400" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Challenge Start Date */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-pulsar-blue flex items-center gap-2">
                                        <Calendar className="w-3.5 h-3.5" /> Start Date (Last Service)
                                    </label>
                                    <input
                                        type="date"
                                        value={tempDate}
                                        onChange={(e) => setTempDate(e.target.value)}
                                        className="w-full bg-oled-black border-2 border-white/5 rounded-2xl px-5 py-4 text-lg font-bold text-white focus:outline-none focus:border-pulsar-blue/50 transition-colors color-scheme-dark"
                                    />
                                    <p className="text-[9px] text-oled-gray-400 font-medium">This starts your 90-day challenge window.</p>
                                </div>

                                {/* Starting Odometer */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-pulsar-blue flex items-center gap-2">
                                            <Activity className="w-3.5 h-3.5" /> Base (KM)
                                        </label>
                                        <input
                                            type="number"
                                            value={tempBase}
                                            onChange={(e) => setTempBase(e.target.value)}
                                            className="w-full bg-oled-black border-2 border-white/5 rounded-2xl px-5 py-4 text-lg font-bold text-white focus:outline-none focus:border-pulsar-blue/50 transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-pulsar-blue flex items-center gap-2">
                                            <Target className="w-3.5 h-3.5" /> Target (KM)
                                        </label>
                                        <input
                                            type="number"
                                            value={tempTarget}
                                            onChange={(e) => setTempTarget(e.target.value)}
                                            className="w-full bg-oled-black border-2 border-white/5 rounded-2xl px-5 py-4 text-lg font-bold text-white focus:outline-none focus:border-pulsar-blue/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Current Odometer */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-pulsar-blue flex items-center gap-2">
                                        <Activity className="w-3.5 h-3.5" /> Current Odometer (KM)
                                    </label>
                                    <input
                                        type="number"
                                        value={tempOdo}
                                        onChange={(e) => setTempOdo(e.target.value)}
                                        className="w-full bg-oled-black border-2 border-white/5 rounded-2xl px-5 py-4 text-lg font-bold text-white focus:outline-none focus:border-pulsar-blue/50 transition-colors"
                                        placeholder="e.g. 10450"
                                    />
                                </div>

                                {/* Feature Toggles */}
                                <div className="space-y-4 pt-2">
                                    <div className="flex items-center justify-between p-4 bg-oled-black/40 rounded-2xl border border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-pulsar-blue/10 rounded-xl">
                                                <Droplets className="w-5 h-5 text-pulsar-blue" />
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-white">Chain Lube Tracker</div>
                                                <div className="text-[9px] text-oled-gray-400 font-medium">Toggle visibility on dashboard</div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setTempShowLube(!tempShowLube)}
                                            className={cn(
                                                "w-12 h-6 rounded-full transition-all duration-300 relative",
                                                tempShowLube ? "bg-pulsar-blue" : "bg-white/10"
                                            )}
                                        >
                                            <motion.div
                                                animate={{ x: tempShowLube ? 26 : 4 }}
                                                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
                                            />
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={handleSave}
                                    className="w-full bg-pulsar-blue text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-pulsar-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    <Save className="w-5 h-5" /> SAVE SETTINGS
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
