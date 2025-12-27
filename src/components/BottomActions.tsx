import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Bike, Fuel, Droplets, X } from 'lucide-react';
import { useStore } from '../store';
import { clsx } from 'clsx';

type FormType = 'ride' | 'fuel' | 'lube' | null;

export function BottomActions() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeForm, setActiveForm] = useState<FormType>(null);
    const [val1, setVal1] = useState(''); // distance or liters
    const [val2, setVal2] = useState(''); // cost

    const { logRide, logFuel, logLube, showLubeTracker } = useStore();

    const handleAction = (type: FormType) => {
        if (type === 'lube') {
            logLube();
            setIsOpen(false);
            return;
        }
        setActiveForm(type);
    };

    const handleSubmit = () => {
        if (activeForm === 'ride') {
            const d = parseFloat(val1);
            if (d > 0) logRide(d);
        } else if (activeForm === 'fuel') {
            const l = parseFloat(val1);
            const c = parseFloat(val2);
            if (l > 0 && c > 0) logFuel(l, c);
        }
        closeForm();
    };

    const closeForm = () => {
        setActiveForm(null);
        setVal1('');
        setVal2('');
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-6 left-0 right-0 z-40 px-6 pointer-events-none">
            <div className="max-w-md mx-auto relative pointer-events-auto">
                <AnimatePresence>
                    {isOpen && !activeForm && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className={clsx(
                                "absolute bottom-20 left-0 right-0 grid gap-3",
                                showLubeTracker ? "grid-cols-3" : "grid-cols-2"
                            )}
                        >
                            {[
                                { id: 'ride' as const, label: 'Ride', icon: Bike, color: 'bg-pulsar-blue', show: true },
                                { id: 'fuel' as const, label: 'Fuel', icon: Fuel, color: 'bg-amber-600', show: true },
                                { id: 'lube' as const, label: 'Lube', icon: Droplets, color: 'bg-indigo-600', show: showLubeTracker }
                            ].filter(btn => btn.show).map((btn) => (
                                <button
                                    key={btn.id}
                                    onClick={() => handleAction(btn.id)}
                                    className={`${btn.color} p-4 rounded-2xl flex flex-col items-center gap-2 shadow-xl border border-white/10`}
                                >
                                    <btn.icon className="w-6 h-6 text-white" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/90">{btn.label}</span>
                                </button>
                            ))}
                        </motion.div>
                    )}

                    {activeForm && (
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 100 }}
                            className="absolute bottom-0 left-0 right-0 bg-oled-gray-100 p-6 rounded-3xl border border-pulsar-blue/30 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-oled-gray-400">
                                    Log {activeForm}
                                </h3>
                                <button onClick={closeForm}><X className="w-5 h-5 text-oled-gray-400" /></button>
                            </div>

                            <div className="space-y-4">
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={val1}
                                        onChange={(e) => setVal1(e.target.value)}
                                        className="w-full bg-oled-black border-2 border-white/5 rounded-2xl px-5 py-4 text-2xl font-bold text-pulsar-blue focus:outline-none focus:border-pulsar-blue/50"
                                        placeholder={activeForm === 'ride' ? 'Distance' : 'Liters'}
                                        autoFocus
                                    />
                                    <span className="absolute right-5 top-1/2 -translate-y-1/2 font-bold text-white/20">
                                        {activeForm === 'ride' ? 'KM' : 'L'}
                                    </span>
                                </div>

                                {activeForm === 'fuel' && (
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={val2}
                                            onChange={(e) => setVal2(e.target.value)}
                                            className="w-full bg-oled-black border-2 border-white/5 rounded-2xl px-5 py-4 text-2xl font-bold text-pulsar-blue focus:outline-none focus:border-pulsar-blue/50"
                                            placeholder="Total Cost"
                                        />
                                        <span className="absolute right-5 top-1/2 -translate-y-1/2 font-bold text-white/20">₹</span>
                                    </div>
                                )}

                                <button
                                    onClick={handleSubmit}
                                    className="w-full bg-pulsar-blue text-white font-bold py-4 rounded-2xl shadow-lg"
                                >
                                    CONFIRM
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!activeForm && (
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className={clsx(
                            "w-full h-16 rounded-2xl flex items-center justify-center shadow-2xl border transition-all duration-300",
                            isOpen ? "bg-oled-gray-100 border-white/10" : "bg-pulsar-blue border-pulsar-blue shadow-pulsar-blue/20"
                        )}
                    >
                        <motion.div
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ type: "spring", damping: 10, stiffness: 200 }}
                        >
                            <Plus className={clsx("w-8 h-8", isOpen ? "text-oled-gray-400" : "text-white")} />
                        </motion.div>
                    </motion.button>
                )}
            </div>
        </div>
    );
}
