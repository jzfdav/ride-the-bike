import { motion } from "framer-motion";
import { Milestone } from "lucide-react";
import { InfoTooltip } from "./InfoTooltip";

interface MainMetricCardProps {
	currentOdo: number;
	baseOdo: number;
	targetOdo: number;
	progress: number;
}

export function MainMetricCard({
	currentOdo,
	baseOdo,
	targetOdo,
	progress,
}: MainMetricCardProps) {
	return (
		<section className="relative bg-surface-container-high rounded-[2.5rem] p-6 overflow-hidden group shadow-lg transition-colors duration-medium4 hover:bg-surface-container-highest">
			<div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-medium4 pointer-events-none">
				<Milestone className="w-48 h-48 text-primary rotate-12" />
			</div>

			<div className="relative z-10 flex justify-between items-center mb-4">
				<span className="text-[10px] font-bold uppercase tracking-[0.2em] text-surface-on-variant flex items-center gap-2">
					<div className="w-1.5 h-1.5 rounded-full bg-primary" />
					Active Odometer
				</span>
				<div className="flex items-center gap-3">
					<span className="text-[9px] font-bold px-2 py-0.5 rounded-full border border-primary/30 text-primary bg-primary/5">
						LOGGED
					</span>
					<InfoTooltip
						title="Odometer Tracking"
						content="Displays your bike's current lifetime mileage. Total distance covered since acquisition."
					/>
				</div>
			</div>

			<div className="space-y-1.5">
				<div className="text-6xl font-black tracking-tighter text-surface-on">
					{Math.floor(currentOdo).toLocaleString()}
					<span className="text-xl font-medium opacity-60 ml-2">KM</span>
				</div>
				<div className="flex items-center gap-2 text-[11px] font-bold text-primary-on uppercase tracking-widest bg-primary py-1 px-3 rounded-full w-fit">
					{progress.toFixed(1)}% Progress
				</div>
			</div>

			<div className="mt-6 space-y-4">
				<div className="w-full bg-surface-on-variant/10 rounded-full h-1.5 overflow-hidden">
					<motion.div
						initial={{ width: 0 }}
						animate={{ width: `${progress}%` }}
						transition={{ duration: 1, ease: "circOut" }}
						className="bg-primary h-full rounded-full"
					/>
				</div>
				<div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase text-surface-on-variant">
					<span>Start: {baseOdo}</span>
					<span>Target: {targetOdo}</span>
				</div>
			</div>
		</section>
	);
}
