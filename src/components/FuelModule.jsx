import { motion } from 'framer-motion';
import { Fuel, TrendingUp, Info } from 'lucide-react';
import { useStore } from '../store';

export function FuelModule() {
    const { getAverageFE, fuelLog } = useStore();
    const avgFE = getAverageFE();

    if (fuelLog.length === 0) return null;

    return (
        <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-oled-gray-50/50 rounded-2xl p-5 border border-white/5 backdrop-blur-sm"
        >
            <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] text-oled-gray-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                    <Fuel className="w-3 h-3 text-pulsar-blue" /> Efficiency
                </span>
                <TrendingUp className="w-3 h-3 text-pulsar-blue/40" />
            </div>

            <div className="flex items-baseline gap-2">
                <div className="text-3xl font-bold tracking-tighter text-glow-pulsar">
                    {avgFE > 0 ? avgFE : "--.-"}
                </div>
                <div className="text-xs font-bold text-oled-gray-400 uppercase tracking-widest">
                    KM/L (AVG)
                </div>
            </div>

            {fuelLog.length < 2 && (
                <div className="mt-2 text-[9px] text-white/30 flex items-center gap-1">
                    <Info className="w-2.5 h-2.5" /> Log one more refuel to see average
                </div>
            )}
        </motion.section>
    );
}
