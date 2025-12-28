import { motion, AnimatePresence } from 'framer-motion';
import { X, Info } from 'lucide-react';
import { useStore } from '../store';

export function GlobalHelpModal() {
    const { activeHelp, setActiveHelp } = useStore();

    return (
        <AnimatePresence>
            {activeHelp && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-oled-black/80 backdrop-blur-md"
                        onClick={() => setActiveHelp(null)}
                    />

                    {/* Centered Tooltip Content */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-6 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="w-full max-w-xs bg-oled-gray-100 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-xl pointer-events-auto"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-pulsar-blue/10 rounded-xl">
                                        <Info className="w-4 h-4 text-pulsar-blue" />
                                    </div>
                                    <h4 className="text-sm font-black uppercase tracking-[0.2em] text-pulsar-blue">
                                        {activeHelp.title}
                                    </h4>
                                </div>
                                <button
                                    onClick={() => setActiveHelp(null)}
                                    className="p-2 -mr-2 -mt-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-5 h-5 text-white/40 hover:text-white" />
                                </button>
                            </div>
                            <p className="text-sm leading-relaxed text-oled-gray-400 font-medium whitespace-pre-wrap">
                                {activeHelp.content}
                            </p>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
