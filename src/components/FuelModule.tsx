import { motion } from "framer-motion";
import { AlertTriangle, Fuel } from "lucide-react";
import { useStore } from "../store";
import { cn } from "../utils";
import { InfoTooltip } from "./InfoTooltip";

export function FuelModule() {
	const { getAverageFE, fuelLog, fuelBars, showFuelTracker } = useStore();
	const avgFE = getAverageFE();

	return (
		<FuelModuleUI
			fuelBars={fuelBars}
			avgFE={
				typeof avgFE === "number" && avgFE > 0
					? avgFE.toString()
					: fuelLog.length > 0
						? avgFE.toString()
						: "--.-"
			}
			fuelLogCount={fuelLog.length}
			isVisible={showFuelTracker}
		/>
	);
}

interface FuelModuleUIProps {
	fuelBars: number;
	avgFE: string;
	fuelLogCount: number;
	isVisible: boolean;
}

export function FuelModuleUI({
	fuelBars,
	avgFE,
	fuelLogCount,
	isVisible,
}: FuelModuleUIProps) {
	if (!isVisible) return null;

	const isReserve = fuelBars <= 2;
	const isLowFuel = fuelBars <= 1;

	return (
		<motion.section
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			className="relative bg-surface-container-low rounded-[2rem] p-6 shadow-sm border border-outline-variant/10"
		>
			<div className="flex justify-between items-center mb-6">
				<span className="text-[10px] text-surface-on-variant uppercase tracking-widest font-black flex items-center gap-1.5 opacity-80">
					<Fuel className="w-3.5 h-3.5 text-primary" /> Fuel Level
				</span>
				<div className="flex items-center gap-3">
					{isReserve && (
						<div
							className={cn(
								"px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest flex items-center gap-1",
								isLowFuel
									? "bg-error/10 text-error animate-pulse"
									: "bg-tertiary/10 text-tertiary",
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
					const barIndex = 11 - i;
					const isActive = barIndex < fuelBars;
					return (
						<div
							key={i}
							className={cn(
								"flex-1 rounded-sm shadow-sm transition-all duration-500",
								isActive
									? barIndex <= 1
										? "bg-error h-8 shadow-[0_0_8px_rgba(var(--error),0.4)]"
										: "bg-primary h-8 shadow-[0_0_8px_rgba(var(--primary),0.4)]"
									: "bg-surface-on/5 h-4",
							)}
						/>
					);
				})}
			</div>

			<div className="flex justify-between items-end">
				<div className="space-y-1">
					<div className="text-[9px] text-surface-on-variant uppercase tracking-widest font-bold opacity-70">
						Average efficiency
					</div>
					<div className="flex items-baseline gap-2">
						<div className="text-2xl font-black tracking-tighter text-primary">
							{avgFE}
						</div>
						<div className="text-[10px] font-black text-surface-on-variant/60">
							KM/L
						</div>
					</div>
				</div>

				{fuelLogCount < 2 && fuelLogCount > 0 && (
					<div className="text-[8px] text-surface-on-variant/50 font-bold uppercase tracking-widest max-w-[100px] text-right mb-1 leading-tight">
						Log one more refuel to see average
					</div>
				)}
			</div>
		</motion.section>
	);
}
