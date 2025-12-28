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
                        {/* Backdrop to close when clicking outside */}
                        <div
                            className="fixed inset-0 z-[100]"
                            onClick={() => setIsVisible(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 5 }}
                            className="absolute right-0 top-6 z-[101] w-64 bg-oled-gray-100 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-xl"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-pulsar-blue">
                                    {title}
                                </h4>
                                <button onClick={() => setIsVisible(false)}>
                                    <X className="w-3 h-3 text-white/20 hover:text-white" />
                                </button>
                            </div>
                            <p className="text-[11px] leading-relaxed text-oled-gray-400 font-medium">
                                {content}
                            </p>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
