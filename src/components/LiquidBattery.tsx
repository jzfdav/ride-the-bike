import { motion } from "framer-motion";
import { cn } from "../utils";

interface LiquidBatteryProps {
	health: number;
	className?: string;
}

export function LiquidBattery({ health, className }: LiquidBatteryProps) {
	const color = health > 50 ? "#00E5FF" : health > 20 ? "#FF9E00" : "#FF3D00";

	return (
		<div
			className={cn(
				"relative w-full h-1.5 bg-white/5 rounded-full overflow-hidden shadow-inner",
				className,
			)}
		>
			{/* Base health fill */}
			<motion.div
				initial={{ width: 0 }}
				animate={{ width: `${health}%` }}
				transition={{ duration: 1.5, ease: "circOut" }}
				style={{ backgroundColor: color }}
				className="h-full rounded-full relative"
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
					className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
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
					style={{
						boxShadow: `0 0 15px ${color}`,
					}}
					className="absolute right-0 top-0 bottom-0 w-1 rounded-full"
				/>
			</motion.div>
		</div>
	);
}
