import { motion } from "framer-motion";
import { cn } from "../utils";

interface LiquidBatteryProps {
	health: number;
	className?: string;
}

export function LiquidBattery({ health, className }: LiquidBatteryProps) {
	const colorClass =
		health > 50
			? "bg-primary shadow-[0_0_15px_rgba(var(--primary),0.6)]"
			: health > 20
				? "bg-tertiary shadow-[0_0_15px_rgba(var(--tertiary),0.6)]"
				: "bg-error shadow-[0_0_15px_rgba(var(--error),0.6)]";

	return (
		<div
			className={cn(
				"relative w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden shadow-inner",
				className,
			)}
		>
			{/* Base health fill */}
			<motion.div
				initial={{ width: 0 }}
				animate={{ width: `${health}%` }}
				transition={{ duration: 1.5, ease: "circOut" }}
				className={cn("h-full rounded-full relative", colorClass)}
			>
				{/* Liquid wave effect */}
				<motion.div
					animate={{
						x: ["-25%", "25%"],
						opacity: [0.3, 0.6, 0.3],
					}}
					transition={{
						duration: 3,
						repeat: Infinity,
						ease: "easeInOut",
					}}
					className="absolute inset-0 bg-gradient-to-r from-transparent via-surface-on/40 to-transparent skew-x-12"
				/>

				{/* Particle glow */}
				<motion.div
					animate={{
						opacity: [0.4, 0.8, 0.4],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: "easeInOut",
					}}
					className="absolute right-0 top-0 bottom-0 w-1 rounded-full bg-surface-on"
				/>
			</motion.div>
		</div>
	);
}
