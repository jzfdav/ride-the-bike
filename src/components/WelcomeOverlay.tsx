import { motion, AnimatePresence } from 'framer-motion';
import { Bike, ShieldCheck, Zap, Target, ArrowRight, TrendingUp } from 'lucide-react';

interface WelcomeOverlayProps {
    onComplete: () => void;
}

export function WelcomeOverlay({ onComplete }: WelcomeOverlayProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-oled-black flex flex-col items-center justify-center p-8 text-center"
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mb-8 p-4 bg-pulsar-blue/10 rounded-3xl border border-pulsar-blue/20"
            >
                <Bike className="w-16 h-16 text-pulsar-blue" />
            </motion.div>

            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-3xl font-bold tracking-tight mb-4 text-glow-pulsar"
            >
                RideTheBike
            </motion.h1>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-oled-gray-400 text-sm leading-relaxed mb-12 max-w-[280px]"
            >
                Keep your machine alive. Gamify <span className="text-white font-semibold">mechanical sympathy</span> and reach your riding target through consistent, healthy riding.
            </motion.p>

            <div className="space-y-6 w-full max-w-[280px] mb-12">
                {[
                    { icon: Zap, text: "Battery health decays 5% daily", color: "text-pulsar-blue" },
                    { icon: ShieldCheck, text: "Track chain lube & service", color: "text-pulsar-blue" },
                    { icon: TrendingUp, text: "Daily 'Run-Rate' target", color: "text-pulsar-blue" },
                    { icon: Target, text: "Reach your riding milestone", color: "text-pulsar-blue" }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                        className="flex items-center gap-4 text-left"
                    >
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                        <span className="text-xs font-medium text-oled-gray-300">{item.text}</span>
                    </motion.div>
                ))}
            </div>

            <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
                onClick={onComplete}
                className="w-full max-w-[240px] bg-pulsar-blue text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 group hover:gap-4 transition-all"
            >
                START RIDING <ArrowRight className="w-5 h-5" />
            </motion.button>
        </motion.div>
    );
}
