import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { CircleDot, Clock } from "lucide-react";
import { useStore } from "../store";
import { InfoTooltip } from "./InfoTooltip";

export function TyreModule() {
	const { tyrePressure, showTyreTracker } = useStore();

	if (!showTyreTracker) return null;

	const getTimeAgo = (date: string | null) => {
		if (!date) return "Never";
		try {
			return formatDistanceToNow(new Date(date), { addSuffix: true });
		} catch (_e) {
			return "Recently";
		}
	};

	return (
		<motion.section
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			className="relative bg-surface-container-low rounded-[2rem] p-6 shadow-sm border border-outline-variant/10"
		>
			<div className="flex justify-between items-center mb-6">
				<span className="text-[10px] text-surface-on-variant uppercase tracking-widest font-black flex items-center gap-1.5 opacity-80">
					<CircleDot className="w-3.5 h-3.5 text-primary" /> Tyre Pressure
				</span>
				<div className="flex items-center gap-3">
					<div className="flex items-center gap-1.5 text-[9px] text-surface-on-variant/50 font-bold uppercase tracking-widest">
						<Clock className="w-2.5 h-2.5" />{" "}
						{getTimeAgo(tyrePressure.lastUpdated)}
					</div>
					<InfoTooltip
						title="Tyre Pressure"
						content="Manual log of your PSI. Keep these within recommended limits for safety and efficiency."
					/>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-8 relative">
				{/* Vertical Divider */}
				<div className="absolute left-1/2 top-1 bottom-1 w-[1px] bg-outline-variant/10" />

				<div className="space-y-1 text-center">
					<div className="text-[9px] text-surface-on-variant uppercase tracking-widest font-bold opacity-70">
						Front
					</div>
					<div className="flex items-baseline justify-center gap-1">
						<div className="text-3xl font-black tracking-tighter text-primary">
							{tyrePressure.front ?? "--"}
						</div>
						<div className="text-[10px] font-black text-surface-on-variant/60">
							PSI
						</div>
					</div>
				</div>

				<div className="space-y-1 text-center">
					<div className="text-[9px] text-surface-on-variant uppercase tracking-widest font-bold opacity-70">
						Rear
					</div>
					<div className="flex items-baseline justify-center gap-1">
						<div className="text-3xl font-black tracking-tighter text-primary">
							{tyrePressure.rear ?? "--"}
						</div>
						<div className="text-[10px] font-black text-surface-on-variant/60">
							PSI
						</div>
					</div>
				</div>
			</div>
		</motion.section>
	);
}
