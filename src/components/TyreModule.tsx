import { motion } from 'framer-motion';
import { CircleDot, Clock } from 'lucide-react';
import { useStore } from '../store';
import { formatDistanceToNow } from 'date-fns';
import { InfoTooltip } from './InfoTooltip';

export function TyreModule() {
    const { tyrePressure } = useStore();

    const getTimeAgo = (date: string | null) => {
        if (!date) return 'Never';
        try {
            return formatDistanceToNow(new Date(date), { addSuffix: true });
        } catch (e) {
            return 'Recently';
        }
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-oled-gray-50/50 rounded-2xl p-6 border border-white/5 backdrop-blur-sm"
        >
            <div className="absolute top-6 right-6 z-10">
                <InfoTooltip
                    title="Tyre Pressure"
                    content="Manual log of your PSI. Keep these within recommended limits for safety and efficiency."
                />
            </div>
            <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] text-oled-gray-400 uppercase tracking-widest font-black flex items-center gap-1.5">
                    <CircleDot className="w-3.5 h-3.5 text-pulsar-blue" /> Tyre Pressure
                </span>
                <div className="flex items-center gap-1.5 text-[9px] text-white/20 font-bold uppercase tracking-widest">
                    <Clock className="w-2.5 h-2.5" /> {getTimeAgo(tyrePressure.lastUpdated)}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 relative">
                {/* Vertical Divider */}
                <div className="absolute left-1/2 top-1 bottom-1 w-[1px] bg-white/5" />

                <div className="space-y-1 text-center">
                    <div className="text-[9px] text-oled-gray-400 uppercase tracking-widest font-bold">Front</div>
                    <div className="flex items-baseline justify-center gap-1">
                        <div className="text-3xl font-black tracking-tighter text-glow-pulsar">
                            {tyrePressure.front ?? '--'}
                        </div>
                        <div className="text-[10px] font-black text-oled-gray-400">PSI</div>
                    </div>
                </div>

                <div className="space-y-1 text-center">
                    <div className="text-[9px] text-oled-gray-400 uppercase tracking-widest font-bold">Rear</div>
                    <div className="flex items-baseline justify-center gap-1">
                        <div className="text-3xl font-black tracking-tighter text-glow-pulsar">
                            {tyrePressure.rear ?? '--'}
                        </div>
                        <div className="text-[10px] font-black text-oled-gray-400">PSI</div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
