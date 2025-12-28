import { Info } from 'lucide-react';
import { useStore } from '../store';

interface InfoTooltipProps {
    title: string;
    content: string;
}

export function InfoTooltip({ title, content }: InfoTooltipProps) {
    const setActiveHelp = useStore((state) => state.setActiveHelp);

    return (
        <div className="relative inline-block ml-1">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setActiveHelp({ title, content });
                }}
                className="p-1.5 hover:bg-white/5 rounded-full transition-all group active:scale-90"
            >
                <Info className="w-3.5 h-3.5 text-white/20 group-hover:text-pulsar-blue transition-colors" />
            </button>
        </div>
    );
}
