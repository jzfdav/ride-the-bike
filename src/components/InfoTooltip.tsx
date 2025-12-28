import * as Tooltip from "@radix-ui/react-tooltip";
import { Info } from "lucide-react";
import { useStore } from "../store";

interface InfoTooltipProps {
	title: string;
	content: string;
}

export function InfoTooltip({ title, content }: InfoTooltipProps) {
	const setActiveHelp = useStore((state) => state.setActiveHelp);

	return (
		<Tooltip.Provider delayDuration={100}>
			<Tooltip.Root>
				<Tooltip.Trigger asChild>
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							setActiveHelp({ title, content });
						}}
						className="p-1.5 hover:bg-white/5 rounded-full transition-all group active:scale-90"
					>
						<Info className="w-3.5 h-3.5 text-white/20 group-hover:text-pulsar-blue transition-colors" />
					</button>
				</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content
						className="z-[100] select-none rounded-[4px] bg-oled-gray-800 px-4 py-2.5 text-[11px] leading-none text-white shadow-[0_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] border border-white/10 backdrop-blur-md animate-in fade-in zoom-in duration-200"
						sideOffset={5}
					>
						<span className="font-bold text-pulsar-blue mr-1">{title}:</span>
						<span className="text-white/70">{content}</span>
						<Tooltip.Arrow className="fill-oled-gray-800" />
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
	);
}
