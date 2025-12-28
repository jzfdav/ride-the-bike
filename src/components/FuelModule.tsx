import { motion } from "framer-motion";
import { AlertTriangle, Fuel, TrendingUp } from "lucide-react";
import { useStore } from "../store";
import { cn } from "../utils";
import { InfoTooltip } from "./InfoTooltip";

export function FuelModule() {
	const { getAverageFE, fuelLog, fuelBars } = useStore();
	const avgFE = getAverageFE();

	const isReserve = fuelBars <= 2;
	const isLowFuel = fuelBars <= 1;

	return (
		<motion.section
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			className="relative bg-oled-gray-50/50 rounded-2xl p-6 border border-white/5 backdrop-blur-sm"
		>
			<div className="flex justify-between items-center mb-6">
				<span className="text-[10px] text-oled-gray-400 uppercase tracking-widest font-black flex items-center gap-1.5">
					<Fuel className="w-3.5 h-3.5 text-pulsar-blue" /> Fuel Level
				</span>
				<div className="flex items-center gap-3">
					{isReserve && (
						<div
							className={cn(
								"px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest flex items-center gap-1",
								isLowFuel
									? "bg-red-500/20 text-red-500 animate-pulse"
									: "bg-amber-500/20 text-amber-500",
							)}
						>
							<AlertTriangle className="w-2.5 h-2.5" /> RES
						</div>
					)}
					<InfoTooltip
						title="Fuel Tracking"
						content="12-bar gauge inspired by Pulsar 180. Avg Efficiency requires at least 2 refuel logs to calculate accurately."
					/>
				</div>
			</div>

			{/* Pulsar 12-Bar Gauge */}
			<div className="flex items-end gap-1 mb-6 h-8">
				{[...Array(12)].map((_, i) => {
					const barIndex = 11 - i; // Left to right (0 to 11)
					const isActive = barIndex < fuelBars;
					return (
						<div
							key={i}
							className={cn(
								"flex-1 rounded-sm shadow-sm transition-all duration-500",
								isActive
									? barIndex <= 1
										? "bg-red-500 h-8 shadow-[0_0_10px_rgba(239,68,68,0.4)]"
										: "bg-pulsar-blue h-8 shadow-[0_0_10px_rgba(0,82,204,0.4)]"
									: "bg-white/5 h-4",
							)}
						/>
					);
				})}
			</div>

			<div className="flex justify-between items-end">
				<div className="space-y-1">
					<div className="text-[9px] text-oled-gray-400 uppercase tracking-widest font-bold">
						Average efficiency
					</div>
					<div className="flex items-baseline gap-2">
						<div className="text-2xl font-black tracking-tighter text-glow-pulsar">
							{typeof avgFE === "number" && avgFE > 0
								? avgFE
								: fuelLog.length > 0
									? avgFE
									: "--.-"}
						</div>
						<div className="text-[10px] font-black text-oled-gray-400">
							KM/L
						</div>
					</div>
				</div>

				{fuelLog.length < 2 && fuelLog.length > 0 && (
					<div className="text-[8px] text-white/20 font-bold uppercase tracking-widest max-w-[100px] text-right mb-1 leading-tight">
						Log one more refuel to see average
					</div>
				)}
			</div>
		</motion.section>
	);
}
