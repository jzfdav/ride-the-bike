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
		<section className="relative bg-oled-gray-100 rounded-[2.5rem] p-6 border border-white/5 overflow-hidden group">
			<div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
				<Milestone className="w-24 h-24 text-white" />
			</div>

			<div className="flex justify-between items-center mb-10">
				<span className="text-[10px] font-black uppercase tracking-[0.2em] text-oled-gray-400 flex items-center gap-2">
					<div className="w-1.5 h-1.5 rounded-full bg-pulsar-blue" />
					Active Odometer
				</span>
				<div className="flex items-center gap-3">
					<span className="text-[9px] font-black px-2 py-0.5 rounded-full border border-pulsar-blue/30 text-pulsar-blue bg-pulsar-blue/5">
						LOGGED
					</span>
					<InfoTooltip
						title="Odometer Tracking"
						content="Displays your bike's current lifetime mileage. Total distance covered since acquisition."
					/>
				</div>
			</div>

			<div className="space-y-1.5">
				<div className="text-6xl font-black tracking-tighter text-white">
					{Math.floor(currentOdo).toLocaleString()}
					<span className="text-xl font-medium opacity-20 ml-2">KM</span>
				</div>
				<div className="flex items-center gap-2 text-[11px] font-bold text-pulsar-blue uppercase tracking-widest bg-pulsar-blue/5 py-1 px-3 rounded-full w-fit">
					{progress.toFixed(1)}% Progress
				</div>
			</div>

			<div className="mt-10 space-y-4">
				<div className="w-full bg-white/[0.03] rounded-full h-1.5 overflow-hidden">
					<motion.div
						initial={{ width: 0 }}
						animate={{ width: `${progress}%` }}
						transition={{ duration: 1, ease: "circOut" }}
						className="bg-pulsar-blue h-full rounded-full shadow-[0_0_15px_rgba(0,163,255,0.5)]"
					/>
				</div>
				<div className="flex justify-between items-center text-[10px] font-black tracking-widest uppercase opacity-40">
					<span>Start: {baseOdo}</span>
					<span>Target: {targetOdo}</span>
				</div>
			</div>
		</section>
	);
}
