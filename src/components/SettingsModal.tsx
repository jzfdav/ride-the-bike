import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import {
	Activity,
	Calendar,
	Droplets,
	Fuel,
	Save,
	Target,
	X,
} from "lucide-react";
import { useState } from "react";
import { useStore } from "../store";
import { cn } from "../utils";

interface SettingsModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
	const {
		serviceDueDate,
		setServiceDueDate,
		currentOdo,
		setCurrentOdo,
		baseOdo,
		setBaseOdo,
		targetOdo,
		setTargetOdo,
		bikeModel,
		setBikeModel,
		showLubeTracker,
		setShowLubeTracker,
		showFuelTracker,
		setShowFuelTracker,
		showTyreTracker,
		setShowTyreTracker,
		showChecklist,
		setShowChecklist,
	} = useStore();

	const [tempDate, setTempDate] = useState(
		serviceDueDate
			? serviceDueDate.split("T")[0]
			: new Date().toISOString().split("T")[0],
	);
	const [tempOdo, setTempOdo] = useState(currentOdo.toString());
	const [tempBase, setTempBase] = useState(baseOdo.toString());
	const [tempTarget, setTempTarget] = useState(targetOdo.toString());
	const [tempModel, setTempModel] = useState(bikeModel);
	const [tempShowLube, setTempShowLube] = useState(showLubeTracker);
	const [tempShowFuel, setTempShowFuel] = useState(showFuelTracker);
	const [tempShowTyre, setTempShowTyre] = useState(showTyreTracker);
	const [tempShowChecklist, setTempShowChecklist] = useState(showChecklist);

	const handleSave = () => {
		const date = new Date(tempDate);
		if (!isNaN(date.getTime())) {
			setServiceDueDate(date.toISOString());
		}

		const odo = parseFloat(tempOdo);
		if (!isNaN(odo)) setCurrentOdo(odo);

		const base = parseFloat(tempBase);
		if (!isNaN(base)) setBaseOdo(base);

		const target = parseFloat(tempTarget);
		if (!isNaN(target)) setTargetOdo(target);

		setBikeModel(tempModel);
		setShowLubeTracker(tempShowLube);
		setShowFuelTracker(tempShowFuel);
		setShowTyreTracker(tempShowTyre);
		setShowChecklist(tempShowChecklist);

		onClose();
	};

	return (
		<Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<AnimatePresence>
				{isOpen && (
					<Dialog.Portal forceMount>
						<Dialog.Overlay asChild>
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="fixed inset-0 bg-oled-black/80 backdrop-blur-sm z-[60]"
							/>
						</Dialog.Overlay>
						<Dialog.Content asChild>
							<motion.div
								initial={{ opacity: 0, y: 100, scale: 0.95 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								exit={{ opacity: 0, y: 100, scale: 0.95 }}
								className="fixed bottom-0 left-0 right-0 z-[70] p-6 max-w-md mx-auto outline-none"
							>
								<div className="bg-oled-gray-100 rounded-[2.5rem] border border-white/10 p-8 shadow-2xl">
									<div className="flex justify-between items-center mb-8">
										<Dialog.Title className="text-sm font-black uppercase tracking-[0.2em] text-oled-gray-400">
											Challenge Settings
										</Dialog.Title>
										<Dialog.Close asChild>
											<button
												type="button"
												className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
												aria-label="Close"
											>
												<X className="w-5 h-5 text-oled-gray-400" />
											</button>
										</Dialog.Close>
									</div>

									<div className="space-y-6">
										{/* Challenge Start Date */}
										<div className="space-y-3">
											<label className="text-[10px] font-black uppercase tracking-widest text-pulsar-blue flex items-center gap-2">
												<Calendar className="w-3.5 h-3.5" /> Service Due Date
												(Deadline)
											</label>
											<input
												type="date"
												value={tempDate}
												onChange={(e) => setTempDate(e.target.value)}
												className="w-full bg-oled-black border-2 border-white/5 rounded-2xl px-5 py-4 text-lg font-bold text-white focus:outline-none focus:border-pulsar-blue/50 transition-colors color-scheme-dark"
											/>
											<Dialog.Description className="text-[9px] text-oled-gray-400 font-medium">
												When is your bike due for its next service?
											</Dialog.Description>
										</div>

										{/* Starting Odometer */}
										<div className="grid grid-cols-2 gap-4">
											<div className="space-y-3">
												<label className="text-[10px] font-black uppercase tracking-widest text-pulsar-blue flex items-center gap-2">
													<Activity className="w-3.5 h-3.5" /> Base (KM)
												</label>
												<input
													type="number"
													value={tempBase}
													onChange={(e) => setTempBase(e.target.value)}
													className="w-full bg-oled-black border-2 border-white/5 rounded-2xl px-5 py-4 text-lg font-bold text-white focus:outline-none focus:border-pulsar-blue/50 transition-colors"
												/>
											</div>
											<div className="space-y-3">
												<label className="text-[10px] font-black uppercase tracking-widest text-pulsar-blue flex items-center gap-2">
													<Target className="w-3.5 h-3.5" /> Target (KM)
												</label>
												<input
													type="number"
													value={tempTarget}
													onChange={(e) => setTempTarget(e.target.value)}
													className="w-full bg-oled-black border-2 border-white/5 rounded-2xl px-5 py-4 text-lg font-bold text-white focus:outline-none focus:border-pulsar-blue/50 transition-colors"
												/>
											</div>
										</div>

										{/* Current Odometer */}
										<div className="space-y-3">
											<label className="text-[10px] font-black uppercase tracking-widest text-pulsar-blue flex items-center gap-2">
												<Activity className="w-3.5 h-3.5" /> Current Odometer
												(KM)
											</label>
											<input
												type="number"
												value={tempOdo}
												onChange={(e) => setTempOdo(e.target.value)}
												className="w-full bg-oled-black border-2 border-white/5 rounded-2xl px-5 py-4 text-lg font-bold text-white focus:outline-none focus:border-pulsar-blue/50 transition-colors"
												placeholder="e.g. 10450"
											/>
										</div>

										{/* Bike Profile */}
										<div className="space-y-4 pt-4 border-t border-white/5">
											<h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-1">
												Bike Profile
											</h3>
											<div className="space-y-3">
												<label className="text-[10px] font-black uppercase tracking-widest text-pulsar-blue">
													Bike Model
												</label>
												<input
													type="text"
													value={tempModel}
													onChange={(e) => setTempModel(e.target.value)}
													placeholder="e.g. Pulsar NS200"
													className="w-full bg-oled-black border-2 border-white/5 rounded-2xl px-5 py-4 text-sm font-bold text-white focus:outline-none focus:border-pulsar-blue/50 transition-colors"
												/>
											</div>
										</div>

										{/* Feature Toggles */}
										<div className="space-y-4 pt-2">
											<h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-1">
												Dashboard Widgets
											</h3>

											{/* Lube Tracker */}
											<div className="flex items-center justify-between p-4 bg-oled-black/40 rounded-2xl border border-white/5">
												<div className="flex items-center gap-3">
													<div className="p-2 bg-pulsar-blue/10 rounded-xl">
														<Droplets className="w-5 h-5 text-pulsar-blue" />
													</div>
													<div>
														<div className="text-xs font-bold text-white">
															Chain Lube
														</div>
														<div className="text-[9px] text-oled-gray-400 font-medium">
															Track maintenance intervals
														</div>
													</div>
												</div>
												<button
													type="button"
													onClick={() => setTempShowLube(!tempShowLube)}
													className={cn(
														"w-12 h-6 rounded-full transition-all duration-300 relative",
														tempShowLube ? "bg-pulsar-blue" : "bg-white/10",
													)}
												>
													<motion.div
														animate={{ x: tempShowLube ? 26 : 4 }}
														className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
													/>
												</button>
											</div>

											{/* Fuel Tracker */}
											<div className="flex items-center justify-between p-4 bg-oled-black/40 rounded-2xl border border-white/5">
												<div className="flex items-center gap-3">
													<div className="p-2 bg-amber-500/10 rounded-xl">
														<Fuel className="w-5 h-5 text-amber-500" />
													</div>
													<div>
														<div className="text-xs font-bold text-white">
															Fuel & Efficiency
														</div>
														<div className="text-[9px] text-oled-gray-400 font-medium">
															Gauge and KM/L trends
														</div>
													</div>
												</div>
												<button
													type="button"
													onClick={() => setTempShowFuel(!tempShowFuel)}
													className={cn(
														"w-12 h-6 rounded-full transition-all duration-300 relative",
														tempShowFuel ? "bg-pulsar-blue" : "bg-white/10",
													)}
												>
													<motion.div
														animate={{ x: tempShowFuel ? 26 : 4 }}
														className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
													/>
												</button>
											</div>

											{/* Tyre Tracker */}
											<div className="flex items-center justify-between p-4 bg-oled-black/40 rounded-2xl border border-white/5">
												<div className="flex items-center gap-3">
													<div className="p-2 bg-rose-500/10 rounded-xl">
														<Activity className="w-5 h-5 text-rose-500" />
													</div>
													<div>
														<div className="text-xs font-bold text-white">
															Tyre Pressure
														</div>
														<div className="text-[9px] text-oled-gray-400 font-medium">
															Monitor PSI levels
														</div>
													</div>
												</div>
												<button
													type="button"
													onClick={() => setTempShowTyre(!tempShowTyre)}
													className={cn(
														"w-12 h-6 rounded-full transition-all duration-300 relative",
														tempShowTyre ? "bg-pulsar-blue" : "bg-white/10",
													)}
												>
													<motion.div
														animate={{ x: tempShowTyre ? 26 : 4 }}
														className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
													/>
												</button>
											</div>

											{/* Checklist Tracker */}
											<div className="flex items-center justify-between p-4 bg-oled-black/40 rounded-2xl border border-white/5">
												<div className="flex items-center gap-3">
													<div className="p-2 bg-emerald-500/10 rounded-xl">
														<Save className="w-5 h-5 text-emerald-500" />
													</div>
													<div>
														<div className="text-xs font-bold text-white">
															Safety Checklist
														</div>
														<div className="text-[9px] text-oled-gray-400 font-medium">
															Pre-ride inspections
														</div>
													</div>
												</div>
												<button
													type="button"
													onClick={() =>
														setTempShowChecklist(!tempShowChecklist)
													}
													className={cn(
														"w-12 h-6 rounded-full transition-all duration-300 relative",
														tempShowChecklist
															? "bg-pulsar-blue"
															: "bg-white/10",
													)}
												>
													<motion.div
														animate={{ x: tempShowChecklist ? 26 : 4 }}
														className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
													/>
												</button>
											</div>
										</div>

										<button
											type="button"
											onClick={handleSave}
											className="w-full bg-pulsar-blue text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-pulsar-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
										>
											<Save className="w-5 h-5" /> SAVE SETTINGS
										</button>
									</div>
								</div>
							</motion.div>
						</Dialog.Content>
					</Dialog.Portal>
				)}
			</AnimatePresence>
		</Dialog.Root>
	);
}
