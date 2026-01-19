import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";
import { ActivityHistory } from "./components/ActivityHistory";
import { BottomActions } from "./components/BottomActions";
import { ChecklistModule } from "./components/ChecklistModule";
import { DashboardHeader } from "./components/DashboardHeader";
import { FuelModule } from "./components/FuelModule";
import { GlobalHelpModal } from "./components/GlobalHelpModal";
import { InfoTooltip } from "./components/InfoTooltip";
import { InsightsModule } from "./components/InsightsModule";
import { LiquidBattery } from "./components/LiquidBattery";
import { MainMetricCard } from "./components/MainMetricCard";
import { MaintenanceModule } from "./components/MaintenanceModule";
import { SettingsModal } from "./components/SettingsModal";
import { TyreModule } from "./components/TyreModule";
import { WeatherModule } from "./components/WeatherModule";
import { WelcomeOverlay } from "./components/WelcomeOverlay";
import { useStore } from "./store";
import { cn } from "./utils";

export function App() {
	const {
		currentOdo,
		baseOdo,
		targetOdo,
		lastRideDate,
		rides,
		hasSeenWelcome,
		setHasSeenWelcome,
		getBatteryHealth,
		getBatteryMessage,
		getDaysRemaining,
	} = useStore();

	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [batteryHealth, setBatteryHealth] = useState(getBatteryHealth());
	const [batteryMessage, setBatteryMessage] = useState(getBatteryMessage());
	const [showInsights, setShowInsights] = useState(false);

	useEffect(() => {
		setBatteryHealth(getBatteryHealth());
		setBatteryMessage(getBatteryMessage());

		const interval = setInterval(() => {
			setBatteryHealth(getBatteryHealth());
			setBatteryMessage(getBatteryMessage());
		}, 60000);
		return () => clearInterval(interval);
	}, [getBatteryHealth, getBatteryMessage, lastRideDate]);

	const denominator = targetOdo - baseOdo;
	const progress =
		denominator > 0
			? Math.max(0, Math.min(100, ((currentOdo - baseOdo) / denominator) * 100))
			: 100;

	const daysRemaining = getDaysRemaining();
	const dailyTarget =
		daysRemaining > 0
			? Math.max(0, (targetOdo - currentOdo) / daysRemaining)
			: 0;

	const totalRidesThisWeek = rides.filter((ride) => {
		const rideDate = new Date(ride.date);
		const weekAgo = new Date();
		weekAgo.setDate(weekAgo.getDate() - 7);
		return rideDate >= weekAgo;
	}).length;

	return (
		<div className="min-h-screen bg-oled-black text-white font-dashboard selection:bg-pulsar-blue/30 p-4 pb-32">
			<AnimatePresence>
				{!hasSeenWelcome && (
					<WelcomeOverlay onComplete={() => setHasSeenWelcome(true)} />
				)}
			</AnimatePresence>

			<div className="max-w-5xl mx-auto space-y-6">
				<DashboardHeader
					showInsights={showInsights}
					onToggleInsights={() => setShowInsights(!showInsights)}
				/>

				<AnimatePresence mode="wait">
					{showInsights ? (
						<motion.div
							key="insights"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
							transition={{ duration: 0.3 }}
						>
							<InsightsModule />
						</motion.div>
					) : (
						<motion.div
							key="cluster"
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 20 }}
							transition={{ duration: 0.3 }}
							className="space-y-6"
						>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<div className="md:col-span-3">
									<MainMetricCard
										currentOdo={currentOdo}
										baseOdo={baseOdo}
										targetOdo={targetOdo}
										progress={progress}
									/>
								</div>

								<div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-6">
									{/* Battery Health */}
									<section className="col-span-1 md:col-span-2 relative bg-oled-gray-100 rounded-[2.5rem] p-6 border border-white/5">
										<div className="flex justify-between items-center mb-3">
											<span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black flex items-center gap-2">
												<TrendingDown className="w-3.5 h-3.5 text-warning-orange" />{" "}
												Battery
											</span>
											<InfoTooltip
												title="Battery Health"
												content="Simulates battery drain. Loses 5% per day if you don't ride. Reset to 100% by logging any ride."
											/>
										</div>
										<div
											className={cn(
												"text-3xl font-bold tracking-tighter mt-1",
												batteryHealth > 50
													? "text-pulsar-blue text-glow-pulsar"
													: "text-warning-orange text-glow-warning",
											)}
										>
											{batteryHealth}%
										</div>
										<LiquidBattery health={batteryHealth} className="mt-3" />
										<div className="text-[9px] text-white/20 font-bold mt-2 uppercase tracking-tight">
											{batteryMessage}
										</div>
									</section>

									{/* Run Rate */}
									<section className="col-span-1 md:col-span-2 relative bg-oled-gray-100 rounded-[2.5rem] p-6 border border-white/5">
										<div className="flex justify-between items-center mb-3">
											<span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black flex items-center gap-2">
												<ChevronRight className="w-3.5 h-3.5 text-pulsar-blue" />{" "}
												Run-Rate
											</span>
											<InfoTooltip
												title="Daily Target"
												content="The average daily distance required to hit your target odometer by the service deadline."
											/>
										</div>
										<div className="text-3xl font-bold tracking-tighter text-pulsar-blue text-glow-pulsar">
											{dailyTarget > 0 ? dailyTarget.toFixed(1) : "0"}{" "}
											<span className="text-sm font-medium opacity-40">
												KM/D
											</span>
										</div>
										<div className="text-[9px] text-white/20 font-bold mt-2 uppercase tracking-tight">
											Target: {daysRemaining} days left
										</div>
									</section>
								</div>

								<div className="md:col-span-3">
									<WeatherModule />
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<FuelModule />
								<TyreModule />
							</div>

							<MaintenanceModule />
							<ChecklistModule />

							<ActivityHistory
								rides={rides}
								totalRidesThisWeek={totalRidesThisWeek}
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			<BottomActions onOpenSettings={() => setIsSettingsOpen(true)} />

			<SettingsModal
				isOpen={isSettingsOpen}
				onClose={() => setIsSettingsOpen(false)}
			/>

			<GlobalHelpModal />
		</div>
	);
}
