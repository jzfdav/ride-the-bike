import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X } from 'lucide-react';

interface InfoTooltipProps {
    title: string;
    content: string;
}

export function InfoTooltip({ title, content }: InfoTooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="relative inline-block ml-1">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsVisible(!isVisible);
                }}
                className="p-1 hover:bg-white/5 rounded-full transition-colors group"
            >
                <Info className="w-3 h-3 text-white/20 group-hover:text-pulsar-blue transition-colors" />
            </button>

            <AnimatePresence>
                {isVisible && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-oled-black/60 backdrop-blur-sm"
                            onClick={() => setIsVisible(false)}
                        />

                        {/* Centered Tooltip Content */}
                        <div className="fixed inset-0 z-[101] flex items-center justify-center p-6 pointer-events-none">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="w-full max-w-xs bg-oled-gray-100 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-xl pointer-events-auto"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-pulsar-blue">
                                        {title}
                                    </h4>
                                    <button
                                        onClick={() => setIsVisible(false)}
                                        className="p-1.5 -mr-2 -mt-2 bg-white/5 rounded-full"
                                    >
                                        <X className="w-4 h-4 text-white/40 hover:text-white" />
                                    </button>
                                </div>
                                <p className="text-sm leading-relaxed text-oled-gray-400 font-medium">
                                    {content}
                                </p>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
