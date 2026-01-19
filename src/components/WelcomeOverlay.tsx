import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Bike, Target, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";
import { useStore } from "../store";

interface WelcomeOverlayProps {
	onComplete: () => void;
}

export function WelcomeOverlay({ onComplete }: WelcomeOverlayProps) {
	const [model, setModel] = useState("");
	const setBikeModel = useStore((state) => state.setBikeModel);

	const handleComplete = () => {
		if (model.trim()) {
			setBikeModel(model);
		}
		onComplete();
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 z-50 bg-oled-black flex flex-col items-center justify-center p-8 text-center"
		>
			<motion.div
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ delay: 0.2, type: "spring" }}
				className="mb-8 p-4 bg-primary/10 rounded-3xl border border-primary/20"
			>
				<Bike className="w-16 h-16 text-primary" />
			</motion.div>

			<motion.h1
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.4 }}
				className="text-3xl font-bold tracking-tight mb-4 text-glow-pulsar"
			>
				RideTheBike
			</motion.h1>

			<motion.div
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.5 }}
				className="w-full max-w-[280px] mb-8"
			>
				<input
					type="text"
					placeholder="Enter Bike Model (e.g. Pulsar NS200)"
					value={model}
					onChange={(e) => setModel(e.target.value)}
					className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-center focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-white/20 outline-none transition-all"
				/>
			</motion.div>

			<div className="space-y-4 w-full max-w-[280px] mb-12">
				{[
					{
						icon: Zap,
						text: "Battery health decays 5% daily",
						color: "text-primary",
					},

					{
						icon: TrendingUp,
						text: "Daily 'Run-Rate' target",
						color: "text-primary",
					},
					{
						icon: Target,
						text: "Reach your riding milestone",
						color: "text-primary",
					},
				].map((item, i) => (
					<motion.div
						key={i}
						initial={{ x: -20, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ delay: 0.7 + i * 0.1 }}
						className="flex items-center gap-4 text-left"
					>
						<item.icon className={`w-5 h-5 ${item.color}`} />
						<span className="text-xs font-medium text-oled-gray-300">
							{item.text}
						</span>
					</motion.div>
				))}
			</div>

			<motion.button
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 1.1 }}
				onClick={handleComplete}
				className="w-full max-w-[240px] bg-primary text-primary-on font-bold py-4 rounded-2xl flex items-center justify-center gap-2 group hover:gap-4 transition-all"
			>
				START RIDING <ArrowRight className="w-5 h-5" />
			</motion.button>
		</motion.div>
	);
}
