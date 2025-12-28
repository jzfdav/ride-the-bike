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
								<div className="bg-oled-gray-100 rounded-[2.5rem] border border-white/10 p-8 shadow-2xl flex flex-col max-h-[85vh]">
									<div className="flex justify-between items-center mb-6 flex-shrink-0">
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

									<div className="flex-1 overflow-y-auto pr-2 space-y-6 scrollbar-hide py-2">
										<CollapsibleSection
											title="Challenge Targets"
											icon={<Target className="w-3.5 h-3.5" />}
											peek={`${tempTarget} KM Target`}
											defaultOpen={true}
										>
											<div className="space-y-6 pt-2">
												{/* Challenge Start Date */}
												<div className="space-y-3">
													<label className="text-[10px] font-black uppercase tracking-widest text-pulsar-blue flex items-center gap-2">
														<Calendar className="w-3.5 h-3.5" /> Service Due
														Date (Deadline)
													</label>
													<input
														type="date"
														value={tempDate}
														onChange={(e) => setTempDate(e.target.value)}
														className="w-full bg-oled-black border-2 border-white/5 rounded-2xl px-5 py-4 text-lg font-bold text-white focus:outline-none focus:border-pulsar-blue/50 transition-colors color-scheme-dark"
													/>
												</div>

												{/* Odometers */}
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
														<Activity className="w-3.5 h-3.5" /> Current
														Odometer (KM)
													</label>
													<input
														type="number"
														value={tempOdo}
														onChange={(e) => setTempOdo(e.target.value)}
														className="w-full bg-oled-black border-2 border-white/5 rounded-2xl px-5 py-4 text-lg font-bold text-white focus:outline-none focus:border-pulsar-blue/50 transition-colors"
														placeholder="e.g. 10450"
													/>
												</div>
											</div>
										</CollapsibleSection>

										<CollapsibleSection
											title="Bike Profile"
											icon={<Activity className="w-3.5 h-3.5" />}
											peek={tempModel}
										>
											<div className="space-y-3 pt-2">
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
										</CollapsibleSection>

										<CollapsibleSection
											title="Dashboard Widgets"
											icon={<Droplets className="w-3.5 h-3.5" />}
											peek={`${
												[
													tempShowLube,
													tempShowFuel,
													tempShowTyre,
													tempShowChecklist,
												].filter(Boolean).length
											} Active`}
										>
											<div className="space-y-3 pt-2">
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
																Maintenance alerts
															</div>
														</div>
													</div>
													<ToggleSwitch
														enabled={tempShowLube}
														onChange={setTempShowLube}
													/>
												</div>

												{/* Fuel Tracker */}
												<div className="flex items-center justify-between p-4 bg-oled-black/40 rounded-2xl border border-white/5">
													<div className="flex items-center gap-3">
														<div className="p-2 bg-amber-500/10 rounded-xl">
															<Fuel className="w-5 h-5 text-amber-500" />
														</div>
														<div>
															<div className="text-xs font-bold text-white">
																Fuel Tracker
															</div>
															<div className="text-[9px] text-oled-gray-400 font-medium">
																Efficiency metrics
															</div>
														</div>
													</div>
													<ToggleSwitch
														enabled={tempShowFuel}
														onChange={setTempShowFuel}
													/>
												</div>

												{/* Tyre Tracker */}
												<div className="flex items-center justify-between p-4 bg-oled-black/40 rounded-2xl border border-white/5">
													<div className="flex items-center gap-3">
														<div className="p-2 bg-rose-500/10 rounded-xl">
															<Activity className="w-5 h-5 text-rose-500" />
														</div>
														<div>
															<div className="text-xs font-bold text-white">
																Tyre PSI
															</div>
															<div className="text-[9px] text-oled-gray-400 font-medium">
																Pressure monitor
															</div>
														</div>
													</div>
													<ToggleSwitch
														enabled={tempShowTyre}
														onChange={setTempShowTyre}
													/>
												</div>

												{/* Checklist Tracker */}
												<div className="flex items-center justify-between p-4 bg-oled-black/40 rounded-2xl border border-white/5">
													<div className="flex items-center gap-3">
														<div className="p-2 bg-emerald-500/10 rounded-xl">
															<Save className="w-5 h-5 text-emerald-500" />
														</div>
														<div>
															<div className="text-xs font-bold text-white">
																Checklist
															</div>
															<div className="text-[9px] text-oled-gray-400 font-medium">
																Safety inspections
															</div>
														</div>
													</div>
													<ToggleSwitch
														enabled={tempShowChecklist}
														onChange={setTempShowChecklist}
													/>
												</div>
											</div>
										</CollapsibleSection>
									</div>

									<div className="pt-6 flex-shrink-0">
										<button
											type="button"
											onClick={handleSave}
											className="w-full bg-pulsar-blue text-white font-bold py-5 rounded-3xl flex items-center justify-center gap-2 shadow-lg shadow-pulsar-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
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

function CollapsibleSection({
	title,
	icon,
	peek,
	children,
	defaultOpen = false,
}: {
	title: string;
	icon: React.ReactNode;
	peek: string;
	children: React.ReactNode;
	defaultOpen?: boolean;
}) {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	return (
		<div className="space-y-4 py-4 border-t border-white/5 first:border-t-0 first:pt-0">
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="w-full flex items-center justify-between group"
			>
				<div className="flex items-center gap-3">
					<div className="text-pulsar-blue opacity-50 transition-opacity group-hover:opacity-100">
						{icon}
					</div>
					<div className="text-left">
						<h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 group-hover:text-white/50 transition-colors">
							{title}
						</h3>
						{!isOpen && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="text-[10px] font-bold text-pulsar-blue mt-0.5"
							>
								{peek}
							</motion.div>
						)}
					</div>
				</div>
				<motion.div
					animate={{ rotate: isOpen ? 180 : 0 }}
					className="text-white/10 group-hover:text-white/30"
				>
					<svg
						className="w-4 h-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={3}
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</motion.div>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						className="overflow-hidden"
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

function ToggleSwitch({
	enabled,
	onChange,
}: {
	enabled: boolean;
	onChange: (val: boolean) => void;
}) {
	return (
		<button
			type="button"
			onClick={() => onChange(!enabled)}
			className={cn(
				"w-12 h-6 rounded-full transition-all duration-300 relative",
				enabled ? "bg-pulsar-blue" : "bg-white/10",
			)}
		>
			<motion.div
				animate={{ x: enabled ? 26 : 4 }}
				className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
			/>
		</button>
	);
}
