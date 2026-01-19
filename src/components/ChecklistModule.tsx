import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Circle, RotateCcw, ShieldCheck } from "lucide-react";
import { useStore } from "../store";
import { cn } from "../utils";
import { InfoTooltip } from "./InfoTooltip";

export function ChecklistModule() {
	const { checklist, toggleChecklistItem, resetChecklist, showChecklist } =
		useStore();

	if (!showChecklist) return null;

	const completedCount = checklist.filter((item) => item.checked).length;
	const isFullyComplete = completedCount === checklist.length;

	return (
		<motion.section
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			className={cn(
				"relative rounded-[2rem] p-6 border transition-colors duration-500 shadow-sm",
				isFullyComplete
					? "bg-emerald-500/5 border-emerald-500/20"
					: "bg-surface-container-low border-outline-variant/10",
			)}
		>
			<div className="flex justify-between items-center mb-5">
				<span className="text-[10px] text-surface-on-variant uppercase tracking-widest font-black flex items-center gap-1.5 opacity-80">
					<ShieldCheck
						className={cn(
							"w-3.5 h-3.5",
							isFullyComplete ? "text-emerald-500" : "text-primary",
						)}
					/>{" "}
					Pre-Ride Safety
				</span>
				<div className="flex items-center gap-3">
					<span
						className={cn(
							"text-[8px] font-black uppercase tracking-[0.2em]",
							isFullyComplete
								? "text-emerald-500"
								: "text-surface-on-variant/50",
						)}
					>
						{completedCount}/{checklist.length} READY
					</span>
					<button
						onClick={(e) => {
							e.stopPropagation();
							resetChecklist();
						}}
						className="p-1 hover:bg-surface-on/5 rounded-md transition-colors text-surface-on-variant/50 hover:text-surface-on-variant"
					>
						<RotateCcw className="w-3 h-3" />
					</button>
					<InfoTooltip
						title="Safety Checklist"
						content="Ensure all critical checks are performed before your ride. Reset daily for a safe start."
					/>
				</div>
			</div>

			<div className="space-y-3">
				{checklist.map((item) => (
					<button
						key={item.id}
						onClick={() => toggleChecklistItem(item.id)}
						className="w-full flex items-center justify-between group text-left"
					>
						<span
							className={cn(
								"text-[11px] font-bold tracking-tight transition-colors",
								item.checked
									? "text-surface-on-variant/40 line-through decoration-surface-on-variant/20"
									: "text-surface-on/80 group-hover:text-surface-on",
							)}
						>
							{item.text}
						</span>
						<div
							className={cn(
								"transition-all duration-300",
								item.checked
									? "text-emerald-500"
									: "text-surface-on-variant/20",
							)}
						>
							{item.checked ? (
								<CheckCircle2 className="w-4 h-4" />
							) : (
								<Circle className="w-4 h-4" />
							)}
						</div>
					</button>
				))}
			</div>

			<AnimatePresence>
				{isFullyComplete && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						className="mt-4 pt-4 border-t border-emerald-500/10"
					>
						<div className="text-[10px] text-emerald-500 font-black uppercase tracking-widest text-center animate-pulse">
							Ready for takeoff
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.section>
	);
}
