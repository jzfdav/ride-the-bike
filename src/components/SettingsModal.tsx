import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, Calendar, Fuel, Save, Target, X } from "lucide-react";
import { useState } from "react";
import { useStore } from "../store";
import { cn } from "../utils";

interface SettingsModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
	const store = useStore();

	const handleSaveSettings = (data: {
		serviceDueDate: string;
		currentOdo: number;
		baseOdo: number;
		targetOdo: number;
		bikeModel: string;

		showFuelTracker: boolean;
		showTyreTracker: boolean;
		showChecklist: boolean;
	}) => {
		store.setServiceDueDate(data.serviceDueDate);
		store.setCurrentOdo(data.currentOdo);
		store.setBaseOdo(data.baseOdo);
		store.setTargetOdo(data.targetOdo);
		store.setBikeModel(data.bikeModel);

		store.setShowFuelTracker(data.showFuelTracker);
		store.setShowTyreTracker(data.showTyreTracker);
		store.setShowChecklist(data.showChecklist);
		onClose();
	};

	return (
		<SettingsModalUI
			isOpen={isOpen}
			onClose={onClose}
			onSave={handleSaveSettings}
			initialData={{
				serviceDueDate: store.serviceDueDate || "",
				currentOdo: store.currentOdo,
				baseOdo: store.baseOdo,
				targetOdo: store.targetOdo,
				bikeModel: store.bikeModel,

				showFuelTracker: store.showFuelTracker,
				showTyreTracker: store.showTyreTracker,
				showChecklist: store.showChecklist,
			}}
		/>
	);
}

interface SettingsModalUIProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (data: any) => void;
	initialData: any;
}

export function SettingsModalUI({
	isOpen,
	onClose,
	onSave,
	initialData,
}: SettingsModalUIProps) {
	const [tempDate, setTempDate] = useState(
		initialData.serviceDueDate
			? initialData.serviceDueDate.split("T")[0]
			: new Date().toISOString().split("T")[0],
	);
	const [tempOdo, setTempOdo] = useState(initialData.currentOdo.toString());
	const [tempBase, setTempBase] = useState(initialData.baseOdo.toString());
	const [tempTarget, setTempTarget] = useState(
		initialData.targetOdo.toString(),
	);
	const [tempModel, setTempModel] = useState(initialData.bikeModel);

	const [tempShowFuel, setTempShowFuel] = useState(initialData.showFuelTracker);
	const [tempShowTyre, setTempShowTyre] = useState(initialData.showTyreTracker);
	const [tempShowChecklist, setTempShowChecklist] = useState(
		initialData.showChecklist,
	);

	const handleSave = () => {
		onSave({
			serviceDueDate: new Date(tempDate).toISOString(),
			currentOdo: parseFloat(tempOdo),
			baseOdo: parseFloat(tempBase),
			targetOdo: parseFloat(tempTarget),
			bikeModel: tempModel,

			showFuelTracker: tempShowFuel,
			showTyreTracker: tempShowTyre,
			showChecklist: tempShowChecklist,
		});
	};

	return (
		<Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<AnimatePresence>
				{isOpen && (
					<Dialog.Portal forceMount>
						{/* Overlay removed for full screen feel, but kept for a11y if needed (invisible) */}
						<Dialog.Overlay asChild>
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="fixed inset-0 bg-oled-black z-[60]"
							/>
						</Dialog.Overlay>
						<Dialog.Content asChild>
							<motion.div
								initial={{ opacity: 0, y: 100, scale: 0.95 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								exit={{ opacity: 0, y: 100, scale: 0.95 }}
								className="fixed inset-0 z-[70] bg-oled-black overflow-y-auto"
							>
								<div className="min-h-full p-6 flex flex-col max-w-2xl mx-auto">
									<div className="flex justify-between items-center mb-8 flex-shrink-0 sticky top-0 bg-oled-black z-10 py-4">
										<Dialog.Title className="text-xl font-black uppercase tracking-tighter text-white italic">
											Settings
										</Dialog.Title>
										<Dialog.Close asChild>
											<button
												type="button"
												className="p-3 bg-oled-gray-100 rounded-full hover:bg-white/10 transition-colors border border-white/10"
												aria-label="Close"
											>
												<X className="w-6 h-6 text-white" />
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
											icon={<Activity className="w-3.5 h-3.5" />}
											peek={`${
												[tempShowFuel, tempShowTyre, tempShowChecklist].filter(
													Boolean,
												).length
											} Active`}
										>
											<div className="space-y-3 pt-2">
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
