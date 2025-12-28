import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CheckCircle2, Circle, RotateCcw } from 'lucide-react';
import { useStore } from '../store';
import { InfoTooltip } from './InfoTooltip';

export function ChecklistModule() {
    const { checklist, toggleChecklistItem, resetChecklist } = useStore();
    const completedCount = checklist.filter(item => item.checked).length;
    const isFullyComplete = completedCount === checklist.length;

    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`relative rounded-2xl p-6 border transition-colors duration-500 ${isFullyComplete
                ? 'bg-emerald-500/5 border-emerald-500/20'
                : 'bg-oled-gray-50/50 border-white/5'
                }`}
        >
            <div className="absolute top-6 right-6 z-10 flex items-center gap-2">
                <InfoTooltip
                    title="Safety Checklist"
                    content="Ensure all critical checks are performed before your ride. Reset daily for a safe start."
                />
            </div>
            <div className="flex justify-between items-center mb-5">
                <span className="text-[10px] text-oled-gray-400 uppercase tracking-widest font-black flex items-center gap-1.5">
                    <ShieldCheck className={`w-3.5 h-3.5 ${isFullyComplete ? 'text-emerald-500' : 'text-pulsar-blue'}`} /> Pre-Ride Safety
                </span>
                <div className="flex items-center gap-3">
                    <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${isFullyComplete ? 'text-emerald-500' : 'text-white/20'}`}>
                        {completedCount}/{checklist.length} READY
                    </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            resetChecklist();
                        }}
                        className="p-1 hover:bg-white/5 rounded-md transition-colors text-white/20 hover:text-white/40"
                    >
                        <RotateCcw className="w-3 h-3" />
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                {checklist.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => toggleChecklistItem(item.id)}
                        className="w-full flex items-center justify-between group text-left"
                    >
                        <span className={`text-[11px] font-bold tracking-tight transition-colors ${item.checked ? 'text-white/20 line-through decoration-white/10' : 'text-white/70 group-hover:text-white'
                            }`}>
                            {item.text}
                        </span>
                        <div className={`transition-all duration-300 ${item.checked ? 'text-emerald-500' : 'text-white/10'
                            }`}>
                            {item.checked ? (
                                <CheckCircle2 className="w-4 h-4" />
                            ) : (
                                <Circle className="w-4 h-4" />
                            )}
                        </div>
                    </button>
                ))}
            </div>

            <AnimatePresence>
                {isFullyComplete && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-4 pt-4 border-t border-emerald-500/10"
                    >
                        <div className="text-[10px] text-emerald-500 font-black uppercase tracking-widest text-center animate-pulse">
                            Ready for takeoff
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    );
}
