import { motion } from 'framer-motion';
import { Droplets, AlertTriangle } from 'lucide-react';
import { useStore } from '../store';
import { clsx } from 'clsx';
import { InfoTooltip } from './InfoTooltip';

export function MaintenanceModule() {
    const { currentOdo, lastLubeOdo, getChainHealth, logLube } = useStore();
    const chainHealth = getChainHealth();
    const kmSinceLube = currentOdo - lastLubeOdo;

    return (
        <div className="grid grid-cols-1 gap-4">
            <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-oled-gray-50/50 rounded-2xl p-5 border border-white/5 backdrop-blur-sm relative"
            >
                <div className="absolute top-5 right-5 z-10">
                    <InfoTooltip
                        title="Chain Maintenance"
                        content="Tracks health based on mileage. Lube recommended every 500km for optimal performance."
                    />
                </div>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] text-oled-gray-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                        <Droplets className="w-3 h-3 text-pulsar-blue" /> Chain Lube
                    </span>
                    <span className={clsx(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full border",
                        chainHealth > 50 ? "border-pulsar-blue/30 text-pulsar-blue" : "border-warning-orange/30 text-warning-orange"
                    )}>
                        {kmSinceLube} KM SINCE
                    </span>
                </div>

                <div className="grid grid-cols-[1fr,auto] gap-4 items-end">
                    <div className="space-y-2">
                        <div className="text-3xl font-bold tracking-tighter text-glow-pulsar">
                            {chainHealth}% <span className="text-sm font-medium opacity-50">HEALTH</span>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${chainHealth}%` }}
                                className={clsx(
                                    "h-full rounded-full transition-colors",
                                    chainHealth > 50 ? "bg-pulsar-blue shadow-[0_0_10px_rgba(0,82,204,0.3)]" : "bg-warning-orange shadow-[0_0_10px_rgba(255,107,53,0.3)]"
                                )}
                            />
                        </div>
                    </div>

                    <button
                        onClick={logLube}
                        className="p-3 bg-pulsar-blue/10 hover:bg-pulsar-blue/20 border border-pulsar-blue/20 rounded-xl transition-all group"
                    >
                        <Droplets className="w-5 h-5 text-pulsar-blue group-active:scale-90 transition-transform" />
                    </button>
                </div>

                {chainHealth < 30 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-3 p-2 bg-warning-orange/10 border border-warning-orange/20 rounded-lg flex items-center gap-2 text-[10px] text-warning-orange font-bold uppercase"
                    >
                        <AlertTriangle className="w-3 h-3" /> Lube Recommended Now
                    </motion.div>
                )}
            </motion.section>
        </div>
    );
}
